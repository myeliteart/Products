<template>
  <div class="mx-auto px-6 md:px-24 py-6">
    <div class="inline">
      <div class="flex items-center crsr mb-1" @click="router.back" v-if="favorites.length">
          <font-awesome-icon :icon="['fas', 'arrow-left']" class="me-sm-2 me-0 px-sm-0 px-1"/>
      </div> 
    </div> 
    
    <div class="sm:px-0 px-2">
        <div class="text-center my-10" v-if="!Filteredfav.length">
            <p>Your wishlist is currently empty</p>
            <base-button mode="reverse" class="mt-4 crsr" @click="router.push('/products')">Add items to wishlist</base-button>
        </div>
          <div class="">
            <h1 class="pb-4 pt-1 text-4xl font-medium" v-if="Filteredfav.length">Wishlist</h1>
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
                    <p>${{ Number(fav.price.toFixed(2)).toLocaleString('en-US') }}</p>
                  </div>
                  <div class="crsr justify-end">
                    <!-- <font-awesome-icon :icon="['fas', 'cart-shopping']" class="mr-4" :class="cart.find(itm => itm.id == fav.id) ? 'orng' : 'cart'"  @click="store.addToCart(fav)" /> -->
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