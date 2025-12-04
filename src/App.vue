<template>
     <div class="mx-auto">
        <the-nav></the-nav>       
        <router-view />
        </div>
      <the-footer></the-footer> 
</template>

<script setup>
  import TheNav from './components/TheNav.vue';
  import TheFooter from './components/TheFooter.vue';
  import { RouterView } from 'vue-router'
</script>

<style>
body {
  padding: 0;
  background-color: #f9f9f9 !important;
  height: 100vh;
}
.active {
  font-weight: 600;
  color: #f6ad55;
}

@media (min-width: 1024px) {
 
}
</style>
