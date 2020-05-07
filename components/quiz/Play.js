import React, { Component, Fragment, useState } from 'react';
import {Helmet} from 'react-helmet';
import { isCompositeComponentWithType } from 'react-dom/test-utils';
import M from 'materialize-css';

import isEmpty from '../../utils/is-empty';




class Play extends Component{  

    constructor(props){
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
            itemCounter: 0,
            userAnswer: null,
            currentQuestion: 0,
            options: [],
            score: 0,
            max_questions: 10,
            quizEnd: false,
            correctAnswer: 0,
            wrongAnswer: 0,
            numberOfAnsweredQuestions: 0,
            fiftyFifty:1,
            usedFiftyFifty: false,
        };
        this.interval = null ;
    }

    componentDidMount(){
 
        fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")
        .then(res => {
            return res.json();
        })
        .then(json=>{
            console.log(json.results);

            this.setState({
                isLoaded: true,
                items: json.results,
                itemCounter: 0,
                max_questions: 10,             
            })           
        });
    }
    
    nextQuestionHandler = () => {
        this.setState({
            itemCounter: this.state.itemCounter +1,
            userAnswer: null,
        })
        console.log(this.state.itemCounter)
    }

    previousQuestionHandler = () => {
        this.setState({
            itemCounter: this.state.itemCounter -1,
            userAnswer: null,
        })
        console.log(this.state.itemCounter)
    }

    componentDidUpdate(prevProps, prevState){
        const {itemCounter} = this.state;
        if(this.state.itemCounter !== prevState.itemCounter){
            this.setState(() =>{

            })
        }
    }

    handleOptionClick = (e) => {
        if(e.target.innerHTML == this.state.items[this.state.itemCounter].correct_answer){
            this.correctAnswer();
        }
        else{
            this.wrongAnswer();
        }
    }
    correctAnswer = () => {
        M.toast({
            html:'Correct Answer!',
            classes: 'toast-valid',
            displayLength: 1500
        });
        this.setState(prevState =>({
            score: prevState.score + 1,
            correctAnswers: prevState.correctAnswers + 1,
            numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1

        }));
    }
    wrongAnswer = () => {
        navigator.vibrate(1000);
        M.toast({
            html:'Wrong Answer!',
            classes: 'toast-invalid',
            displayLength: 1500
        });
        this.setState(prevState =>({
            wrongAnswers: prevState.wrongAnswers +1,
            numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
        }));
    }

    endGame = () => {
        alert('Quiz has ended!');
        const{state} = this;
        const playerStas = {
            score: state.score,
            max_questions: state.max_questions,
            numberOfAnsweredQuestions: state.numberOfAnsweredQuestions,
            correctAnswers: state.correctAnswers,

        };
        console.log(playerStas);
    }
 

    render(){

        var {isLoaded, items} = this.state;

        //console.log(this.state.items[0]);
        if(!isLoaded){
            return <div>Loading...</div>;
        }
        else{
        return(
           
            <Fragment>
            <Helmet><title>Quiz Page</title></Helmet>
            <div className="questions">
                <h2>Quick Quiz</h2>
                <div className="lifeline-container">
                    <p>
                        <span className="mdi mdi-set-center mdi-24px lifeline-icon"></span><span className="lifeline">1</span>
                    </p>
                </div>
                <div>
                    <p>
                        <span className="left">{this.state.itemCounter+1} of {this.state.max_questions} </span>
                        
                    </p>
                </div>
                <h5 className="question"> {this.state.items[this.state.itemCounter].question} </h5>

                <div className="options-container">
                    <p onClick={this.handleOptionClick}  className="option" data-number="1" >{this.state.items[this.state.itemCounter].correct_answer}</p>
                    <p onClick={this.handleOptionClick}  className="option" data-number="2" >{this.state.items[this.state.itemCounter].incorrect_answers[0]}</p>
                </div>
                <div className="options-container">
                    <p onClick={this.handleOptionClick}  className="option" data-number="3" >{this.state.items[this.state.itemCounter].incorrect_answers[1]}</p>
                    <p onClick={this.handleOptionClick}  className="option" data-number="4">{this.state.items[this.state.itemCounter].incorrect_answers[2]}</p>
                </div>
                
                <div className="button-container">
                    <button onClick={this.previousQuestionHandler}>Previous</button>
                    <button onClick={this.nextQuestionHandler}>Next</button>
                    <button onClick={this.endGame}>Quit</button>
                </div>
            </div>
        </Fragment>
        );
        }
    }
}

export default Play;