<template>
    <div class="mx-auto px-6 md:px-24 py-8">
        <div class="gap-10 flex flex-col-reverse md:flex-row">
         <div class="flex-1">
            <div class="flex justify-between items-center mb-3">
              <div>
                <font-awesome-icon :icon="['fas', 'filter']" class="text-gray-600" />
                Filter by:
              </div>
              <div @click="reset" class="crsr" v-if="searchedText.trim() !== '' || minPrice !== '' || maxPrice !== ''"> 
                <font-awesome-icon :icon="['fas', 'rotate-right']"  class="text-gray-600 mr-1" />
                Reset
              </div>
            </div>

            <div class="my-5">
              <h5 class="py-1 cart font-bold">Price</h5>
                  <div class="my-2">
                    <label class="mr-2">Min Price</label> 
                    <input type="number" class="mr-2 border border-gray-500 outline-0 px-2 py-1 rounded w-full md:w-fit mt-1" v-model="minPrice">   
                  </div>
                  <div class="mt-1">
                    <label class="mr-2">Max Price</label> 
                    <input type="number" class="mr-2 border border-gray-500 outline-0 px-2 py-1 rounded w-full md:w-fit mt-1" v-model="maxPrice">   
                  </div>
              </div>

            <div class="my-5">
              <h5 class="pb-1 cart font-bold">Catagory</h5>
              <div v-for="cat in albumTitle">
                <div class="my-2">
                  <input name="cat" type="radio" class="mr-2 crsr" :value="cat" v-model="selectedFilterCat">
                  <label>{{ cat }}</label> 
                </div>
              </div>
            </div>

            </div>
            
          <div class="flex-5"> 
            <div class="text-center justify-center content-center my-16" v-if="!filteredMusic.length">
                <p>There are currently no products here</p>
            </div>
            <div class="flex justify-between items-center pb-4" v-if="filteredMusic.length">
              <h1 class="text-2xl lg:text-4xl font-medium">{{ selectedFilterCat }}</h1>
              <div class="ml-auto">
                <select class="outline-0" v-model="sortedSelected">
                  <option disabled :value="''">Sort By:</option>
                  <option v-for="s in sorted" :value="s">{{ s }}</option>
                </select>
              </div>
            </div>

        <!-- grid View -->

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div class="mb-4 zoom border rounded bg-white border-gray-400 hover:border-gray-700" v-for="album in filteredMusic" :key="album.id">
            <base-card>
              <template v-slot:top>
                <div class="relative">
                    <img :src="album.thumbnail" @click="toMusicDetail(album)" class="crsr border-b border-b-gray-300" :alt="album.title">
                </div>
              </template>
              <template v-slot:bottom>
                <div class="flex justify-between">
                  <div>
                    <p class="crsr underL" @click="artistDetails(album)">{{ album.category }}</p>
                    <h6 class="my-1 crsr underL font-medium" @click="toMusicDetail(album)">{{ album.title }}</h6>
                    <p>${{ album.price }}</p>
                  </div>

                    <div class="mt-1 crsr justify-end">
                      <font-awesome-icon  @click="MyList(album)" :icon="[favorites.find(itm => itm.id == album.id) ? favSolid : favRegular, 'heart']"  class="text-orange-400 font-medium"/>
                      <!-- <font-awesome-icon class="" :icon="['fas', 'cart-shopping']" :class="cart.find(itm => itm.id == album.id) ? 'text-orange-400' : 'cart'" @click="store.addToCart(album)" /> -->
                    </div>
                </div>
              </template>
          </base-card>
        </div>  
        </div>
        </div>

          <!-- <teleport to="body">
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
        </teleport>  -->
    </div>
  </div> 

    <div class="relative">
      <font-awesome-icon :icon="['fas', 'angle-up']" class="absoluteTop crsr rounded iconn" v-if="top" @click="backToTop" />
    </div>
</template>

<script setup>
    import { onMounted } from 'vue'
    import { useRouter } from 'vue-router';
    const router = useRouter()
   
    import { useToTop } from '@/ToTop.js'

    const { top, backToTop } = useToTop();

    import { useMusicStore } from '@/stores/music';
    const store = useMusicStore();

    import { storeToRefs } from 'pinia';
    const { albumTitle, selectedFilterCat, products, cartModal, searchedText, favSolid, favRegular, sorted, minPrice, maxPrice, allArtists, sortedSelected, favorites, listCount, filteredMusic, selectedAlbum, CartCount, itemAdded, cart, checks, artistCounts } = storeToRefs(store);

    const toMusicDetail = (item) => {
      router.push({ name: 'ProductDetails', params: {id: item.title.toLowerCase().split(' ').join('-')}});
    };

    onMounted(() => {
     cartModal.value = null
    })

    onMounted(() => {
      store.fetchProducts()
    })
    

    console.log(store.fetchProducts())

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

    const artistDetails = (item) => {
      router.push({name: 'Category', params: {aid: item.category.split(' ').join('-')}})
    }

    const reset = () => {
      searchedText.value = ''
      checks.value.length = 0
      // selectedFilterCat.value = 'beauty'
      maxPrice.value = ''
      minPrice.value = ''
    } 
</script>

<style scoped>
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
    .crsr {
      cursor: pointer;
    }
   .b {
    color: #333537;
   }
    /* svg {
      font-size: 18px;
    } */
     .underL:hover {
      text-decoration: underline;
    }
    
    .iconn {
      color: #F89829;
    }
    .iconnn {
      font-size: 19px;
    }
    .cart{
      color: #333537;
    }
    .zoom {
      transition: transform .2s; 
    }
    .zoom:hover {
      transform: scale(1.06);
    }
    .orng {
      color: #F89829;
    }
    .vh {
      height: 100vh;
    }
    input[type=checkbox], input[type=radio] {
      width: 14px;
      height: 14px;
      accent-color: #F89829;
    }

    .small-img {
      width: 165px;
      height: 165px;
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