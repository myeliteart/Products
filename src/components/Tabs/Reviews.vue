<template>
   <base-button mode="reverse" @click="router.push({ name: 'AddReview'})" class="cursor-pointer">Add Review</base-button>
   <p v-if="!oneAlbum.reviews.length" class="pt-2">There are no reviews yet</p>
    <div v-for="(review, index) in oneAlbum.reviews" :key="review" class="my-4">
        <div v-if="review.rating">Rating: <b>{{ review.rating }}</b></div>
        <p class="my-2">{{ review.title }}</p>
        <p class="leading-6 wrap-break-word">{{ review.comment }}</p>
        <p class="my-2">{{ review.reviewerName }} &nbsp; | &nbsp; {{ review.date }}</p>
        <font-awesome-icon @click="deleteReview(index)" :icon="['fas', 'trash-can']" class="cursor-pointer text-gray-500" />
        <hr class="my-5 text-gray-400">
    </div>
</template>

<script setup>
    import { computed } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    const router = useRouter()
    const route = useRoute();

    import { useMusicStore } from '@/stores/music';
    const store = useMusicStore();

    const oneAlbum = computed(() =>{
        return store.products.find((itemm) => itemm.title.toLowerCase().split(' ').join('-') == route.params.id) 
    })
    const deleteReview = (idx) => {
      oneAlbum.value.reviews.splice(idx, 1)
      oneAlbum.value.reviewCount--
    }

    const date = new Date();
    const dateWithoutTime = date.toLocaleDateString();
</script>

<style scoped>
     .brk {
      word-wrap: break-word;
      padding: 0;
    }
</style>
