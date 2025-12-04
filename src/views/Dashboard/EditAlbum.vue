<template>
    <h4 class="mb-4">Edit Album</h4> 
    <Form @submit="submitEditedAlbum" :validation-schema="schema" class="w">
      <Field name="title" type="text"
            v-model="editText.title"
            v-slot="{field, errors, errorMessage}" 
            >
            <div class="mt-2">
                <label>Music Title</label>
                <input 
                type="text"
                class="form-control mt-1"
                v-bind="field"
                :class="{'is-invalid': errors.length !== 0, 'stylee': errors.length == 0}"
                />
            </div>
            <div class="input_alert"
                v-if="errors.length !== 0">
                <small class="red">{{ errorMessage }}</small>
            </div>
        </Field>
        <Field name="artist" type="text"
            v-model="editText.artist"
            v-slot="{field, errors, errorMessage}" 
            >
            <div class="mt-2">
                <label>Music Artist</label>
                <input 
                type="text"
                class="form-control mt-1"
                v-bind="field"
                :class="{'is-invalid': errors.length !== 0, 'stylee': errors.length == 0}"
                />
            </div>
            <div class="input_alert"
                v-if="errors.length !== 0">
                <small class="red">{{ errorMessage }}</small>
            </div>
        </Field>
        <Field name="price" type="text"
            v-model="editText.price"
            v-slot="{field, errors, errorMessage}" 
            >
            <div class="mt-2">
                <label>Music Price</label>
                <input 
                type="text"
                class="form-control mt-1"
                v-bind="field"
                :class="{'is-invalid': errors.length !== 0, 'stylee': errors.length == 0}"
                />
            </div>
            <div class="input_alert"
                v-if="errors.length !== 0">
                <small class="red">{{ errorMessage }}</small>
            </div>
        </Field>

        <Field name="tag" type="text"
         v-model="editText.tag"
        v-slot="{field}"
        >
            <div class="mt-2">
                <label>Tag</label>
                <input 
                type="text"
                class="form-control mt-1 stylee"
                placeholder="Enter Tag" 
                v-bind="field"
                />
            </div>
        </Field>

        <label class="mt-3 mb-1">Edit your Catagories</label>
        <div class="mt-1 me-3 align-items-center" v-for="albm in albumTitle">
            <input type="checkbox" class="me-2 crsr" :value="albm" v-model="editText.cat" />
            <label>{{ albm }} Music</label>
        </div>

        <Field name="desc" type="text"
            v-model="editText.desc"
            v-slot="{field, errors, errorMessage}" 
            >
            <div class="mt-3">
                <label>Music Description</label>
                <textarea 
                    type="text"
                    rows="5"
                    class="form-control mt-1"
                    v-bind="field"
                    :class="errors.length !== 0 ? 'is-invalid' : 'stylee'">
                </textarea>
            </div>
            <div class="input_alert"
                v-if="errors.length !== 0">
                <small class="red">{{ errorMessage }}</small>
            </div>
        </Field>

        <Field name="img" type="text"
             v-model="editText.img"
            v-slot="{field, errors, errorMessage}" 
            >
            <div class="mt-3">
                <label>Music Image</label>
                <input 
                type="text"
                class="form-control mt-1"
                v-bind="field"
                :class="errors.length !== 0 ? 'is-invalid' : 'stylee'"
                />
            </div>
            <div class="input_alert"
                v-if="errors.length !== 0">
                <small class="red">{{ errorMessage }}</small>
            </div>
        </Field>

        <div class="d-flex mt-3">
            <base-button mode="reverse" class="me-2" @click="musicStore.fieldsToEdit = false">Cancel</base-button>
            <base-button type="submit">Edit Album</base-button>
        </div>
    </Form>

    <teleport to="body">
          <div class="wi">
          <base-modal v-if="NewAlbumError">
            <div class="text-end pb-1">
              <font-awesome-icon @click="cancel" :icon="['fas', 'xmark']" class="crsr"></font-awesome-icon>
            </div>
            <div class="p-2">
                <h5>Please select at least one category</h5>
                <div class="d-flex justify-content-end align-items-center mt-3">
                    <base-button class="crsr" @click="cancel">Ok</base-button>
                </div>
          </div>
          </base-modal>
        </div>
    </teleport> 
</template>

<script setup>
    import { useUserStore } from '@/stores/user';
    const store = useUserStore();

    import { useMusicStore } from '@/stores/music';
    const musicStore = useMusicStore();
    
    import { storeToRefs } from 'pinia';
    const { albums, editText, albumTitle, NewAlbumError } = storeToRefs(musicStore);

    import { useRouter } from 'vue-router';
    const router = useRouter()

    import { Field, Form } from 'vee-validate';
    import * as yup from 'yup';

    console.log(editText.value) 

    const cancel = () => {
      NewAlbumError.value = false;
    }

    const submitEditedAlbum = () => {
        if(editText.value.cat.length == 0) {
           NewAlbumError.value = true
        } else {
        router.push('/music')
        let index = albums.value.findIndex((item) => item.id == editText.value.id);

        albums.value[index].title = editText.value.title
        albums.value[index].artist = editText.value.artist
        albums.value[index].price = editText.value.price
        albums.value[index].tag = editText.value.tag
        albums.value[index].cat = editText.value.cat
        albums.value[index].desc = editText.value.desc
        albums.value[index].img = editText.value.img

        musicStore.fieldsToEdit = false
    }
    }
   
    const schema = yup.object({
        title: yup.string().trim()
        .required('Music title is required')
        .min(4, 'Please enter minimum 4 characters'),
        artist: yup.string().trim()
        .required('Music artist is required')
        .min(3, 'Please enter minimum 3 characters'),
        price: yup.string().trim()
        .required('Price is required'),
        tag: yup.string()
        .notRequired(),
        desc: yup.string().trim()
        .required('Music description is required')
        .min(20, 'Please enter minimum 20 characters'),
        img: yup.string()
        .required('Image is required')
      })

      import { Cloudinary } from '@cloudinary/url-gen';

      // Create a Cloudinary instance and set your cloud name.
      const cld = new Cloudinary({
        cloud: {
          cloudName: 'demo',
        },
      });
</script>

<style scoped>
    h4 { color: #F89829; }

    .red {
        color: red;
    }
    .stylee {        
        color: #333537;
        border-color: #333537;
    }
    .stylee::placeholder{
        color: #828181;
    }
  
    input[type=checkbox] {
      width: 16px;
      height: 16px;
      accent-color: #F89829;
    }
    .crsr {
        cursor: pointer;
    }

     .w {
        width: 85%;
    }
    .wi {
      width: 100%;
    }
    @media screen and (max-width: 780px) {
    .wi {
      width: 60%;
    }
    .w {
        width: 100%;
    }
    }
</style>