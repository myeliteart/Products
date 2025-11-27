<template>
  <div class="mx-auto px-6 md:px-24 py-8">
      <h2 class="text-2xl lg:text-4xl font-medium mb-4">About us</h2>
      <div class="flex flex-col lg:flex-row gap-8 justify-between">
        <div class="flex-1">
          <img :src="image" class="rounded" alt="">
        </div>
        <div class="flex-1">
          <span class="py-2">
            Welcome to vue by eli. Your destination for discovering and collecting your favorite veriety of products.
          </span> <br> <br>
          <span>
            Were passionate about bringing together mix products lovers and timeless collections, offering an easy and enjoyable browsing experience. Our goal is to make finding, comparing, and purchasing our products simple — with clean design, fast navigation, and smart features built using modern web technologies.
          </span>
        </div>
      </div>
  </div>
</template>

<script setup>
  const image = new URL('@/assets/img/preview.jpg', import.meta.url).href
</script>

<style scoped>
</style>
