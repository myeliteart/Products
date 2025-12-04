import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useUserStore = defineStore('user', () => {
  const auth = useLocalStorage('auth', false);

  const tabs = ref( 
    [
      {
        name: 'Profile',
        icon: 'user'
      },
      {
        name: 'Add Album',
        icon: 'paperclip'
      },
      {
        name: 'Edit Album',
        icon: 'pen'
      },
      {
        name: 'Albums',
        icon: 'image'
      },
      {
        name: 'My Orders',
        icon: 'basket-shopping'
      }
    ])
  const selectedTab = ref('')
  
  const profileValues = useLocalStorage('profile', {
      firstName: '',
      lastName: '',
      email: ''
  }
  );

  const toggle = ref(false);

  const role = useLocalStorage('role', 'user');

  return { auth, tabs, selectedTab, toggle, profileValues, role }
})
