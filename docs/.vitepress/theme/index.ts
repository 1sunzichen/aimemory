import MyLayout from './MyLayout.vue'
import MathTutorial from './MathTutorial.vue'
import AiQuiz from './AiQuiz.vue'
import WrongQuiz from './WrongQuiz.vue'
import MiniQuiz from './MiniQuiz.vue'
import './roadmap.css'

export default {
  Layout: MyLayout,
  enhanceApp({ app }) {
    app.component('MathTutorial', MathTutorial)
    app.component('AiQuiz', AiQuiz)
    app.component('WrongQuiz', WrongQuiz)
    app.component('MiniQuiz', MiniQuiz)
  }
}
