<template>
   <div class="mx-auto px-6 md:px-24">
   <div class="text-center my-18" v-if="!cart.length">
      <p>Your cart is currently empty</p>
      <base-button class="mt-4 crsr" mode="reverse" @click="router.push('/products')">Start shopping</base-button>
   </div>

  <div class="pt-5 pb-1" v-if="cart.length">
    <div class="inline">
      <div class="flex items-center crsr mb-3" @click="router.back">
          <font-awesome-icon :icon="['fas', 'arrow-left']" class="me-sm-2 me-0 px-sm-0 px-1"/>
      </div>  
    </div>

    <div class="pb-4">
      <p class="text-2xl lg:text-4xl font-medium">Your cart</p>
    </div>
    <div class="flex flex-col md:flex-row gap-14 mb-8">
      <div class="flex-3 h-fit">
          <div v-for="(c, index) in cart">
            <div class="flex flex-row gap-6 justify-between items-center">
              <div @click="backToDetails(c)">
                <img :src="c.thumbnail" class="size-22 crsr"></img>
              </div>
              <div>
                <div class="crsr underL pb-1" @click="backToDetails(c)">{{ c.title }}</div>
                <div>${{ c.price }}</div>
                <div class="quantity pt-2">
                  <button @click="decrease(c)" class="crsr">-</button>
                  <input type="number" class="mx-1 md:mx-2 outline-0" v-model="c.quantity" @input="validateQuantity(c)">
                  <button @click="increase(c)" class="crsr">+</button>
                </div>
              </div>
              <div>
                <div @click="deleteItem(c, index)">
                  <font-awesome-icon :icon="['fas', 'trash-can']" class="text-gray-500 crsr"></font-awesome-icon>
                </div>
              </div>
              
              <div>
                ${{ Math.ceil(c.subtotal = c.price * c.quantity) }}
              </div>        
            </div>
            <hr class="my-4 text-gray-400"></hr>
        </div>
        </div>

        <div class="flex-1 bg-gray-200 p-8 h-fit">
            <div class="flex justify-between gap-4 text-2xl font-medium">
              <p>Subtotal</p>
              <p>${{ Math.ceil(total) }}</p>
            </div>
            <p class="my-6">Shipping calculated at checkout.</p>
            <base-button mode="reverse" @click="router.push('/products')" class="crsr w-full">Continue shopping</base-button>
            <base-button @click="router.push('/checkout')" class="crsr w-full mt-3">Checkout</base-button>
          </div>
        </div>
      </div>
    </div>
    <div class="position">
      <font-awesome-icon :icon="['fas', 'angle-up']" class="absoluteTop crsr rounded" v-if="top" @click="backToTop" />
    </div>
</template>

<script setup>

  import { useRouter } from 'vue-router';
  const router = useRouter();

  import { useMusicStore } from '@/stores/music';
  const store = useMusicStore();

    import { storeToRefs } from 'pinia';
    import { ref } from 'vue';
    const { cart, CartCount } = storeToRefs(store);

    import { useUserStore } from '@/stores/user';
    const userStore = useUserStore();

    // router.beforeEach((to, from, next) => {
    //   if (to.name !== 'Signin' && !userStore.auth) next({ name: 'Signin' })
    //   else next()
    // })

    
    const deleteItem = (c, idx) => {
      cart.value.splice(idx, 1)
      CartCount.value -= c.quantity
      total.value -= c.subtotal
    }

    const backToDetails = (item) => {
      router.push({name: 'ProductDetails', params: {id: item.title.toLowerCase().split(' ').join('-')} })
    }
    
    const total = ref(cart.value.reduce((acc, item) => {
      return acc + item.price * item.quantity
    }, 0))
    

      function calculateTotal() {
        total.value = cart.value.reduce((acc, item) => {
          return acc + item.price * item.quantity;
        }, 0);
      }

    const decrease = (c) => {
      if(c.quantity > 1) {
        c.quantity--
        CartCount.value--
        calculateTotal();
      } 
    }
    const increase = (c) => {
      if(c.quantity < 25 ){
        c.quantity++
        CartCount.value++
        console.log(c.subtotal)
        calculateTotal();
      } 
    }

    function validateQuantity(c) {
      if (c.quantity < 1) c.quantity = 1;
      if (c.quantity > 25) c.quantity = 25;
      CartCount.value = cart.value.reduce((acc, item) => acc + item.quantity, 0); // Update CartCount based on quantity of all items
      calculateTotal();
    }


    import { useToTop } from '@/ToTop.js'
    const { top, backToTop } = useToTop();

  //   watch(cart.value, ( newValue, oldValue ) => {

  // })
</script>

<style scoped>
    table, td, th {
    border: 1px solid #939394;
    border-collapse: collapse;
    padding: 7px 9px;
    text-align: center;
   }

    .crsr {
      cursor: pointer;
    }
    /* .orng {
      color: #F89829;
    } */
    .orng1 {
      color: #333537;
      font-weight: bold;
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
      color: #F89829;
    }
    .trash {
      font-size: 19px;
      color: #333537;
      cursor: pointer;
    }

    .quantity input {
      width: 50px;
      padding: 3px 10px;
      background-color: transparent;
      border: 1px solid #68696b;
      border-radius: .2rem;
      color: #333537;
      text-align: center;
    }
    .quantity button {
      padding: 3px 10px;
      background-color: transparent;
      border: 1px solid #68696b;
      color: #333537;
      border-radius: .2rem;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
  .inline {
    display: inline-block;
  }
  svg {
      font-size: 18px;
    }
   
     .underL:hover {
      text-decoration: underline;
    }
    @media screen and (max-width: 60rem) {
      /* .quantity input {
      width: 30px;
      padding: 0;
      background-color: transparent;
      border: 0px solid #68696b;
      border-radius: .2rem;
      color: #333537;
      text-align: center;
    }
    .quantity button {
      padding: 0;
      background-color: transparent;
      border: 0px solid #333537;
      color: #333537;
      border-radius: .2rem;
      font-size: 20px;
    } */
    }
</style>