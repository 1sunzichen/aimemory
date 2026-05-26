import MyLayout from './MyLayout.vue'
import MathTutorial from './MathTutorial.vue'
import AiQuiz from './AiQuiz.vue'
import './roadmap.css'

export default {
  Layout: MyLayout,
  enhanceApp({ app }) {
    app.component('MathTutorial', MathTutorial)
    app.component('AiQuiz', AiQuiz)
  }
}
