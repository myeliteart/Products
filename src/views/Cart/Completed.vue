<template>
         <div class="mx-auto px-6 md:px-24 py-8" v-if="completed.length">
        <div class="inline">
            <div class="flex items-center crsr mb-4" @click="goHome">
                <font-awesome-icon :icon="['fas', 'arrow-left']" class=":sm-mr-2 mr-0 :sm-px-0 px-1"/>
                <small>Home</small>
            </div> 
        </div>
       
        <div class="px-2" v-if="completed.length">
            <div class="flex items-center py-1">
                <p><font-awesome-icon :icon="['fas', 'circle-check']" style="color: green;"/></p>
                <p class="ml-2">Order placed, thanks</p>
            </div>
        <div class="flex flex-col md:flex-row justify-between gap-8 my-2">
          <div class="border border-gray-500 rounded flex-1 p-6">
                <p class="font-medium">Shipping Details</p>
                 <hr class="my-2 text-gray-400">
                <div v-for="c in shipping">
                    <div>{{ c.name }}</div>
                    <div>{{ c.coName }}</div>
                    <div>{{ c.country }}</div>
                    <div>{{ c.address }}</div>
                    <div>{{ c.city }}</div>
                    <div>{{ c.state }}</div>
                    <div>{{ c.zip }}</div>
                    <div class="brk">Notes: <br>
                        {{ c.notes }}
                    </div>
                </div>
            </div>
            <div class="border border-gray-500 rounded flex-1 p-6">
                <p class="font-medium">Billing Details</p>
                 <hr class="my-2 text-gray-400">
                <div v-for="c in billing">
                    <div>{{ c.Sname }}</div>
                    <div>{{ c.Scountry }}</div>
                    <div>{{ c.Saddress }}</div>
                    <div>{{ c.Scity }}</div>
                    <div>{{ c.Sstate }}</div>
                    <div>{{ c.Szip }}</div>
                    <div>{{ c.phone }}</div>
                    <div>{{ c.email }}</div>
                </div>
            </div>
           <div class="border border-gray-500 rounded flex-1 p-6">
                <p class="font-medium">Order Details</p>
                 <hr class="my-2 text-gray-400">
                <div v-for="c in completed">
                    <div class="flex justify-between py-2">
                        <div>Product:</div> 
                        <div>{{ c.title }} x {{ c.quantity }}</div>
                    </div>
                     <hr class="mt-0 text-gray-400">
                    <div class="flex justify-between py-2">
                        <div>Price:</div> 
                        <div>${{ Number(c.price.toFixed(2)).toLocaleString('en-US') }}</div>
                    </div>
                     <hr class="mt-0 text-gray-400">
                    <div class="flex justify-between py-2">
                          <div>Total:</div>
                          <div>${{ Number(c.price.toFixed(2).toLocaleString('en-US')) * c.quantity }}</div>
                    </div>
                     <hr class="mt-0 text-gray-400">
                </div>
                
                <div class="flex justify-between py-2">
                    <div>Shipping:</div>
                    <div>{{ shippingResult }}</div>
                </div>
                <div class="flex justify-between">
                    <div>Grand Total:</div>
                    <div>${{ totalWithSHipping }}</div>
                </div>
                
            </div>
             </div>
        </div>
     </div>
</template>

<script setup>
    import { computed } from 'vue';
     import { useRouter } from 'vue-router';
     const router = useRouter()
   
    import { useMusicStore } from '@/stores/music';
    const store = useMusicStore();

    import { storeToRefs } from 'pinia';
    const { cart, card, billing, completed, shipDetails, shipping, shipRate } = storeToRefs(store);

    const goHome = () => {
        router.push('/');
        billing.value = []
        shipping.value = []
        completed.value = cart.value
        shipDetails.value = false
        card.value = []
    }
    console.log(completed.value)

    const total = completed.value.reduce((acc, item) => {
      return acc + item.price * item.quantity
    }, 0)

   const shippingResult = computed(() =>{
        if(total.value >= 300){
            return shipRate.value = 'Free Shipping'
        } else {
            return shipRate.value = '$' + Number(25).toFixed(2)
        }
    })

    const totalWithSHipping = computed(() => {
        if(shipRate.value !== 'Free Shipping') {
            return Number(total.toFixed(2)).toLocaleString('en-US') + 25
        } else {
            return Number(total.toFixed(2)).toLocaleString('en-US')
        }
    })
</script>

<style scoped>
    svg {
      font-size: 18px;
    }
    .crsr {
      cursor: pointer;
    }
    .orng {
      color: #F89829;
    }
    .inline {
        display: inline-block;
    }
  .brk {
      word-wrap: break-word;
      padding: 9px 0;
    }
</style>