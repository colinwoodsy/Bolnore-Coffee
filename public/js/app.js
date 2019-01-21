var app = new Vue({
  el: '#app',
  data: {
    showThankYou: false,
    showButtons: false,
    showTextInput: false,
    textAnswer: '',
    answers: {},
    questionIndex: 0,
    questions: [
      { dbid: 'question1', text: 'Do you want a Coffee Shop in Bolnore Village?', answer: null },
      { dbid: 'question2', text: 'Would you prefer a small independent coffee business rather than a large multinational like Starbucks?', answer: null },
      { dbid: 'question3', text: 'Would you consider purchasing coffee from a mobile coffee shop i.e. coffee being served out of a van?', answer: null }, 
      { dbid: 'question4', text: 'Are you a resident in Bolnore Village?', answer: null }, 
      { dbid: 'question5', text: 'Any other thoughts?', answer: null }
    ]
  },
  computed: {
    currentQuestion () {
      if (this.questionIndex > -1 && this.questionIndex < this.questions.length) {
        return this.questions[this.questionIndex]
      }
      return '-'
    }
  },
  watch: {
    questionIndex () {
    }
  },
  methods: {
    answerQuestion (answer = 1) {     
      console.log("answerQuestion", answer, "this.questionIndex", this.questionIndex)
      if (this.questionIndex < 0) {
        console.log("less than zero")
        return
      }
      this.questions[this.questionIndex].answer = answer
      this.showButtons = false      
      this.showTextInput = false
      if (this.questionIndex >= this.questions.length-1) {
        this.questionIndex = this.questions.length
        setTimeout(() => this.showThankYou = true, 800)
        return
      }
      if (this.questionIndex === 3) {
        this.questionIndex  = -1        
        setTimeout(() => this.questionIndex = 4, 800)
        setTimeout(() => this.showTextInput = true, 1200)
        return
      }     
      tmpQuestionIndex = this.questionIndex + 1
      this.questionIndex  = -1
      setTimeout(() => this.questionIndex = tmpQuestionIndex, 800)
      setTimeout(() => this.showButtons = true, 1200)
    },
    submitAnswers () {
      this.questionIndex = this.questions.length
      this.showTextInput = false
      this.questions[4].answer = this.textAnswer
      axios.post('/api/answers', {
          answers: this.questions,
        })
        .then((response) => {
          console.log(response);
          setTimeout(() => this.showThankYou = true, 700)
        })
        .catch((error) => {
          console.log(error);
        });     
    }
  },
  mounted () {
    setTimeout(() => this.showButtons = true, 300)
  }
})
