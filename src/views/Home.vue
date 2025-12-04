<template>
  <div class="px-0">
    <div class="bg-image" :style="{'background-image': `url(${banner})`}"></div>
  </div>
  
  <div class="mx-auto px-6 md:px-24">
        <div class="sm:px-0 px-2">
          <p class="text-center py-5" v-if="!slicedProducts.length">Your products page is currently empty</p>
          <div class="flex justify-between items-center gap-4 py-5">
            <h1 class="text-2xl lg:text-4xl font-medium" v-if="slicedProducts.length">Featured Products</h1>
            <div class="ml-auto flex" v-if="slicedProducts.length">
              <p @click="router.push({name: 'products'})" class="crsr underL">View all products</p>
            </div>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-6">
          <div class="mb-4 zoom border rounded bg-white border-gray-400 hover:border-gray-600" v-for="album in slicedProducts" :key="album.id"  v-if="view == 'grid'">
            <base-card>
              <template v-slot:top>
                <div class="relative">
                    <img :src="album.thumbnail" @click="toMusicDetail(album)" class="border-b border-b-gray-400 crsr" :alt="album.title">
                </div>
              </template>
              <template v-slot:bottom>
                <div class="flex justify-between">
                    <div>
                      <p class="crsr underL font-medium" @click="artistDetails(album)">{{ album.category }}</p>
                      <h6 class="my-1 crsr underL" @click="toMusicDetail(album)">{{ album.title }}</h6>
                      <p class="">${{ Number(album.price.toFixed(2)).toLocaleString('en-US') }}</p>
                    </div>

                    <div class="crsr justify-end">
                      <font-awesome-icon  @click="MyList(album)" :icon="[favorites.find(itm => itm.id == album.id) ? favSolid : favRegular, 'heart']" class="text-orange-400"/>
                      <!-- <font-awesome-icon class="" :icon="['fas', 'cart-shopping']" :class="cart.find(itm => itm.id == album.id) ? 'text-orange-400' : 'cart'" @click="store.addToCart(album)" /> -->
                  </div>
                </div>
              </template>
          </base-card>
        </div>
        </div>

    </div>
  </div>

  <div class="relative">
      <font-awesome-icon :icon="['fas', 'angle-up']" class="absoluteTop crsr rounded orng" v-if="top" @click="backToTop" />
    </div>
   
</template>

<script setup>
    import  { ref, onMounted } from 'vue'

    import { useRouter } from 'vue-router';
    const router = useRouter()

    import { useToTop } from '@/ToTop.js'
    const { top, backToTop } = useToTop();

    import { useMusicStore } from '@/stores/music';
    const store = useMusicStore();

    import { storeToRefs } from 'pinia';
    const { listCount, favorites, slicedProducts, CartCount, cart, view, cartModal } = storeToRefs(store);

     onMounted(() => {
      cartModal.value = null
      })

    onMounted(() => {
      store.fetchProducts()
    })

    const banner = ref (new URL('@/assets/img/banner.jpg', import.meta.url).href)
    const favSolid = 'fas'
    const favRegular = 'far'

    const toMusicDetail = (album) => {
      router.push({ name: 'ProductDetails', params: {id: album.title.toLowerCase().split(' ').join('-')}});
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

    const MyList = (album) => {
      const inTheList = favorites.value.findIndex(item => item.id == album.id)
      if(inTheList >= 0) {
        return;
      } else {
        favorites.value.unshift(album)
        listCount.value++
      }
    }
   
    const artistDetails = (item) => {
      router.push({name: 'Category', params: {aid: item.category.toLowerCase().split(' ').join('-')}})
    }
 </script>

<style scoped>
    .position{
      position: relative;
    }
    .absolute {
      position: absolute;
      top: 7px;
      left: 7px; 
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
    .card-text {
        color: #333537;
        margin-bottom: 0;
    }
    .crsr {
      cursor: pointer;
    }

    .small-img {
      width: 165px;
      height: 165px;
    }

    .orange {
        background-color: #F89829;
        color:  #fff;
        padding: 5px 15px;
        border-radius: .3rem;
        border: 1px solid #F89829;
    }

    .bg-image {
      background-size: cover;
      background-repeat: no-repeat;
      width: 100%;
      height: 475px;
    }

    svg {
      font-size: 18px;
    }

     .iconnn {
      font-size: 19px;
    }

    .cart{
      color: #333537;
    }

    .relative {
      position: relative;
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
    .zoom {
      transition: transform 0s; 
    }
    .zoom:hover {
      transform:none;
    }

    .bg-image {
      background-size: cover;
      background-repeat: no-repeat;
      width: 100%;
      height: 325px;
    }
    }

</style>