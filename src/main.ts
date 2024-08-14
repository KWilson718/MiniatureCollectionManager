// Vue 
import { createApp } from 'vue'

// Local Styles
import './style.css'

// Components
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  theme:{
    defaultTheme: 'dark',
    themes:{
      // Can add in themes here generated in the format from https://vuetifyjs.com/en/features/theme/#javascript
    }
  },
})

createApp(App).use(vuetify).mount('#app').$nextTick(() => {
  // Use contextBridge
  window.ipcRenderer.on('main-process-message', (_event, message) => {
    console.log(message)
  })
})
