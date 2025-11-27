<template>
  <div class="mx-auto px-6 md:px-24 py-6">
    <div class="inline">
      <div class="flex items-center crsr mb-1" @click="router.back" v-if="favorites.length">
          <font-awesome-icon :icon="['fas', 'arrow-left']" class="me-sm-2 me-0 px-sm-0 px-1"/>
      </div> 
    </div> 
    
    <div class="sm:px-0 px-2">
        <div class="text-center my-10" v-if="!Filteredfav.length">
            <p>Your Favorites is currently empty</p>
            <base-button mode="reverse" class="mt-4 crsr" @click="router.push('/products')">Add items to favorites</base-button>
        </div>
          <div class="">
            <h1 class="pb-4 pt-1 text-4xl font-medium" v-if="Filteredfav.length">Favorite items</h1>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-6">
          <div v-for="fav in Filteredfav" :key="fav.id" class="zoom border rounded bg-white border-gray-400 hover:border-gray-700">
            <base-card>
              <template v-slot:top>
                <div class="relative">
                    <img :src="fav.thumbnail" @click="toMusicDetail(fav)"class="crsr border-b border-b-gray-300" :alt="fav.title">
                </div>
              </template>
              <template v-slot:bottom>
                <div class="flex justify-between">
                  <div>
                    <p class="crsr underL" @click="artistDetails(fav)">{{ fav.category }}</p>
                    <h6 class="my-1 crsr underL font-medium" @click="toMusicDetail(fav)">{{ fav.title }}</h6>
                    <p>${{ fav.price }}</p>
                  </div>
                  <div class="mt-1 crsr">
                    <font-awesome-icon :icon="['fas', 'cart-shopping']" class="mr-4" :class="cart.find(itm => itm.id == fav.id) ? 'orng' : 'cart'"  @click="store.addToCart(fav)" />
                    <font-awesome-icon :icon="['far', 'trash-can']" @click="selectedFav = fav"/>
                  </div>
                </div>
              </template>
          </base-card>
        </div>
        </div>
 
    </div>
  </div>

  
        <teleport to="body">
            <div class="w-full">
            <base-modal v-if="selectedFav">
              <div class="text-end px-3 py-2">
                <font-awesome-icon @click="cancel" :icon="['fas', 'xmark']" class="crsr"></font-awesome-icon>
              </div>
              <div class="px-4 py-4">
                <h5>Are you sure you want to delete <b>{{ selectedFav.title }}</b>?</h5>
              <div class="flex justify-end items-center gap-4 mt-3">
                <div class="crsr" @click="cancel">Cancel</div>
                <base-button class="crsr" @click="removeFav">Delete</base-button>
              </div>
            </div>
            </base-modal>
          </div>
        </teleport>

   <teleport to="body">
       <div class="hidden sm:block">
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
                    <p>${{ (Math.ceil(item.price * item.quantity)) }}</p>
                  </div>
                  <font-awesome-icon :icon="['fas', 'trash-can']" @click="deleteItem(item, index)" class="cursor-pointer text-gray-500"></font-awesome-icon>
              </div>
                <hr class="text-gray-300 mt-7"></hr>
          </div>
          
          <div class="flex justify-between font-bold items-center px-4 py-4" v-if="cart.length" >
            <p>Subtotal:</p>
            <div class="justify-end text-right"><span>${{ Math.ceil(store.total) }}</span></div>
          </div>
          
          <div v-if="cart.length" class="flex gap-3 px-4 my-4">
              <base-button mode="reverse" class="w-full cursor-pointer" @click="router.push('/shopping-cart')">View Cart</base-button>
              <base-button class="w-full cursor-pointer" @click="router.push('/checkout')">Checkout</base-button>
          </div>
        </base-modal>
        </div>
    </teleport> 

   <div class="position">
      <font-awesome-icon :icon="['fas', 'angle-up']" class="absoluteTop crsr rounded orng" v-if="top" @click="backToTop" />
    </div>
</template>

<script setup>
   import { useRouter } from 'vue-router';
   const router = useRouter()

    import { useMusicStore } from '@/stores/music';
    const store = useMusicStore();

    import { storeToRefs } from 'pinia';
    const { favorites, cartModal, listCount, selectedFav, cart, CartCount, itemAdded, searchedText } = storeToRefs(store);

    import { useToTop } from '@/ToTop.js'
    import { computed, onMounted } from 'vue';
  
    const { top, backToTop } = useToTop();

    const toMusicDetail = (fav) => {
      router.push({ name: 'ProductDetails', params: {id: fav.title.toLowerCase().split(' ').join('-')}});
    }

    // const openDialog = (fav) => {
    //   selectedFav.value = fav
    //   console.log(selectedFav.value.artist)
    // }

     onMounted(() => {
     cartModal.value = null
    })
    
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


    const removeFav = () => {
        favorites.value = favorites.value.filter(itm => itm.id !== selectedFav.value.id)
        listCount.value--
        selectedFav.value = null
    }

    const cancel = () => {
      selectedFav.value = null;
    }


    const Filteredfav = computed(() => {
      return favorites.value.filter(itm => itm.title.toLowerCase().includes(searchedText.value.trim().toLocaleLowerCase()))
    })

    const artistDetails = (item) => {
      router.push({name: 'Category', params: {aid: item.category.split(' ').join('-')}})
    }
</script>


<style scoped>
    .absolute {
        position: absolute;
        top: 7px;
        left: 7px;
        /* font-weight: bold;
         border-radius: .2rem;
        background-color: #F89829;
        padding: 3px 9px; */
    }
    .absoluteTop{
      position: fixed;
       background-color: #131313;
      padding: 6px 8px;
      bottom: 15px;
      right: 15px;
    }
    .bg-primary {
      background-color: #F89829 !important;
    }

     .iconnn {
      font-size: 19px;
    }
    .crsr {
      cursor: pointer;
    }

    svg {
      font-size: 18px;
    }
    .orng {
      color: #F89829;
    }
    .cart{
      color: #333537;
    }
    .inline{
      display: inline-block;
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
      .w {
      width: 60%;
    }
    .zoom {
      transition: transform 0s; 
    }
    .zoom:hover {
      transform:none;
    }
 
    }
</style>