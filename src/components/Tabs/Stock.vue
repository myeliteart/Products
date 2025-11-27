<template>
    <div class="brk">
        <p><b>{{ currentAlbumItem.stock }}</b> in stock</p>
    </div>
</template>

<script setup>
   import { computed } from 'vue';

   import { useRouter, useRoute } from 'vue-router';
   const router = useRouter()
   const route = useRoute();

    import { useMusicStore } from '@/stores/music';
    const store = useMusicStore()

    const currentAlbumItem = computed(() => {
        return store.products.find(item => item.title.toLowerCase().split(' ').join('-') == route.params.id)
    })
</script>

<style scoped>
     .brk {
      word-wrap: break-word;
      padding: 0;
    }
</style>