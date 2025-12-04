<template>
    <div class="w-full">
        <div v-for="item in products" :key="item.id">
          <div class="flex gap-10 flex-row justify-between items-center">
            <img :src="item.thumbnail" class="size-16 lg:size-20 crsr" @click="backToDetails(item)">
            <div class="crsr hover:underline" @click="backToDetails(item)">{{ item.title }}</div>
            <div>{{ item.category }}</div>
            <div class="crsr" @click="editAlbum(item)">
                <font-awesome-icon :icon="['fas', 'pen']" class="trash"/>
            </div>
            <div class="crsr" @click="selectedAlbumToDelete = item">
              <font-awesome-icon :icon="['far', 'trash-can']" class="trash"/>
            </div>
          </div>
          <hr class="my-4 border-gray-400"></hr>
        </div>
    </div>

    <teleport to="body">
        <div>
        <base-modal v-if="selectedAlbumToDelete">
          <div class="text-end px-6 py-4">
            <font-awesome-icon @click="cancel" :icon="['fas', 'x']" class="crsr"></font-awesome-icon>
          </div>
          <div class="p-6">
            <h5>Are you sure you want to delete <b>{{ selectedAlbumToDelete.title }}</b>?</h5>
            <div class="flex justify-end items-center mt-3 crsr">
              <div class="me-3" @click="cancel">Cancel</div>
              <base-button @click="removeAlbum">Delete</base-button>
            </div>
        </div>
        </base-modal>
      </div>
    </teleport> 

</template>

<script setup>
    import axios from 'axios'
    import { useRouter } from 'vue-router';
    const router = useRouter()

    import { useMusicStore } from '@/stores/music';
    const store = useMusicStore();

    import { storeToRefs } from 'pinia';
    const { products, fieldsToEdit, editText, selectedAlbumToDelete } = storeToRefs(store);

    import { useUserStore } from '@/stores/user';
    const storeuser = useUserStore();

    // const deleteAlbum = (item) => {
    //    albums.value = albums.value.filter(itm => itm !== item) 
    // }

    const backToDetails = (item) => {
      router.push({name: 'ProductDetails', params: {id: item.title.toLowerCase().split(' ').join('-')} })
    }
    

    const editAlbum = (item) => {
      fieldsToEdit.value = true
       editText.value = {
          id: item.id,
          title: item.title,
          artist: item.artist,
          price: item.price,
          tag: item.tag,
          cat: item.cat,
          desc: item.desc,
          img: item.img
       }
    }

    const date = new Date();
    const dateWithoutTime = date.toLocaleDateString();
    console.log(dateWithoutTime);

    const cancel = () => {
      selectedAlbumToDelete.value = null;
    }

      const removeAlbum = () => {
         store.deleteProduct(selectedAlbumToDelete.value.id)
          selectedAlbumToDelete.value = null
      }
</script>

<style scoped>
    table, td, th {
      border: 1px solid #6f7071;
      border-collapse: collapse;
      padding: 7px 13px;
   }

    .crsr {
      cursor: pointer;
    }
</style>