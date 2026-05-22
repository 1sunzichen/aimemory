import MyLayout from './MyLayout.vue'
import MathTutorial from './MathTutorial.vue'
import './roadmap.css'

export default {
  Layout: MyLayout,
  enhanceApp({ app }) {
    app.component('MathTutorial', MathTutorial)
  }
}
