<template>
    <h3 class="text-2xl font-medium pb-2 mb-2">Create Product</h3>
    <Form @submit="submitAlbum" :validation-schema="schema">
      <Field name="title" type="text"
            v-slot="{field, errors, errorMessage}" 
            >
            <div class="mt-0">
                <label>Product title:</label>
                <input 
                type="text"
                class="mt-1 block w-full lg:w-[75%] border border-gray-500 px-2 py-1 rounded outline-0" 
                placeholder="Enter product title" 
                v-bind="field"
                :class="{'is-invalid': errors.length !== 0, 'stylee': errors.length == 0}"
                />
            </div>
            <div class="input_alert"
                v-if="errors.length !== 0">
                <small class="red">{{ errorMessage }}</small>
            </div>
        </Field>

        <Field name="price" type="number"
            v-slot="{field, errors, errorMessage}" 
            >
            <div class="mt-4">
                <label>Product Price</label>
                <input 
                type="number"
                class="mt-1  block w-full lg:w-[75%] border border-gray-500 px-2 py-1 rounded outline-0" 
                placeholder="Enter product price" 
                v-bind="field"
                />
            </div>
            <div class="input_alert"
                v-if="errors.length !== 0">
                <small class="red">{{ errorMessage }}</small>
            </div>
        </Field>

           <Field name="category"
            v-slot="{field, errors, errorMessage}" 
            >
            <div class="mt-4">
                <label>Product Category</label>
                <select 
                class="mt-1 block w-full lg:w-[75%] border border-gray-500 px-2 py-1 rounded outline-0" 
                v-bind="field"
                :value="field.value"
                >
                <option disabled value="">Please select one</option>
                <option v-for="cat in musicStore.albumTitle" :value="cat">{{ cat }}</option>
                </select>
            </div>
            <div class="input_alert"
                v-if="errors.length !== 0">
                <small class="red">{{ errorMessage }}</small>
            </div>
        </Field>

            <!-- <label class="mt-3 mb-1">Product Category:</label>
            <div class="mt-1 items-center">
                <input type="checkbox" class="mr-2 crsr" :value="cat" v-model="musicStore.selectedAlbum" />
                <label>{{ cat }} Music</label>
            </div> -->

            <Field name="description" type="text"
            v-slot="{field, errors, errorMessage}" 
            >
            <div class="mt-4">
                <label>Product Description</label>
                <textarea 
                    type="text"
                    rows="5"
                    class="mt-1  block w-full lg:w-[75%] border border-gray-500 px-2 py-1 rounded outline-0" 
                    placeholder="Enter product description" 
                    v-bind="field"
                    >
                </textarea>
            </div>
            <div class="input_alert"
                v-if="errors.length !== 0">
                <small class="red">{{ errorMessage }}</small>
            </div>
        </Field>
        <Field name="thumbnail" type="text"
            v-slot="{field, errors, errorMessage}" 
            >
            <div class="mt-4">
                <label>Product Image</label>
                <input 
                type="text"
                class="mt-1  block w-full lg:w-[75%] border border-gray-500 px-2 py-1 rounded outline-0" 
                placeholder="Enter product image" 
                v-bind="field"
                :class="errors.length !== 0 ? 'is-invalid' : 'stylee'"
                />
            </div>
            <div class="input_alert"
                v-if="errors.length !== 0">
                <small class="red">{{ errorMessage }}</small>
            </div>
        </Field>

        <div class="mt-4">
            <base-button class="cursor-pointer" type="submit">Publish your product</base-button>
        </div>
    </Form>
</template>

<script setup>
    import axios from 'axios'

    import { useUserStore } from '@/stores/user';
    const store = useUserStore();

    import { useMusicStore } from '@/stores/music';
    const musicStore = useMusicStore();
    
    import { useRouter } from 'vue-router';
    const router = useRouter()
    
    import { Field, Form } from 'vee-validate';
    import * as yup from 'yup';

    const schema = yup.object({
        // desc: yup.string().trim()
        // .when([], {
        //     is: () => fieldsToEdit.value == false,
        //     then: () => yup.string().required('Music description is required')
        //     .min(20, 'Please enter minimum 20 characters'),
        //     otherwise: () => yup.string().notRequired()
        // }),
        title: yup.string().trim()
        .required('Product title is required')
        .min(4, 'Please enter minimum 4 characters'),
        price: yup.string().trim()
        .required('Price is required'),
        category: yup.string()
        .required ('Category is required'),
        description: yup.string().trim()
        .required('Music description is required')
        .min(20, 'Please enter minimum 20 characters'),
        thumbnail: yup.string()
        .required('Image is required')
        .url()
      })

       const submitAlbum = async (values) => {
        // if(musicStore.selectedAlbum.length == 0) {
        //    musicStore.NewAlbumError = true
        //    return;
        // } else {
            try {
              console.log("values:", values)
              const res = await axios.post('https://cors-anywhere.herokuapp.com/https://dummyjson.com/products/add', {
                title: values.title,
                description: values.description,
                price: values.price,
                category: values.category,
                thumbnail: values.thumbnail
              }, {
                headers: {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest"
                }
            })
              musicStore.products.unshift(res.data)

              router.push('/products')

            } catch (err){
                console.log("Error posting the product:", err)
            }
            
        }
        
        // console.log(musicStore.products)
    

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
    .crsr{
        cursor: pointer;
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
</style>