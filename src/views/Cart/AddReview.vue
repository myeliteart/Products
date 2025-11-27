<template>
    <div class="mx-auto max-w-[80%] md:max-w-[60%] lg:max-w-[40%] py-8">
        <div class="inline">
            <div class="flex items-center crsr mb-1" @click="router.back">
                <font-awesome-icon :icon="['fas', 'arrow-left']" class="mr-0 sm:mr-2 px-2"/>
            </div> 
        </div>  
       <div class="sm:mr-2 px-2">
            <div class="">
                <div class="flex justify-between items-center my-1" v-if="oneAlbum">
                  <h4 class="pb-2 text-3xl">Rate <span class="font-bold">'{{ oneAlbum.title }}'</span></h4>
                  <img @click="backToDetails(oneAlbum)" :src="oneAlbum.thumbnail" class="rounded crsr">  
                </div>
                
                <Form @submit="seeReviews" :validation-schema="schema">
                <Field name="name" type="text"
                    v-slot="{field, errors, errorMessage}" 
                    >
                    <div class="mt-1">
                        <label for="name" class="block">Name:</label>
                        <input 
                        type="text"
                        id="name"
                        class="border w-full mt-1 border-gray-400 rounded px-2 py-1 focus:outline-none"
                        placeholder="Your Name"
                        v-bind="field"
                        :class="errors.length !== 0 ? 'is-invalid' : 'gray'"
                        />
                    </div>
                    <div class="input_alert"
                        v-if="errors.length !== 0">
                        <small class="red">{{ errorMessage }}</small>
                    </div>
                </Field>

                    <div class="mt-3">
                        <label for="rating">Rating:</label> &nbsp;
                        <select
                            v-model="rating"
                            id="rating"
                            class="border mt-1 w-full border-gray-400 rounded px-2 py-1 focus:outline-none"                     
                            >
                            <option v-for="r in rate" :value="r">{{ r }}</option>
                        </select>
                    </div>
               <Field name="title" type="text"
                    v-slot="{field, errors, errorMessage}" 
                    >
                    <div class="mt-3">
                        <label for="title" class="block">Review Title:</label>
                        <input 
                        type="text"
                        id="title"
                        class="border w-full mt-1 border-gray-400 rounded px-2 py-1 focus:outline-none"
                        placeholder="Your Review Title"
                        v-bind="field"
                        :class="errors.length !== 0 ? 'is-invalid' : 'gray'"
                        />
                    </div>
                    <div class="input_alert"
                        v-if="errors.length !== 0">
                        <small class="red">{{ errorMessage }}</small>
                    </div>
                </Field>

                <Field name="review" type="text"
                    v-slot="{field, errors, errorMessage}" 
                    >
                    <div class="mt-3">
                        <label for="reviewContent">Review:</label>
                        <textarea 
                        type="text"
                        rows="5"
                        id="reviewContent"
                        class="border w-full mt-1 border-gray-400 rounded px-2 py-1 focus:outline-none"
                        placeholder="Your review"
                        v-bind="field"
                        :class="errors.length !== 0 ? 'is-invalid' : 'gray'"
                        ></textarea>
                    </div>
                    <div class="input_alert"
                        v-if="errors.length !== 0">
                        <small class="red">{{ errorMessage }}</small>
                    </div>
                </Field>
                
                <base-button type="submit" class="my-3 w-full crsr">Submit your Review</base-button>
            </Form>
            </div>
       </div>
    </div>
</template>

<script setup>
     import { computed } from 'vue'

    import { useRouter, useRoute } from 'vue-router';
    const router = useRouter()
    const route = useRoute()


    import { useMusicStore } from '@/stores/music';
    const store = useMusicStore();

    import { storeToRefs } from 'pinia';
    const { selectedReview, products, rating, rate } = storeToRefs(store);

     const backToDetails = (item) => {
      router.push({name: 'ProductDetails', params: {id: item.title.toLowerCase().split(' ').join('-')} })
    }

    import { Field, Form } from 'vee-validate';
    import * as yup from 'yup';

    const schema = yup.object({
        name: yup.string().trim()
        .required('Name is required'),
        title: yup.string().trim()
        .required('Title is required')
        .min(7, 'Please enter minimum 7 characters'),
        review: yup.string().trim()
        .required('Review is required')
        .min(20, 'Please enter minimum 20 characters'),
    })

    const oneAlbum = computed(() =>{
        return products.value.find((itemm) => itemm.title.toLowerCase().split(' ').join('-') == route.params.id) 
    })
    console.log(oneAlbum.value) 

    const seeReviews = (values) => {
        oneAlbum.value.reviews.length + 1
        router.push({name: 'ProductDetails'})
        const reviewTest = {
            reviewerName: values.name,
            title: values.title,
            comment: values.review,
            rating: rating.value,
            date: new Date().toLocaleDateString()
        }
        oneAlbum.value.reviews.unshift(reviewTest)
        rating.value = ''
    }
</script>

<style scoped>
    .gray {
        border-color: #828181;
    }
    .red {
        color: red;
    }
    .orng {
        color: #F89829;
    }
    .crsr {
        cursor: pointer;
    }
    img {
        width: 55px;
        height: 55px;
    }
    .inline {
        display: inline-block;
    }
</style>