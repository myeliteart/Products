<template>
  <div class="container py-5">
  <div class="row gx-4 px-md-0 px-2">
    <h2>About us</h2>
    <div class="col-lg-6 about">
      <p class="py-1">
        Welcome to vue by eli, your destination for discovering and collecting your favorite music albums. Were passionate about bringing together music lovers and timeless collections, offering an easy and enjoyable browsing experience. Our goal is to make finding, comparing, and purchasing albums simple — with clean design, fast navigation, and smart features built using modern web technologies.
      </p>
    </div>
    <div class="col-lg-6">
      <img :src="image" class="rounded img-fluid" alt="bobov rebbe">
    </div>
  </div>
  </div>
</template>

<script setup>
  const image = new URL('@/assets/img/preview.jpg', import.meta.url).href
</script>

<style scoped>
.about p{
  color: #333537;
}
@media (min-width: 1024px) {
 
}
</style>
