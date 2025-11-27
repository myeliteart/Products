<template>
    <div class="container py-5" v-if="store.auth">
        <div class="row gx-3 px-sm-0 px-2">
            <div class="col-lg-2 pb-sm-0 pb-3">
                <nav class="navbar navbar-dark pt-0">
                    <ul class="nav flex-column lh">
                        <li v-for="tab in visibleTabs" :key="tab" class="d-flex align-items-center crsr pb-3" @click="hashes(tab)">
                            <font-awesome-icon :icon="['fas', tab.icon]" class="nice"/>
                            <div :class="selectedTab == tab ? 'orng' : ''" class="ps-3">{{ tab.name }}</div>
                        </li>
                    </ul>
                </nav>
            </div>
            <div class="col-lg-10">
                <section class="border border-secondary px-4 py-4" v-if="role == 'user'" style="height: auto" id="profile">
                    <profile></profile>
                </section>
                <section class="border border-secondary px-4 py-4 mb-3" v-if="role == 'admin'" style="height: auto" id="add-album">
                    <add-album></add-album>
                </section>
                <section class="border border-secondary px-4 py-4 my-3" v-if="Musicstore.fieldsToEdit && role == 'admin'" style="height: auto" id="edit-album">
                    <edit-album></edit-album>
                </section>
                <section class="border border-secondary px-4 py-4 my-3" v-if="Musicstore.albums.length && role == 'admin'" style="height: auto" id="albums">
                    <albums></albums>
                </section>
                <section class="border border-secondary px-4 py-4 my-3" v-if="Musicstore.ordered.length" style="height: auto" id="my-orders">
                    <my-orders></my-orders>
                </section>
            </div>  
        </div>
    </div>

    <div class="position">
      <font-awesome-icon :icon="['fas', 'angle-up']" class="absoluteTop crsr rounded" v-if="top" @click="backToTop" />
    </div>
</template>

<script setup>
    import { computed } from 'vue';

    import Profile from '@/components/Dashboard/Profile.vue';
    import AddAlbum from '@/components/Dashboard/AddAlbum.vue';
    import EditAlbum from '@/components/Dashboard/EditAlbum.vue';
    import Albums from '@/components/Dashboard/Albums.vue';
    import MyOrders from '@/components/Dashboard/MyOrders.vue';

    import { useRouter } from 'vue-router';
    const router = useRouter();
    
    import { useToTop } from '@/ToTop.js'
    const { top, backToTop } = useToTop()

    import { useMusicStore } from '@/stores/music';
    const Musicstore = useMusicStore();

    import { useUserStore } from '@/stores/user';
    const store = useUserStore();

    import { storeToRefs } from 'pinia';
    const { tabs, selectedTab, role } = storeToRefs(store);

    const hashes = (tab) => {
        router.push({ name: 'Dashboard', hash: `#${tab.name.toLowerCase().split(' ').join('-')}`})
        selectedTab.value = tab
    }
    
    // window.addEventListener("scroll", () => {
    //     tabs.value.forEach(tab => {
    //          router.push({ name: 'Dashboard', hash: `#${tab.name.toLowerCase().split(' ').join('-')}`})
    //          selectedTab.value = tab
    //     })
    // })

    const visibleTabs = computed(() => {
        return tabs.value.filter(tab => {
            if(tab.icon === 'user') {
                 return role.value == 'user';
            }
            if(tab.icon === 'paperclip') {
                 return role.value == 'admin';
            }
            if (tab.icon === 'basket-shopping') {
                return Musicstore.ordered.length > 0;
            }
            if(tab.icon === 'pen') {
                return Musicstore.fieldsToEdit && role.value == 'admin';
            }
            if(tab.icon === 'image') {
                return Musicstore.albums.length > 0 && role.value == 'admin';
            }
            return true;
        })
    })
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
 .position{
      position: relative;
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
    svg {
      font-size: 18px;
      color: #F89829;
    }
    .nice {
        font-size: 16px;
        color: #989696;
    }
</style>