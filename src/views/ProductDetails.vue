<template>
    <div class="py-5 px-6 md:px-24 mx-auto">
        <div class="flex justify-between items-center">
            <div class="flex items-center crsr mb-1" @click="router.back">
                <font-awesome-icon :icon="['fas', 'arrow-left']" class="mr-sm-2 mr-0 sm:px-0 px-1"/>
            </div>            
            <div>

            </div>
        </div>
    <div class="flex flex-col md:flex-row justify-between gap-10" v-if="currentAlbumItem">
        <div class="mt-2 mb-1 relative flex-1">
            <span class="absolute right-2 top-2 s p-2 crsr" @click="bigImage = true"><font-awesome-icon :icon="['fas', 'magnifying-glass-plus']" /></span>
            <div v-for="img in currentAlbumItem.images.slice(0, 1)">
              <img :src="img" class="bg-white border border-gray-400 hover:border-gray-700 rounded" :alt-="currentAlbumItem.title">
            </div>
          </div>
        <div class="my-1 flex-1">
            <p class="font-medium crsr underL inline-block" @click="artistDetails(currentAlbumItem)">{{ currentAlbumItem.category }}</p>
            <h3 class="text-2xl font-medium py-1">{{ currentAlbumItem.title }}</h3>
            <h5 class="mb-0 mt-1">${{ Number(currentAlbumItem.price.toFixed(2)).toLocaleString('en-US') }}</h5>
            <audio controls :src="currentAlbumItem.audio" v-if="currentAlbumItem.audio" class="my-2"></audio> <br>
            <div class="flex gap-8 mt-1">
                <base-button mode="round" @click="store.addToCart(currentAlbumItem)" class="crsr">Add to Cart</base-button>
                <button mode="round-reverse" @click="MyList" :class="favorites.find(item => item.id == currentAlbumItem.id) ? '' : 'cursor-pointer hover:text-orange-400'">{{ favorites.find(item => item.id == currentAlbumItem.id) ? 'Favorite Added' : 'Add to Favorites' }}</button>
            </div>

            <div class="mt-18 mb-4 flex cursor-pointer gap-12">
                <p v-for="tab in tabs" class="stly" @click="matchTab(tab)" :class="selectedTab == tab.toLowerCase().split(' ').join('-').replace('information', 'info') ? 'tabStyle' : ''">{{ tab }} <b :class="tab == 'Reviews' ? 'ml-2' : ''">{{ tab.toLowerCase().split(' ').join('-').replace('information', 'info') == 'reviews' ? currentAlbumItem.reviews.length : '' }}</b></p>
            </div>
            <component :is="selectedTab"></component>
        </div>
     </div>

     <div v-if="sameArtistItems.length" class="py-6">
        <h3 class="text-2xl py-1 font-medium">You may also like</h3>
        <hr class="my-1 text-gray-400">
     </div>
     <div class="mt-0 mb-6 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-6">
            <div v-for="item in sameArtistItems.slice(0, 5)" :key="item.id" class="zoom border rounded bg-white border-gray-400 hover:border-gray-700">

            <base-card>
                <template v-slot:top>
                    <div class="relative">
                        <img :src="item.thumbnail" @click="relatedMusicDetail(item)" class="crsr border-b border-b-gray-300" :alt="item.title">
                    </div>
                </template>
                <template v-slot:bottom>
                    <div class="flex justify-between">
                        <div>
                            <p class="crsr underL" @click="artistDetails(item)">{{ item.category }}</p>
                            <h6 class="my-1 crsr font-medium underL" @click="relatedMusicDetail(item)">{{ item.title }}</h6>
                            <p>${{ Number(item.price.toFixed(2)).toLocaleString('en-US') }}</p>
                        </div>
                    
                        <div class="crsr justify-end">
                            <font-awesome-icon  @click="MyList2(item)" :icon="[favorites.find(itm => itm.id == item.id) ? favSolid : favRegular, 'heart']"  class="orng"/>
                            <!-- <font-awesome-icon :icon="['fas', 'cart-shopping']" :class="cart.find(itm => itm.id == item.id) ? 'orng' : 'cart'" @click="store.addToCart(item)" /> -->
                        </div>
                    </div>
                </template>
            </base-card>
            </div>
        </div>

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
                      <p>${{ Number(item.price.toFixed(2)).toLocaleString('en-US') }}</p>
                    </div>
                      <div class="quantity">
                        <button @click="decrease(item)" class="crsr">-</button>
                        <input type="number" class="mx-1" v-model="item.quantity" @input="validateQuantity(item)">
                        <button @click="increase(item)" class="crsr">+</button>
                      </div>
                      <div>
                        <p>${{ Number(item.price.toFixed(2) * item.quantity).toLocaleString('en-US') }}</p>
                      </div>
                      <font-awesome-icon :icon="['fas', 'trash-can']" @click="deleteItem(item, index)" class="cursor-pointer text-gray-500"></font-awesome-icon>
                  </div>
                   <hr class="text-gray-300 mt-7"></hr>
              </div>
              
              <div class="flex justify-between font-bold items-center px-4 py-4" v-if="cart.length" >
                <p>Subtotal:</p>
                <div class="justify-end text-right"><span>${{ Number(store.total.toFixed(2)).toLocaleString('en-US') }}</span></div>
              </div>
              
              <div v-if="cart.length" class="flex gap-3 px-4 my-4">
                 <base-button mode="reverse" class="w-full cursor-pointer" @click="router.push('/shopping-cart')">View Cart</base-button>
                 <base-button class="w-full cursor-pointer" @click="router.push('/checkout')">Checkout</base-button>
              </div>
            </base-modal>
            </div>
        </teleport> 
    </div>

    <teleport to="body">
        <base-modal mode="dialog2" v-if="bigImage">
          <div class="p-0 relative" v-for="img in currentAlbumItem.images.slice(0, 1)">
              <span class="absolute right-2 top-2 s p-2 crsr" @click="bigImage = false"><font-awesome-icon :icon="['fas', 'xmark']"></font-awesome-icon></span>
              <img :src="img" class="rounded size-80 lg:size-160 py-4" :alt-="currentAlbumItem.title">
              <div class="absoluteDown text-white w-full bg-gray-700">{{ currentAlbumItem.title }}</div>
          </div>
        </base-modal>
    </teleport>

    <div class="relative">
      <font-awesome-icon :icon="['fas', 'angle-up']" class="absoluteTop crsr rounded orng" v-if="top" @click="backToTop" />
    </div>
</template>

<script setup>
    import { computed, ref, onMounted } from 'vue'
    import { useRoute, useRouter } from 'vue-router';
    const router = useRouter()
    const route = useRoute();

    import { useMusicStore } from '@/stores/music';
    const store = useMusicStore();

    import { storeToRefs } from 'pinia';
    const { CartCount, cart, bigImage, cartModal, listCount, filteredMusic, products, favSolid, favRegular, favorites } = storeToRefs(store);

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
    
    const currentAlbumItem = computed(() => {
        return products.value.find(item => item.title.toLowerCase().split(' ').join('-') == route.params.id)
    });

    const sameArtistItems = computed(() => {
        return products.value.filter(itm => itm.category == currentAlbumItem.value.category && itm.id !== currentAlbumItem.value.id)
    });
    
    let tabs = ref (['Additional Information', 'Reviews', 'Stock'])
    console.log(tabs.value)
    
    const selectedTab = ref ('additional-info')

    const matchTab = (tab) => {
        selectedTab.value = tab.toLowerCase().split(' ').join('-').replace('information', 'info')
    }

    const relatedMusicDetail = (item) => {
      router.push({ name: 'ProductDetails', params: {id: item.title.toLowerCase().split(' ').join('-')}});
    };

    const MyList = () => {
      const inTheList = favorites.value.find(item => item.id == currentAlbumItem.value.id)
      if(inTheList) {
        return;
      } else {
        favorites.value.unshift(currentAlbumItem.value)
        store.listCount++
      }
    }

    const MyList2 = (item1) => {
      const inTheList = favorites.value.find(item => item.id == item1.id)
      if(inTheList) {
        return;
      } else {
        favorites.value.unshift(item1)
        listCount.value++
      }
    }

    import { useToTop } from '@/ToTop.js'
    const { top, backToTop } = useToTop();

    const artistDetails = (item) => {
      router.push({name: 'Category', params: {aid: item.category.split(' ').join('-')}})
    }
</script>


<style scoped>
     .orng {
      color: #F89829;
     }
    .s {
        background-color: #fff;
        border-radius: 50% !important;
        opacity: .6;
    }
    .s svg{
        padding: 3px 5px;
        color:#000;
    }
    
    .absolute33 {
      position: absolute;
      top: 7px;
      left: 7px; 
    }
    .absolute2 {
      position: absolute;
      top: 9px;
      right: 15px; 
      color: #fff;
    }
    .absoluteDown {
     position: absolute;
      bottom: 0;
      text-align: center;
      padding: 9px 13px;
      margin: 0 auto;
    }
    .absoluteTop{
      position: fixed;
       background-color: #131313;
      padding: 6px 8px;
      bottom: 15px;
      right: 15px;
    }
    .card-text {
        color: #333537;
        margin-bottom: 0;
    }
    .size {
       width: 100%; 
    }
   
    .artist {
        color: #333537;
    }
    .bg-primary {
      background-color: #F89829 !important;
    }
    .card-text {
        color: #333537;
    }
    svg {
      font-size: 18px;
    }
    .cart{
      color: #333537;
    }
     .iconnn {
      font-size: 19px;
    }
    
    .underL:hover {
      text-decoration: underline;
    }
    
    .crsr {
      cursor: pointer;
    }
    
    .stly:hover {
        color: #F89829;
        border-bottom: 2px solid #333537;
        padding-bottom: 7px;
    }
    .tabStyle {
        color: #F89829;
        border-bottom: 2px solid #333537;
        padding-bottom: 7px;
    }
    .zoom {
      transition: transform .2s; 
    }
    .zoom:hover {
      transform: scale(1.06);
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
        .size2 {
            width: 360px; 
        }
        .w {
        width: 52%;
        }
      .zoom {
        transition: transform 0s; 
      }
      .zoom:hover {
        transform:none;
      }
    }
</style>