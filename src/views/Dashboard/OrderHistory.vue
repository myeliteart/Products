<template>
    <h3 class="text-2xl font-medium pb-2 mb-2">Order History</h3>
    <div v-for="item in ordered" :key="item.id" class="mt-4 w">
        <img :src="item.thumbnail" class="rounded mb-2 crsr" @click="backToDetails(item)">
        <div class="flex justify-between items-center">
            <div>Order Date</div>
            <div>{{ dateWithoutTime }}</div> 
        </div>
        <div class="flex justify-between items-center">
            <div>Product</div>
            <div>{{ item.title }} x {{ item.quantity }}</div>
        </div>
        <div class="flex justify-between items-center">
            <div>Price</div>
            <div>${{ item.price }}.00</div> 
        </div>
        <hr>
    </div>
</template>

<script setup>
    import { useRouter } from 'vue-router';
    const router = useRouter()

     import { useMusicStore } from '@/stores/music';
    const store = useMusicStore();

    import { storeToRefs } from 'pinia';
    const { ordered } = storeToRefs(store);

    const date = new Date();
    const dateWithoutTime = date.toLocaleDateString();

    const backToDetails = (item) => {
      router.push({name: 'musicDetails', params: {id: item.title.toLowerCase().split(' ').join('-')} })
    }

</script>

<style scoped>
     h4 {
        color: #F89829;
    }
    img{
        width: 55px;
        height: 55px;
    }
    .crsr {
        cursor: pointer;
    }

     .w {
        width: 85%;
    }

    @media screen and (max-width: 780px) { 
    .w {
        width: 100%;
    }
    }
</style>