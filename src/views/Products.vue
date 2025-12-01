<template>
    <div class="mx-auto px-6 md:px-24 py-8">
        <div class="gap-10 flex flex-col-reverse md:flex-row">
         <div class="flex-1">
            <div class="flex justify-between items-center mb-1">
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
                    <p>${{ Number(album.price.toFixed(2)).toLocaleString('en-US') }}</p>
                  </div>

                  <div class="crsr justify-end">
                    <font-awesome-icon  @click="MyList(album)" :icon="[favorites.find(itm => itm.id == album.id) ? favSolid : favRegular, 'heart']"  class="text-orange-400 font-medium"/>
                    <!-- <font-awesome-icon class="" :icon="['fas', 'cart-shopping']" :class="cart.find(itm => itm.id == album.id) ? 'text-orange-400' : 'cart'" @click="store.addToCart(album)" /> -->
                  </div>
                </div>
              </template>
          </base-card>
        </div>  
        </div>
        </div>
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
    const { albumTitle, selectedFilterCat, products, cartModal, searchedText, favSolid, favRegular, sorted, minPrice, maxPrice, allArtists, sortedSelected, favorites, listCount, filteredMusic, CartCount, itemAdded, cart, checks, artistCounts } = storeToRefs(store);

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