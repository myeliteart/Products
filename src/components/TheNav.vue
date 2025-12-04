<template>
  <nav class="hidden lg:block list-none px-6 md:px-24 bg-gray-700 text-white border-b-4 border-orange-400 py-4">

  <!-- desktop -->

  <div class="flex justify-between items-center">
     <router-link to="/" @click="store.navOpen = false" class="">
        <h4 class="text-white text-2xl font-bold">vue by <span class="text-orange-400">eli</span></h4>
    </router-link>
    <ul class="flex gap-12 my-2 lg:my-0">
        <li class="">
            <router-link to="/" >Home</router-link>
        </li>
        <li class="">
            <router-link to="/about">About</router-link>
        </li>
        <li class="">
            <router-link to="/products">Products</router-link>
        </li>
        <li class="">
            <router-link to="/wishlist">
              Wishlist &nbsp; <span class="font-bold">{{ listCount }}</span>
            </router-link>
        </li>
    </ul>
      <div>
          <input list="mySuggestions" class="mr-2 outline-0 border border-gray-400 px-3 py-1 rounded" type="search" v-model="searchedText" placeholder="Search Products...">
          <!-- <datalist id="mySuggestions">
            <option v-for="item in store.albumTitle" :key="item" :value="item"></option>
          </datalist> -->
        </div>
      <ul class="my-2 lg:my-0">
        <li class="mr-0">
            <router-link to="/shopping-cart">
              <font-awesome-icon :icon="['fas', 'cart-shopping']" /> &nbsp; <span class="font-bold">{{ CartCount }}</span>
            </router-link>
        </li>
      </ul>
      <!-- <ul>
        <li class="mr-0">
            <router-link to="/dashboard/">
              <font-awesome-icon :icon="['fas', 'user']" />
            </router-link>
        </li>
    </ul> -->
    </div>
</nav>

  <!-- mobile -->
  <nav class="block lg:hidden list-none px-6 md:px-24 bg-gray-700 text-white border-b-4 border-orange-400 py-4">

  <div class="flex justify-between items-center">

    <router-link to="/" @click="store.navOpen = false">
        <h4 class="text-white text-2xl font-bold">vue by <span class="text-orange-400">eli</span></h4>
    </router-link>
    <div>
        <div v-if="!store.navOpen" @click="store.navOpen = !store.navOpen" class="cursor-pointer">
            <font-awesome-icon :icon="['fas', 'bars']" class="crsr text-gray-100"></font-awesome-icon>
        </div>
        <div  v-if="store.navOpen" @click="store.navOpen = false">
          <font-awesome-icon :icon="['fas', 'xmark']" class="text-gray-100 cursor-pointer"></font-awesome-icon> 
        </div>
    </div>
    </div>

   <ul v-if="store.navOpen" class="pt-4 leading-11">
        <li @click="store.navOpen = false">
          <router-link to="/" >Home</router-link>
        </li>
        <li @click="store.navOpen = false">
            <router-link to="/about">About</router-link>
        </li>
        <li @click="store.navOpen = false">
            <router-link to="/products">Products</router-link>
        </li>
       <li @click="store.navOpen = false">
            <router-link to="/favorites">
              Favorites &nbsp; <span class="font-bold">{{ listCount }}</span>
            </router-link>
        </li>
        <li @click="store.navOpen = false">
            <router-link to="/shopping-cart">
              <font-awesome-icon :icon="['fas', 'cart-shopping']" /> &nbsp; <span class="font-bold">{{ CartCount }}</span>
            </router-link>
        </li>
        <div>
          <input class="w-full outline-0 border px-3 py-0 mt-1 rounded" type="search" v-model="searchedText" placeholder="Search Albums...">
        </div>
         <!-- <li @click="store.navOpen = false">
            <router-link to="/dashboard" @click="userStore.auth = true">
              <font-awesome-icon :icon="['fas', 'user']" />
            </router-link>
        </li> -->
   </ul>
   
  </nav>
</template>

<script setup>
    // const logo = new URL('@/assets/img/logo.png', import.meta.url).href
    import { useRouter } from 'vue-router';
    const router = useRouter();

    import { useMusicStore } from '@/stores/music';
    const store = useMusicStore();

    import { storeToRefs } from 'pinia';
    const { listCount, searchedText, CartCount } = storeToRefs(store);

    import { useUserStore } from '@/stores/user';
    const userStore = useUserStore();

    // const changeLinkDesc = () => {
    //   if(userStore.auth == true) {
    //     userStore.auth = false
    //   }
    // }
    // const titleOrArtist = () => {
  //   albums.value.filter(item => item.title.toLowerCase().includes(searchedText.value.toLocaleLowerCase()))
  // }

  // function logoutt() {
  //   userStore.auth = false
  //   userStore.profileValues = {
  //     firstName: '',
  //     lastName: '',
  //     email: ''
  //   }
  //   userStore.role = 'user';
  //   router.push('/')
  // }

// function closeNavbar() {
//  const collapseElement = document.getElementById('navbarNav')
//       if (!collapseElement) return

//       const bsCollapse = Collapse.getInstance(collapseElement)
//       if (bsCollapse) {
//         bsCollapse.hide()
//       } else {
//         // Initialize and hide if no instance yet
//         const newCollapse = new Collapse(collapseElement)
//         newCollapse.hide()
//       }
// }

</script>

<style scoped>
    .form-control, .form-control:focus {
        background-color: transparent;
        outline: none !important;
        color: #fff;
    }
    .form-control:hover{
        border-color: #F89829;
    }
    .form-control::placeholder {
        color: #afaeae;
    }

    .logo {
        width: 185px;
    }
    .dropdown-item.active, .dropdown-item:active {
      text-decoration: none;
      background-color: #ededed;
      color: #000;
  }
  .dropdown-item:hover {
      text-decoration: none;
      background-color: #ededed;
      color: #000;
  }

  .cnt {
    font-weight: bold;
    color: #F89829;
  }
  .cnt:hover {
    font-weight: bold;
    color: #fff;
  }

  .form-select {
    width: 100px;
  }

.round {
  border-radius: 50px;
  background-color:transparent;
  border: 1px solid #F89829;;
  width: 41px;
  height: 41px;
  align-items: center;
  text-align: center;
  padding-top: 7px;
  font-size: 15px;
}
.navbar-brand {
  font-weight: 500;
}
</style>