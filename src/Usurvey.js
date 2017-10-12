import React,{Component} from 'react';
var firebase = require('firebase');
var uuid = require('uuid');

var config = {
   apiKey: "AIzaSyBj7tq9v2BWVLI10YbAWH5kOwOPbbibsJw",
   authDomain: "u-survey-85abd.firebaseapp.com",
   databaseURL: "https://u-survey-85abd.firebaseio.com",
   projectId: "u-survey-85abd",
   storageBucket: "u-survey-85abd.appspot.com",
   messagingSenderId: "966344010611"
 };
 firebase.initializeApp(config);

export default class Usurvey extends Component {

  constructor(props){
    super(props);

    this.state = {
      uid:uuid.v1(),
      name:'',
      ans: {
        ans1:'',
        ans2:'',
        ans3:'',
      },
      isSubmit:false
    };
    this.nameSubmit = this.nameSubmit.bind(this);
    this.ansSelected =  this.ansSelected.bind(this);
    this.qSubmit =this.qSubmit.bind(this);
  }
  nameSubmit(event) {
    var name = this.refs.name.value;
    this.setState({name:name}, function() {
      console.log(this.state);
        console.log("asdasd");
    })

  }

  ansSelected(event) {

    var answers = this.state.ans;
    if(event.target.name==="ans1") {
      answers.ans1 = event.target.value;

    }else if(event.target.name==="ans2") {
        answers.ans2 = event.target.value;
    }else {
      answers.ans3 = event.target.value;
    }

    this.setState({ans:answers},function(){
      console.log(this.state);
    });
  }
  qSubmit(event) {
        firebase.database().ref('usurvey/'+this.state.uid).set({
          studentName:this.state.name,
          answers:this.state.ans
        });

        this.setState({isSubmit:true});
  }

    render() {

      var name;
      var qus;

      if(this.state.name ==='' && this.state.isSubmit===false) {
        name= <div>
        <h1>Enter Name</h1>
        <form onSubmit={this.nameSubmit}>
        <input className="namy" type="text" placeholder="Enter Name" ref="name" />
        </form>
        </div>;
        qus=' ';
      } else if(this.state.name!== '' && this.state.isSubmit===false) {
        name = <h1>welcome {this.state.name}</h1>
        qus = <div>
        <h2>Here are ques</h2>
        <form onSubmit={this.qSubmit}>
        <div className="card">
        <label>Fav couse</label>
        <input type="radio" name="ans1" value="tech" onChange={this.ansSelected}/>tech
        <input type="radio" name="ans1" value="des" onChange={this.ansSelected}/>des
        <input type="radio" name="ans1" value="market" onChange={this.ansSelected}/>market
        </div>
        <div className="card">
        <label>who are you</label>
        <input type="radio" name="ans2" value="stu" onChange={this.ansSelected}/>stu
        <input type="radio" name="ans2" value="job" onChange={this.ansSelected}/>job
        <input type="radio" name="ans2" value="looking" onChange={this.ansSelected}/>looking
        </div>
        <div className="card">
        <label>is Helpful</label>
        <input type="radio" name="ans3" value="yes" onChange={this.ansSelected}/>yes
        <input type="radio" name="ans3" value="no" onChange={this.ansSelected}/>no
        <input type="radio" name="ans3" value="maybe" onChange={this.ansSelected}/>maybe
        </div>
        <input type="submit" value="submit" className="feedback-button"/>
         </form>
        </div>;

      } else if(this.state.isSubmit===true){
          name = <h1>Thanks , {this.state.name}</h1>
      }
        return (
            <div className="class-name">
              {name}
              -------------------
              {qus}
            </div>
        );
    }
}
