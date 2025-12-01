<template>
    <div class="px-6 md:px-24 py-5" v-if="cart.length">
        <div class="inline">
            <div class="flex items-center crsr mb-3" @click="router.back">
                <font-awesome-icon :icon="['fas', 'arrow-left']" class=":sm-2 mr-0 :sm-px-0 px-1"/>
            </div>  
        </div>
        
        <div class="flex flex-col-reverse lg:flex-row justify-between gap-10 lg:gap-16 :sm-px-0 px-2">
            <div class="flex-2">
                <h3 class="text-2xl lg:text-3xl font-medium pb-2">Checkout</h3>
                <hr class="mt-0 text-gray-400">
                <p class="pt-2 font-medium">Shipping Info</p>
                <Form @submit="onSubmit" :validation-schema="schema" class="my-3">
                <Field name="name" type="text"
                    v-slot="{field, errors, errorMessage}" 
                    >
                    <input 
                    type="text"
                    class="block w-full border border-gray-500 px-2 py-1 rounded outline-0" 
                    placeholder="Enter your name" 
                    v-bind="field"
                    :class="errors.length !== 0 ? 'is-invalid' : 'gray'"
                    />
                    <div class="input_alert"
                        v-if="errors.length !== 0">
                        <small class="red">{{ errorMessage }}</small>
                    </div>
                </Field> 
                <Field name="company" type="text"
                    v-slot="{field}" 
                    >
                    <input 
                    type="text"
                    class="mt-3 block w-full border border-gray-500 px-2 py-1 rounded outline-0" 
                    placeholder="Enter your company name (optional)" 
                    v-bind="field"
                    />
                </Field>
                <Field name="country" type="text"
                    v-slot="{field, errors, errorMessage}" 
                    >
                    <input 
                    type="text"
                    class="mt-3 block w-full border border-gray-500 px-2 py-1 rounded outline-0" 
                    placeholder="Select a country" 
                    v-bind="field"
                     :class="errors.length !== 0 ? 'is-invalid' : 'gray'"
                    />
                    <div class="input_alert"
                        v-if="errors.length !== 0">
                        <small class="red">{{ errorMessage }}</small>
                    </div>
                </Field>
                <Field name="address" type="text"
                    v-slot="{field, errors, errorMessage}" 
                    >
                    <input 
                    type="text"
                    class="mt-3 block w-full border border-gray-500 px-2 py-1 rounded outline-0" 
                    placeholder="Enter your Street Address" 
                    v-bind="field"
                    :class="errors.length !== 0 ? 'is-invalid' : 'gray'"
                    />
                    <div class="input_alert"
                        v-if="errors.length !== 0">
                        <small class="red">{{ errorMessage }}</small>
                    </div>
                </Field>
                <Field name="city" type="text"
                    v-slot="{field, errors, errorMessage}" 
                    >
                    <input 
                    type="text"
                    class="mt-3 block w-full border border-gray-500 px-2 py-1 rounded outline-0" 
                    placeholder="Enter your City" 
                    v-bind="field"
                    :class="errors.length !== 0 ? 'is-invalid' : 'gray'"
                    />
                    <div class="input_alert"
                        v-if="errors.length !== 0">
                        <small class="red">{{ errorMessage }}</small>
                    </div>
                </Field>
                <Field name="state" type="text"
                    v-slot="{field, errors, errorMessage}">
                    <select id="state" class="mt-3 block w-full border border-gray-500 px-2 py-1 rounded outline-0" 
                    :class="errors.length !== 0 ? 'is-invalid' : 'gray'" 
                    v-bind="field"
                    >
                        <option value="" selected="selected">Select a State</option>
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="DC">District Of Columbia</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                    </select>
                    <div class="input_alert"
                        v-if="errors.length !== 0">
                        <small class="red">{{ errorMessage }}</small>
                    </div>
                </Field>
                <Field name="zip" type="text"
                    v-slot="{field, errors, errorMessage}" 
                    >
                    <input 
                    type="text"
                    class="mt-3 block w-full border border-gray-500 px-2 py-1 rounded outline-0" 
                    placeholder="Enter your Zip Code" 
                    v-bind="field"
                    :class="errors.length !== 0 ? 'is-invalid' : 'gray'"
                    />
                    <div class="input_alert"
                        v-if="errors.length !== 0">
                        <small class="red">{{ errorMessage }}</small>
                    </div>
                </Field>
                
                <Field name="notes"
                    v-slot="{field}" 
                    >
                    <textarea 
                    type="text"
                    rows="6"
                   class="mt-3 wrap-break-word block w-full border border-gray-500 px-2 py-1 rounded outline-0" 
                    placeholder="Notes about your order.." 
                    v-bind="field"
                    ></textarea>
                </Field>

                <div class="my-4">
                    <input type="checkbox" checked @change="addShippingDetails">
                     <label>Billing same as Shipping</label>
                </div>
              
             <div v-if="shipDetails" class="mt-3 mb-5">
                <p class="text-1xl font-medium">Billing Info</p>
                <Field name="shipname" type="text"
                    v-slot="{field, errors, errorMessage}" 
                    >
                    <input 
                    type="text"
                    class="mt-3 block w-full border border-gray-500 px-2 py-1 rounded outline-0" 
                    placeholder="Enter your name" 
                    v-bind="field"
                     :class="errors.length !== 0 ? 'is-invalid' : 'gray'"
                    />
                    <div class="input_alert"
                        v-if="errors.length !== 0">
                        <small class="red">{{ errorMessage }}</small>
                    </div>
                </Field> 
                <Field name="shipcountry" type="text"
                    v-slot="{field, errors, errorMessage}" 
                    >
                    <input 
                    type="text"
                    class="mt-3 block w-full border border-gray-500 px-2 py-1 rounded outline-0" 
                    placeholder="Select a country" 
                    v-bind="field"
                    :class="errors.length !== 0 ? 'is-invalid' : 'gray'"
                    />
                    <div class="input_alert"
                        v-if="errors.length !== 0">
                        <small class="red">{{ errorMessage }}</small>
                    </div>
                </Field>
                <Field name="shipaddress" type="text"
                    v-slot="{field, errors, errorMessage}" 
                    >
                    <input 
                    type="text"
                    class="mt-3 block w-full border border-gray-500 px-2 py-1 rounded outline-0"  
                    placeholder="Enter your Street Address" 
                    v-bind="field"
                     :class="errors.length !== 0 ? 'is-invalid' : 'gray'"
                    />
                    <div class="input_alert"
                        v-if="errors.length !== 0">
                        <small class="red">{{ errorMessage }}</small>
                    </div>
                </Field>
                <Field name="shipcity" type="text"
                     v-slot="{field, errors, errorMessage}" 
                    >
                    <input 
                    type="text"
                    class="mt-3 block w-full border border-gray-500 px-2 py-1 rounded outline-0" 
                    placeholder="Enter your City" 
                    v-bind="field"
                    :class="errors.length !== 0 ? 'is-invalid' : 'gray'"
                    />
                    <div class="input_alert"
                        v-if="errors.length !== 0">
                        <small class="red">{{ errorMessage }}</small>
                    </div>
                </Field>
                <Field name="shipstate" type="text"
                    v-slot="{field, errors, errorMessage}" 
                    >
                    <select id="state" class="mt-3 block w-full border border-gray-500 px-2 py-1 rounded outline-0" :class="errors.length !== 0 ? 'is-invalid' : 'gray'" v-bind="field">
                        <option value="" selected="selected">Select a State</option>
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="DC">District Of Columbia</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                    </select>
                    <div class="input_alert"
                        v-if="errors.length !== 0">
                        <small class="red">{{ errorMessage }}</small>
                    </div>
                </Field>
                <Field name="shipzip" type="text"
                    v-slot="{field, errors, errorMessage}" 
                    >
                    <input 
                    type="text"
                    class="mt-3 block w-full border border-gray-500 px-2 py-1 rounded outline-0" 
                    placeholder="Enter your Zip Code" 
                    v-bind="field"
                    :class="errors.length !== 0 ? 'is-invalid' : 'gray'"
                    />
                    <div class="input_alert"
                        v-if="errors.length !== 0">
                        <small class="red">{{ errorMessage }}</small>
                    </div>
                </Field>
                <Field name="phone" type="text"
                    v-slot="{field, errors, errorMessage}" 
                    >
                    <input 
                    type="text"
                   class="mt-3 block w-full border border-gray-500 px-2 py-1 rounded outline-0" 
                    placeholder="Enter your Phone number" 
                    v-bind="field"
                    :class="errors.length !== 0 ? 'is-invalid' : 'gray'"
                    />
                    <div class="input_alert"
                        v-if="errors.length !== 0">
                        <small class="red">{{ errorMessage }}</small>
                    </div>
                </Field>
                <Field name="email"
                    v-slot="{field, errors, errorMessage}" 
                    >
                    <input 
                    type="email"
                    class="mt-3 block w-full border border-gray-500 px-2 py-1 rounded outline-0"  
                    placeholder="Enter your Email Address" 
                    v-bind="field"
                    :class="errors.length !== 0 ? 'is-invalid' : 'gray'"
                    />
                    <div class="input_alert"
                        v-if="errors.length !== 0">
                        <small class="red">{{ errorMessage }}</small>
                    </div>
                </Field>
                </div>
                <base-button type="submit" class="cursor-pointer">Place Order</base-button>
                </Form>
            </div> 

            <div class="flex-1 mb-8">
                <h3 class="text-2xl lg:text-3xl font-medium pb-2">Order Summary</h3>
                <hr class="mt-0 text-gray-400">
                <div class="flex justify-between py-4">
                    <div>Product</div>
                    <div>Subtotal</div>
                </div>
                <hr class="mt-0 text-gray-400">
                <div v-for="c in cart" :key="c.id" class="flex justify-between py-4">
                    <p>{{ c.title }} x {{ c.quantity }}</p>
                    <p>${{ Number(c.price.toFixed(2).toLocaleString('en-US')) * c.quantity }}</p>
                </div>
                <hr class="mt-0 text-gray-400">
                    <div class="flex justify-between py-4">
                        <p><b>Shipping:</b></p>
                        <p class="">{{ shippingResult }}</p>
                    </div>
                    <div class="flex justify-between">
                        <p><b>Grand Total:</b></p>
                        <p><b>${{ Number(totalWithSHipping.toFixed(2)).toLocaleString('en-US')}}</b></p>
                    </div>
                   
            </div>
        </div>
    </div>

    <div class="position">
      <font-awesome-icon :icon="['fas', 'angle-up']" class="absoluteTop crsr rounded orng" v-if="top" @click="backToTop" />
    </div>
</template>


<script setup>
     import { ref, computed } from 'vue';
      import { useRouter } from 'vue-router';
      const router = useRouter();

    import { useMusicStore } from '@/stores/music';
    const store = useMusicStore();

    import { storeToRefs } from 'pinia';
    const { cart, CartCount, shipping, billing, shipDetails, card, shipRate, ordered, completed } = storeToRefs(store);

    import { useToTop } from '@/ToTop.js'
    const { top, backToTop } = useToTop();

    const total = ref(cart.value.reduce((acc, item) => {
      return acc + item.price * item.quantity
    }, 0))

    import { Field, Form } from 'vee-validate';
    import * as yup from 'yup';

    
    const onSubmit = (values) => {
        // const newOrder = {
        //    title: cart.value.title,
        //    img: cart.value.img,
        //    price: cart.value.price,
        // }        
        // ordered.value.push(newOrder)
        
        const test = {
            name: values.name,
            coName: values.company,
            country: values.country,
            address: values.address,
            city: values.city,
            state: values.state,
            zip: values.zip,
            notes: values.notes
        }
        shipping.value.push(test)

        const testTwo = {
            Sname: values.shipname,
            Scountry: values.shipcountry,
            Saddress: values.shipaddress,
            Scity: values.shipcity,
            Sstate: values.shipstate,
            Szip: values.shipzip,
            phone: values.phone,
            email: values.email,
        }
        billing.value.push(testTwo)

        router.push('/completed')
        CartCount.value = 0
        completed.value = [...cart.value]
        ordered.value.push(...cart.value)
        shipDetails.value = false
        cart.value = []
    };

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const schema = yup.object({
    name: yup.string().trim()
    .required('Name is required')
    .min(5)
    .max(20),
    company: yup.string()
    .notRequired(),
    country: yup.string().trim()
    .required('Country is required'),
    address: yup.string().trim()
    .required('Address is required'),
    city: yup.string().trim()
    .required('City is required'),
    state: yup.string().trim()
    .required('State is required'),
    zip: yup.string().trim()
    .required('Zip code is required')
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(5, 'Must be exactly 5 digits')
    .max(5, 'Must be exactly 5 digits'),
    notes: yup.string()
    .notRequired(),
    cardNumber: yup.string().trim()
    .notRequired(),
    cardExp: yup.string().trim()
    .notRequired(),
    cardCode: yup.string()
    .notRequired(),
    shipname: yup.string().trim()
    .when([], {
        is: () => shipDetails.value == true,
        then: () => yup.string().required('Name is required')
        .min(5)
        .max(20),
        otherwise: () => yup.string().notRequired()
    }),
    shipcountry: yup.string().trim()
    .when([], {
        is: () => shipDetails.value == true,
        then: () => yup.string().required('Country is required'),
        otherwise: () => yup.string().notRequired()
    }),
    shipaddress: yup.string().trim()
    .when([], {
        is: () => shipDetails.value == true,
        then: () => yup.string().required('Address is required'),
        otherwise: () => yup.string().notRequired()
    }),
    shipcity: yup.string().trim()
    .when([], {
        is: () => shipDetails.value == true,
        then: () => yup.string().required('City is required'),
        otherwise: () => yup.string().notRequired()
    }),
    shipstate: yup.string().trim()
    .when([], {
        is: () => shipDetails.value == true,
        then: () => yup.string().required('State is required'),
        otherwise: () => yup.string().notRequired()
    }),
    shipzip: yup.string().trim()
    .when([], {
        is: () => shipDetails.value == true,
        then: () => yup.string().trim()
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(5, 'Must be exactly 5 digits')
        .max(5, 'Must be exactly 5 digits')
        .required('Zip Code is required'),
        otherwise: () => yup.string().notRequired()
    }),
    phone: yup.string().trim()
    .when([], {
        is: () => shipDetails.value == true,
        then: () => yup.string().required('Phone is required')
        .min(10, "Phone number is too short")
        .max(10, "Phone number is too long")
        .matches(phoneRegExp, 'Phone number is not valid'),
        otherwise: () => yup.string().notRequired()
    }),
    email: yup.string().trim()
    .when([], {
        is: () => shipDetails.value == true,
        then: () => yup.string().required('Email address is required')
        .matches(emailRegExp, 'Email Address is not valid'),
        otherwise: () => yup.string().notRequired()
    }),
    })

    const addShippingDetails = () => {
       shipDetails.value = !shipDetails.value;
    }

    const shippingResult = computed(() =>{
        if(total.value >= 300){
            return shipRate.value = 'Free Shipping'
        } else {
            return shipRate.value = '$' + 25
        }
    })

    const totalWithSHipping = computed(() => {
        if(shipRate.value !== 'Free Shipping') {
            return total.value + 25
        } else {
            return total.value
        }
    })
</script>

<style scoped>
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
    svg {
      font-size: 18px;
    }
    
    .crsr{
        cursor: pointer; 
    }

    .orng{
        color: #F89829;
    }
    .red {
        color: red;
    }
    input[type=checkbox] {
        width: 17px;
        height: 17px;
        margin-right: 10px;
        accent-color: #F89829;
    }
    .inline {
        display: inline-block;
    }
</style>