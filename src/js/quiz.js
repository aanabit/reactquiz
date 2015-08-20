/**
 * Created by Fabio on 18/08/15.
 */
'use strict';

var MulipleAnswer = React.createClass({
  getInitialState: function () {
    return {
      numberOfAnswers: 1,
      answers: [],
      addNew: true
    }
  },
  addAnswer: function () {
       this.setState({
        numberOfAnswers: this.state.numberOfAnswers + 1,
        addNew:true
      });
  },
  removeAnswer: function() {
      this.setState({
        numberOfAnswers: this.state.numberOfAnswers - 1,
        addNew:false
      });
  },
  render: function() {
    var answers = this.state.answers,
        addremovebuttons,
        numberOfAnswers = this.state.numberOfAnswers,
        addNew = this.state.addNew;

    if(numberOfAnswers > 0 ) {
        addremovebuttons = ( <div><button onClick={this.addAnswer} className="btn btn-primary">Add Answer</button>
                          <button onClick={this.removeAnswer} className="btn btn-warning">Remove Answer</button></div>);
    }else {
      addremovebuttons = (<div>No Answers added<br /> <button onClick={this.addAnswer} className="btn btn-primary">Add Answer</button></div>);
    }
    
          
    if(addNew) {
       answers.push(
                <div className="checkbox">
                <label> 
                    <input type="checkbox" name="multipleanswers_check" value="0"/>
                    <input type="text" size="50" />
                </label>
                </div>);
     }else {
       answers.pop();
     }
   

    return (<div>{answers}
            {addremovebuttons}</div>)
  }
});

var FillTheGap = React.createClass({
  getInitialState: function () {
    return {
      numberOfAnswers: 1,
      answers: [],
      addNew: true,
      value: "Insert the anser",
      value_array: [],
      noAddOrRemove: false
    }
  },
  addAnswer: function () {
       this.setState({
        numberOfAnswers: this.state.numberOfAnswers + 1,
        addNew:true,
        noAddOrRemove: false
      });
  },
  removeAnswer: function() {
      this.setState({
        numberOfAnswers: this.state.numberOfAnswers - 1,
        addNew:false,
        noAddOrRemove: false
      });
  },
  splitText: function() {
    var value = this.state.value;
    var value_array = value.split(" ");
    var answers = this.state.answers;
    var index = answers.indexOf(value);
    var text = [], i;

    for(i = 0; i<value_array.length; i++) {
      text.push(<button onClick={this.swapValue.bind(this,i)} className="btn btn-default btn-sm">{value_array[i]}</button>);
    }

    answers.pop()
    answers.push(<li className="answer_item">{text}</li>);
    
    this.setState({
        answers: answers,
        value_array: value_array
        })
  },
  swapValue: function(i) {
    var value = this.state.value_array[i],
        value_array = this.state.value_array,
        index = value_array.indexOf(value),
        answers = this.state.answers,
        text = [], i;

        console.log(value_array[index]);

        value_array[index] = "....";

         for(i = 0; i<value_array.length; i++) {
           if (i == index) {
             text.push(<button className="btn btn-success btn-sm">{value_array[i]}</button>);
           }else {
             text.push(<button className="btn btn-default btn-sm">{value_array[i]}</button>);
           }
          
        }

        answers.pop()
        answers.push(<li className="answer_item">{text}</li>);
    
        this.setState({
          answers: answers,
          value_array: value_array
        })

  },
  handleChange: function(evt) {
    this.setState({
      value: evt.target.value,
      noAddOrRemove: true
    });
  },
  render: function() { 
    var answers = this.state.answers,
        addremovebuttons,
        numberOfAnswers = this.state.numberOfAnswers,
        noAddOrRemove = this.state.noAddOrRemove,
        addNew = this.state.addNew;

    if(numberOfAnswers > 0 ) {
        addremovebuttons = ( <div><button onClick={this.addAnswer} className="btn btn-primary btn-sm">Add Answer</button>
                          <button onClick={this.removeAnswer} className="btn btn-warning btn-sm">Remove Answer</button></div>);
    }else {
      addremovebuttons = (<div>No Answers added<button onClick={this.addAnswer} className="btn btn-primary btn-sm">Add Answer</button></div>);
    }
    
    if(noAddOrRemove == false) {
          if(addNew) {
       answers.push(<li className="answer_item"> 
                    <input size="50" id="answer{this.state.numberOfAnswers}" onChange={this.handleChange} /><button onClick={this.splitText} className="btn btn-info btn-xs">Complete</button>
                </li>);
     }else {
       answers.pop();
     }
    }

    return (<div>
            <ul>{answers}</ul>
            {addremovebuttons}
            </div>)
  }
});

var Question_Type = React.createClass({
    getInitialState:function(){
      return {
        selectValue:''
      };
  },
    handleChange:function(e){
    this.setState({selectValue:e.target.value});
  },
  render: function() {
    var answerslist=this.state.selectValue;
    var answerstype,button;

    switch(answerslist) {
      case 'yesno':
        answerstype = (
                    <div>
                      <div className="radio">
                      <label>
                          <input type="radio" name="yesno_radio" value="Yes"/>
                          Yes
                      </label>
                      </div>
                      <div className="radio">
                      <label>
                          <input type="radio" name="yesno_radio" value="No"/>
                          No
                      </label>
                      </div>
                    </div>); 
        break;
      case 'multipleanswer':
        answerstype = (<MulipleAnswer />);
        break;
      case "fillthegap":
        answerstype = (<FillTheGap />);
        break;
      default:
        answerstype = (<label>No type selected yet</label>);
    }

    return (
      <div>
      <select value={this.state.selectValue} onChange={this.handleChange} className="form-control">
        <option value="">Select an answer type</option>
        <option value="yesno">Yes/No</option>
        <option value="multipleanswer">Multiple Answer</option>
        <option value="fillthegap">Fill the gap</option>
      </select>
      <div className="answerList">{answerstype}</div>
      </div>        
    );
  }
});

var Question = React.createClass({
   render: function() {
       return (
       <div>
            <div>
           <h3>Question {this.props.numberOfQuestion}:</h3>
           <input type="text" size="50" />
           </div>
           <br />
           <div>
            <Question_Type />
           </div>
       </div>
       );
   }
});

var Quiz = React.createClass({
    getInitialState: function() {
        return {
          numberOfQuestion: 1,
          gotoQuestion: 1,
          rows: [],
          addNew: true,
        };
    },
    addQuestion: function () {
      this.setState({
        numberOfQuestion: this.state.numberOfQuestion + 1,
        gotoQuestion: this.state.numberOfQuestion + 1,
        addNew: true
      });
    },
    removeQuestion: function () {
      if(this.state.numberOfQuestion > 1) {
        this.setState({
        numberOfQuestion: this.state.numberOfQuestion - 1,
        gotoQuestion: this.state.gotoQuestion - 1,
        addNew: false
      });
      }
      if(this.state.numberOfQuestion == 1) {
       this.setState({
         gotoQuestion: 0,
        addNew: false
      });
      }
    },
    render: function() {
        var rows = this.state.rows;
        var noq = this.state.numberOfQuestion;
        var addNew = this.state.addNew;
        var gotoq = this.state.gotoQuestion;
        var addremovebuttons;

          addremovebuttons = ( <div className="text-right"><button onClick={this.addQuestion} className="btn btn-primary">Add Question</button>
                                <button onClick={this.removeQuestion} className="btn btn-warning">Remove Question</button></div>);
          

        if(addNew) {
           rows.push(<div className="question"><Question numberOfQuestion={noq} 
                            addQuestion={this.addQuestion}
                            removeQuestion={this.removeQuestion} />
                      </div>);  
         }else {
          if(noq >= 1 && gotoq > 0) {
            rows.pop();  
          }
          else {
            if(noq == 1) {
              alert("You can't have 0 questions");
            }
          }
            
         }
        
       
        return (
            <div className="well">
            {rows}
            {addremovebuttons}
        </div>
        );
    }
});



React.render(
<Quiz />,
    document.getElementById('content')
);