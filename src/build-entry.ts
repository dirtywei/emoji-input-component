import { App } from 'vue'
import EmojiInput from './components/EmojiInput.vue'

export { EmojiInput }

export default {
  install(app: App) {
    app.component('EmojiInput', EmojiInput)
  }
}
