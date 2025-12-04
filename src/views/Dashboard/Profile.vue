<template>
    <Form @submit="editProfile" :validation-schema="schema" class="w">
        <h4 class="mb-4">Profile</h4>
      <Field name="first" type="text"
            v-model="profileEditedValues.firstName"
            v-slot="{field, errors, errorMessage}" 
            >
            <div class="mt-2">
                <label>First Name</label>
                <input 
                type="text"
                :disabled="!fields"
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
        <Field name="last" type="text"
            v-model="profileEditedValues.lastName"
            v-slot="{field, errors, errorMessage}" 
            >
            <div class="mt-2">
                <label>Last Name</label>
                <input 
                type="text"
                :disabled="!fields"
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
        <Field name="email" type="text"
            v-model="profileEditedValues.email"
            v-slot="{field, errors, errorMessage}" 
            >
            <div class="mt-2">
                <label>Email</label>
                <input 
                type="text"
                :disabled="!fields"
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
        <base-button :mode="!fields ? '' : 'reverse'" class="mt-3">{{ fields == false ? 'Edit' : 'Save' }} Profile</base-button>
    </Form>
</template>

<script setup>
    // import { db, auth } from '@/firebase';
    
    import { ref } from 'vue';
    import { Field, Form } from 'vee-validate';
    import * as yup from 'yup';

    const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const schema = yup.object({
        first: yup.string().trim()
        .required('First name is required'),
        last: yup.string().trim()
        .required('First name is required'),
        email: yup.string().trim()
        .required('Email is required')
        .matches(emailRegExp, 'Email Address is not valid'),
    })

    import { useUserStore } from '@/stores/user';
    const userStore = useUserStore();

    import { storeToRefs } from 'pinia';
    const { profileValues } = storeToRefs(userStore);
    
    const fields = ref(false)

    const profileEditedValues = ref(
        {
            firstName: profileValues.value.firstName,
            lastName: profileValues.value.lastName,
            email: profileValues.value.email
        }
    )

    const editProfile = () =>{
        const user = auth.currentUser;
        if(user) {
            const userId = user.uid;
            db.collection('users').doc(userId).update({
                firstName: profileEditedValues.value.firstName,
                lastName: profileEditedValues.value.lastName,
                email: profileEditedValues.value.email
            }).then(() => {
                profileValues.value = { ...profileEditedValues.value}
                fields.value = !fields.value; 
            }).catch((err) => {
                 alert('Failed to update profile: ' + err.message);
            })
        }
    }
</script>

<style scoped>
    .stylee {
        background-color: transparent;       
        border-color: #828181;
    }
    .stylee::placeholder{
        color: #828181;
    }
    h4 {
        color: #F89829;
    }
    input:disabled {
        pointer-events:none;
    }
    .red {
        color: red;
    }
     .w {
        width: 85%;
    }
    @media screen and (max-width: 780px) {
    .w {
        width: 100%;
    }
    }
</style>