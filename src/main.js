import { createApp } from 'vue'
import { createPinia } from 'pinia'


import App from './App.vue'
import router from './router'

/* vue.prototype.$axios = axios; */

const app = createApp(App)


/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { fas } from '@fortawesome/free-solid-svg-icons'

/* import specific icons */
import { far } from '@fortawesome/free-regular-svg-icons'

/* add icons to the library */
library.add(fas, far)

import BaseCard from './components/Layouts/BaseCard.vue'
import BaseButton from './components/Layouts/BaseButton.vue'
import BaseModal from './components/Layouts/BaseModal.vue'

import AdditionalInfo from '@/components/Tabs/AdditionalInfo.vue';
import Reviews from '@/components/Tabs/Reviews.vue';
import Stock from './components/Tabs/Stock.vue'

// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.bundle.min.js'


app.use(createPinia())
app.use(router)
app.component('base-card', BaseCard)
app.component('base-button', BaseButton)
app.component('base-modal', BaseModal)
app.component('additional-info', AdditionalInfo)
app.component('reviews', Reviews)
app.component('stock', Stock)
app.component('font-awesome-icon', FontAwesomeIcon).mount('#app')
