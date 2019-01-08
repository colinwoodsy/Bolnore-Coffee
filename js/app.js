var app = new Vue({
  el: '#app',
  data: {
  	showThankYou: false,
  	showButtons: false,
  	showTextInput: false,
  	textAnswer: '',
  	appearAfter0ms: false,
  	appearAfter300ms: false,
  	appearAfter800ms: false,
  	transitionNextQuestion: true,
  	transitionOut: false,
  	answers: {},
  	questionChanged: true,
  	questionIndex: 0,
    questions: [
			'Do you want a Coffee Shop in Bolnore Village?',
			'Would you prefer a small independent coffee business or a large multinational like Starbucks?',
			'Would you consider purchasing coffee from a mobile coffee shop i.e. coffee being served out of a van?',
			'Are you a resident in Bolnore Village?',
			'Any other thoughts?'
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
  		// this.transitionNextQuestion = true;
  	}
  },
  methods: {
  	answerQuestion (answer = 1) { 		
  		this.answers[this.questionIndex] = answer
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
  		tmpQuestionIndex = this.questionIndex + answer
  		this.questionIndex  = -1
  		setTimeout(() => this.questionIndex = tmpQuestionIndex, 800)
  		setTimeout(() => this.showButtons = true, 1200)
  	}
  },
  mounted () {
  	this.appearAfter0ms = true
  	setTimeout(() => this.showButtons = true, 300)
  	setTimeout(() => this.appearAfter300ms = true, 200)
  	setTimeout(() => this.appearAfter800ms = true, 600)
  }
})
