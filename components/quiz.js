import * as React from 'react';
import { StyleSheet, Text, View,Image,Button,TouchableHighlight,ActivityIndicator } from 'react-native';
//import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import ResultScreen from './resultScreen';

export default class NewQuiz extends React.Component {
	constructor(props) {
		super(props);	this.state = {
			next: 0,
			marks: 0,
			numberOfQuestions: null,
			time: {
				minutes: 0,
				seconds: 0,
			},
			result: false,
			finalResult: null,
			data: [],
			value3Index: 0,
      value: null,
      showMe:true

		}

		this.clickNext = this.clickNext.bind(this);
		this.playAgain = this.playAgain.bind(this);
	}

shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

componentDidMount() {
 var arrayofdata = [
    {
      id:1,
      question:"https://i.ibb.co/7NHbgCS/165355-single-male-elephant-in-the-masai-mara.jpg",
      answer:"Elephant",
      options:[
          "Elephant",
          "Deer",
          "Lion"
      ]
    },
    {
      id:2,
      question:"https://i.ibb.co/pKjf9qS/gettyimages-168504892-1568303467.png",
      answer:"Deer",
      options:[
       "Tiger",
        "Deer",
       "Lion"
      ]
    },
    {
      id:3,
      question:"https://i.ibb.co/TLwxJrL/tiger-medium.jpg",
      answer:"Tiger",
      options:[
           "Tiger",
           "Elephant",
           "Bear",
      ]
    },
    {
      id:4,
      question:"https://i.ibb.co/ZG3WspZ/5a298475d7439-image.jpg",
      answer:"Horse",
      options:[
      "Elephant",
       "Zebra",
      "Horse"
      ]
    },
    {
      id:5,
      question:"https://i.ibb.co/BC57jCn/images-q-tbn-ANd9-Gc-RFBgj-pw6-U1-AVci-P7j-DU9a-KZV6u-Ro-Esl6czw-usqp-CAU.jpg",
      answer:"Zebra",
      options:[
        "Lion",
        "Zebra",
       "Horse"
      ]
    },
    {
      id:6,
      question:"https://i.ibb.co/WFHsTmz/Getty-Images-691120979-1440x1079.jpg",
      answer:"Lion",
      options:[
          "Elephant",
         "Tiger",
          "Lion"
      ]
    },
    {
      id:7,
      question:"https://i.ibb.co/sFQTDgy/a50c90787e781e697be9903455232c47.png",
      answer:"Dog",
      options:[
        "Dog",
       "Deer",
      "Tiger",
       
      ]
    }
  ];
 
  setTimeout(()=>{
    this.setState({
      showMe:false
    })
  },3000)

	this.setState({
					data:this.shuffle(arrayofdata),
					numberOfQuestions: arrayofdata.length,
				})
		this.timer = setInterval(() => {
			this.increaseSecond();
		}, 1000);
	}
  	
increaseSecond = () => {
		let {
			time: { minutes, seconds },
		} = this.state;
		if (seconds < 59) {
			seconds += 1;
		} else {
			seconds = 0;
			minutes += 1;
		}
		this.setState({
			time: { minutes, seconds },
		});
	};
clickNext(obj) {
		const { next, value, marks, numberOfQuestions,data } = this.state;

		if (obj === data[next].answer) {
			this.setState({
				marks: marks + 1,
			})
        }
     
		this.setState({
			next: next + 1,
		})
		if (next === (numberOfQuestions - 1)) {
			clearInterval(this.timer);
		}

	}	
playAgain() {
		// const { time } = this.state;
		this.setState({
			next: 0,
			time: {
				minutes: 0,
				seconds: 0,
			},
			marks: 0,
		})
		this.timer = setInterval(() => {
			this.increaseSecond();
		}, 1000);
	}

render() {
		const { result, data, next, value, marks, numberOfQuestions, time: { minutes, seconds } } = this.state;
	//const { goHome } = this.props;
    // console.log("Hello", next)
    // let {options} = this.data[next].options;
    // if (next >= 0 && next < data.length){
    //   options = this.shuffle(options);
    // }
    // else{
    //   return (<View></View>);
    // }
    // console.log(next, options)

		return (									
			<View style={{ flex: 1,backgroundColor:"black" }}>
				{
					next === numberOfQuestions
						?
						<View style={{ flex: 1 }}>
							<ResultScreen 
								playAgain={this.playAgain}
								//goHome={goHome}	
								marks={marks}
								minutes={minutes}
								seconds={seconds}
							/>
						</View>
						:
						<View style={{ flex: 1 }}>
						{ data.length > 0 &&
							<View style={{ flex: 1 }}>
							<View style={styles.container}>
                                <Text style={styles.heading}>Welcome to Quiz Game!!!</Text>
                                    <Text 
                                    style={styles.time}>
                                        {`Time : ${minutes} min ${seconds} sec \n`}
                                    </Text>
                                    
                                    <Text style={styles.questionHeading}>
                                        Guess the Animal {`${next + 1}`}
                                    </Text>
                                    <View>{
                                            this.state.showMe ? <ActivityIndicator size="large"/>
                                            : 
                                            <Image style={styles.image} source={{uri:`${data[next].question}`}}/>
                                          }         
                                    </View>
                                    <View style={styles.button}>
                                    {data[next].options.map(obj=>
                                        <View style={{margin:10,width:90}}>
                                            <Button title={obj} onPress={()=>{ this.clickNext(obj) } }  key={data[next].id}/>
                                        </View>
                                    )} 
                                        {/* <RadioForm
                                            radio_props={[
                                                { label: data[next].incorrect_answers[0], value: 0, disabled: true },
                                                { label: data[next].correct_answer, value: 1 },
                                                { label: data[next].incorrect_answers[1], value: 2 },
                                                { label: data[next].incorrect_answers[2], value: 3 },
                                            ]
                                            }
                                                initial={-1}
                                                buttonColor={'#03A9F4'}
                                                selectedButtonColor={'#03A9F4'}
                                                buttonSize={20}
                                                onPress={(value) => { 
                                                this.setState({ value: value }) 
                                                
                                            }}
                                        /> */}
                                    </View>
							    </View>
								{/* <View style={styles.nextbutton}>
									<Button
										onPress={this.clickNext}
										title="Next"
										backgroundColor="pink"							
									/>
							    </View> */}
							</View>
						}
						</View>
				}
			</View>							
		);
	}
}  
const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems: 'center',
    top:90,
},
time:{
    alignSelf: 'center',
    marginTop:10,
    color:"white"
},
  image:{
    width:330,
    height:160,
    marginTop:20,
    borderRadius:30
  },
  questionHeading:{
    marginTop:50,
    fontSize:25,
    color:"white"
  },
  heading:{
    fontSize:25,
    color:"white"

  },
  button:{
    flexDirection: 'row',
    margin:50
  },
  nextbutton:{
    flex:0.2,
     fontWeight: 'bold',
      marginLeft: 'auto',
       marginRight: 'auto', 
       marginTop: 20,
  }
});
