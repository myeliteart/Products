import { ref } from 'vue'
import { defineStore } from 'pinia'
// import { useLocalStorage } from '@vueuse/core'

export const useUserStore = defineStore('user', () => {

  const fieldsToEdit = ref(false);

  const tabs = ref( 
    [
      {
        name: 'Product List',
        icon: 'list',
        route: 'product-list'
      },
      // {
      //   name: 'New Product',
      //   icon: 'plus',
      //   route: 'new-product'
      // },
      {
        name: 'Order History',
        icon: 'history',
        route: 'order-history'
      }
    ])
  const selectedTab = ref('')
  
  // const profileValues = useLocalStorage('profile', {
  //     firstName: '',
  //     lastName: '',
  //     email: ''
  // }
  // );

  const toggle = ref(false);

  // const role = useLocalStorage('role', 'user');

  return { tabs, selectedTab, toggle, fieldsToEdit }
})
