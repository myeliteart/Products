<template>
    <div class="mx-auto px-6 md:px-24 py-6">
      <div class="inline">
      <div class="flex items-center crsr mb-1" @click="router.back">
          <font-awesome-icon :icon="['fas', 'arrow-left']" class="mr-sm-2 mr-0 px-sm-0 px-1"/>
      </div> 
    </div> 
    <p class="text-center b mt-4" v-if="!artists.length">{{ selectedFilterCat }}There are currently no products here</p>

    <div class="px-2" v-if="artists.length">
        <div class="flex justify-between items-center">
            <h1 class="pb-4 pt-1 text-4xl font-medium">{{ oneArtist.category }}</h1>
            <!-- <base-button mode="reverse" @click="router.push('/shopping-cart')">Item added to your cart</base-button> -->
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-6">
        <div class="mb-4 zoom border rounded bg-white border-gray-400 hover:border-gray-700"  v-for="album in artists" :key="album.id">
            <base-card>
              <template v-slot:top>
                <div class="relative">
                    <img :src="album.thumbnail" @click="toMusicDetail(album)"  class="border-b border-b-gray-300 crsr" :alt="album.title">
                </div>
              </template>
              <template v-slot:bottom>
                <div class="flex justify-between">
                  <div>
                    <p class="">{{ album.category }}</p>
                    <h6 class="my-1 crsr underL" @click="toMusicDetail(album)">{{ album.title }}</h6>
                    <p class="">${{ album.price }}.00</p>
                  </div>

                    <div class="mt-1 crsr">
                      <font-awesome-icon  @click="MyList(album)" :icon="[favorites.find(itm => itm.id == album.id) ? favSolid : favRegular, 'heart']"  class="me-3 orng"/>
                      <font-awesome-icon :icon="['fas', 'cart-shopping']" :class="cart.find(itm => itm.id == album.id) ? 'orng' : 'cart'" @click="store.addToCart(album)" />
                    </div>
                </div>
              </template>
          </base-card>
        </div>  
        </div>

        <teleport to="body">
              <base-modal v-if="cartModal" mode="dialogCart">
                <div class="flex justify-between items-center text-end px-4 py-2">
                  <h3 class="text-2xl font-medium">Your cart <span class="text-sm">{{ CartCount }}</span></h3>
                  <font-awesome-icon  @click="cartModal = null" :icon="['fas', 'x']" class="crsr"></font-awesome-icon>
                </div>
                <hr class="text-gray-300"></hr>
                <p class="text-center py-6" v-if="!cart.length">Your cart is currently empty</p>
                <div class="px-4 py-4" v-for="(item, index) in cart" :key="item.id">
                  <div class="wrap-break-word flex justify-between items-center gap-4">
                    <img :src="item.thumbnail" :alt="item.title" class="size-16 rounded">
                    <div>
                      <small>{{ item.title }}</small>
                      <p>${{ item.price }}</p>
                    </div>
                      <div class="quantity">
                        <button @click="decrease(item)" class="crsr">-</button>
                        <input type="number" class="mx-1" v-model="item.quantity" @input="validateQuantity(item)">
                        <button @click="increase(item)" class="crsr">+</button>
                      </div>
                      <div class="">
                        <p>${{ Math.ceil((item.price * item.quantity)) }}</p>
                      </div>
                      <font-awesome-icon :icon="['fas', 'trash-can']" @click="deleteItem(item, index)" class="cursor-pointer text-gray-500"></font-awesome-icon>
                  </div>
                   <hr class="text-gray-300 mt-7"></hr>
              </div>
              
              <div class="flex justify-between items-center px-4 py-4">
                <p>Subtotal</p>
                <div v-if="cart.length" class="justify-end text-right"><span class="font-bold">${{ Math.ceil(store.total) }}</span></div>
              </div>
              
              <div v-if="cart.length" class="flex gap-3 px-4 my-4">
                 <base-button mode="reverse" class="w-full cursor-pointer" @click="router.push('/shopping-cart')">View Cart</base-button>
                 <base-button class="w-full cursor-pointer" @click="router.push('/checkout')">Checkout</base-button>
              </div>
            </base-modal>
        </teleport> 

    </div>
    </div>
    <div class="position">
      <font-awesome-icon :icon="['fas', 'angle-up']" class="absoluteTop crsr rounded iconn orng" v-if="top" @click="backToTop" />
    </div>
</template> 

<script setup>
    import { computed, onMounted } from 'vue';
     import { useRoute, useRouter } from 'vue-router';
     const route = useRoute()
     const router = useRouter()

     import { useMusicStore } from '@/stores/music';
    const store = useMusicStore();

    import { storeToRefs } from 'pinia';
    const { cart, CartCount, cartModal, listCount, products, favorites, favSolid, favRegular, searchedText } = storeToRefs(store);

    const toMusicDetail = (item) => {
      router.push({ name: 'ProductDetails', params: {id: item.title.toLowerCase().split(' ').join('-')}});
    };
  
     onMounted(() => {
     cartModal.value = null
    })

    const MyList = (album) => {
      const inTheList = favorites.value.find(item => item.id == album.id)
      if(inTheList) {
        return;
      } else {
        favorites.value.unshift(album)
        listCount.value++
      }
    }

    const decrease = (item) => {
      if(item.quantity > 1) {
        item.quantity--
        CartCount.value--
        store.calculateTotal();
      } 
    }
    
    const increase = (item) => {
      if(item.quantity < 25 ){
        item.quantity++
        CartCount.value++
        store.calculateTotal();
      } 
    }

     function validateQuantity(item) {
      if (item.quantity < 1) item.quantity = 1;
      if (item.quantity > 25) item.quantity = 25;
      CartCount.value = cart.value.reduce((acc, itemm) => acc + itemm.quantity, 0); // Update CartCount based on quantity of all items
      store.calculateTotal();
    }

     const deleteItem = (item, idx) => {
      cart.value.splice(idx, 1)
      CartCount.value -= item.quantity
      store.total -= item.price * item.quantity
    }


    const artists = computed(() => {
        return products.value.filter(itm => 
          itm.title.toLowerCase().includes(searchedText.value.trim().toLocaleLowerCase()) &&
          itm.category.toLowerCase().split(' ').join('-') == route.params.aid
        )
    })

    const oneArtist = computed(() => {
        return products.value.find(item => item.category.split(' ').join('-') == route.params.aid)
    })

    import { useToTop } from '@/ToTop.js'

    const { top, backToTop } = useToTop();
</script>

<style scoped>
    .crsr {
      cursor: pointer;
    }

    svg {
      font-size: 18px;
    }
    .orng {
      color: #F89829;
    }
    .position{
      position: relative;
    }
    .absoluteTop{
      position: fixed;
       background-color: #131313;
      padding: 6px 8px;
      bottom: 15px;
      right: 15px;
    }
    .absolute {
      position: absolute;
      top: 7px;
      left: 7px; 
    }
    .bg-primary {
      background-color: #F89829 !important;
    }
    .card-text {
        color: #333537;
        margin-bottom: 0;
    }
    .zoom {
      transition: transform .2s; 
    }
    .zoom:hover {
      transform: scale(1.06);
    }
   .underL:hover {
      text-decoration: underline;
    }

    .inline{
      display: inline-block;
    }
    .quantity input {
      width: 1.8rem;
      padding: 3px 4px;
      background-color: transparent;
      border: 1px solid #7d7e80;
      border-radius: .2rem;
      color: #333537;
      text-align: center;
      font-size: 15px;
    }
    .quantity button {
      padding: 3px 10px;
      background-color: transparent;
      border: 1px solid #7d7e80;
      color: #333537;
      border-radius: .2rem;
      font-size: 15px;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

    @media screen and (max-width: 780px) {
        .zoom {
        transition: transform 0s; 
        }
        .zoom:hover {
        transform:none;
        }
    }
</style>