<template>
    <div class="mx-auto px-6 md:px-24">
        <div class="flex flex-col lg:flex-row my-8">
            <div class="pb-3 flex-1">
                <nav class="pt-0">
                    <ul class="flex flex-col text-gray-700">
                        <li v-for="tab in tabs" :key="tab">
                            <router-link :to="`/dashboard/${tab.route}`">
                                <div class="leading-10 flex items-center gap-3 crsr">
                                    <font-awesome-icon :icon="['fas', tab.icon]"/>
                                    <div :class="selectedTab == tab ? 'orng' : ''">{{ tab.name }}</div>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div class="flex-5">
                <section class="border border-gray-400 rounded p-4 md:p-8 my-2">
                    <router-view></router-view>
                </section>
            </div>  
        </div>
    </div>

    <div class="relative">
      <font-awesome-icon :icon="['fas', 'angle-up']" class="absoluteTop crsr rounded orng" v-if="top" @click="backToTop" />
    </div>
</template>

<script setup>
    // const selectedComp = ref ('product-list')

    import { useRouter } from 'vue-router';
    const router = useRouter();
    
    import { useToTop } from '@/ToTop.js'
    const { top, backToTop } = useToTop()

    import { useMusicStore } from '@/stores/music';
    const store = useMusicStore();

    import { useUserStore } from '@/stores/user';
    const userStore = useUserStore();

    import { storeToRefs } from 'pinia';
    const { tabs, selectedTab } = storeToRefs(userStore);

    // const hashes = (tab) => {
    //     router.push({ name: 'Dashboard', hash: `#${tab.name.toLowerCase().split(' ').join('-')}`})
    //     selectedTab.value = tab
    // }
    
    // window.addEventListener("scroll", () => {
    //     tabs.value.forEach(tab => {
    //          router.push({ name: 'Dashboard', hash: `#${tab.name.toLowerCase().split(' ').join('-')}`})
    //          selectedTab.value = tab
    //     })
    // })

    // const visibleTabs = computed(() => {
    //     return tabs.value.filter(tab => {
    //         if (tab.icon === 'basket-shopping') {
    //             return store.ordered.length > 0;
    //         }
    //         return true;
    //     })
    // })

    // watch(tabs.value, () => {
    //     if(!Musicstore.ordered.length) {
    //         tabs.value.filter(tab => tab.icon == 'basket-shopping')
    //     }
    // })

</script>

<style scoped>
nav {
    overflow: auto;
    position: -webkit-sticky;
    position: sticky;
    top: 0px;
}
    .absoluteTop{
      position: fixed;
      background-color: #131313;
      padding: 6px 8px;
      bottom: 15px;
      right: 15px;
    }
    .crsr {
      cursor: pointer;
    }
    
    .orng {
      color: #F89829;
    }
</style>