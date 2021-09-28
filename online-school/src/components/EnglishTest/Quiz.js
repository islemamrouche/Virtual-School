import "./EnglishTest.css";
import { Test1, Test2, Test3 } from "../helpers/Questions";
import { useState } from "react";

import { useContext } from "react";
import { GameStateContext } from "../helpers/Contexts";
import { getCookie } from "../Helpers/Cookie";

import { useTranslation} from "react-i18next";
import i18n from "i18next";

function Quiz() {
  const { t } = useTranslation();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [optionChosen, setOptionChosen] = useState("");

  const {userName, score, setScore, gameState, setGameState, userTests, setUserTests, test, noTest } = useContext(
    GameStateContext
  );

  const chooseOption = (option) => {
    setOptionChosen(option);
  };

  const nextQuestion = () => {
    let answers=test[currentQuestion].answer;
    answers.forEach((anr)=>{
      if (anr==optionChosen){
        setScore(score + 1);
      }
    })
    setCurrentQuestion(currentQuestion + 1);
    setOptionChosen("")
  };

  const finishQuiz = () => {
    if (test){
      if (test == Test1){
        var passedTest="test1"
      }
      else if (test == Test2){
        var passedTest="test2"
      }
      else {
        var passedTest="test3"
      }
      const csrftoken = getCookie('csrftoken');
      fetch('http://localhost:8000/api/passed_test/',
      {
      method:'POST',
      mode:'cors',
      headers: new Headers({
        'x-csrftoken':csrftoken,
        'content-type': 'application/json',
        'Accept': 'application/json'
      }),
      body:JSON.stringify({passedTest: passedTest, userName: userName})
      })
        .then(res=>res.json())
        .then(data=>console.log(data))  
  }
  else {
    console.log('Test Undefined')
  } 
    
    let answers=test[currentQuestion].answer;
    answers.forEach((anr)=>{
      if (anr==optionChosen){
        setScore(score + 1);
      }
    })
    setGameState("finished");
    setOptionChosen("")
  };
  return (
    <>
    {test?(
        <div className="Quiz-Quiz">
        <p>{currentQuestion+1} / {test.length}</p>
        <h3 className="mx-4" dir="ltr" style={{textAlign:'left'}}>{test[currentQuestion].prompt}</h3>
        <div className="">
          <button
            onClick={() => {
              chooseOption("optionA");
            }}
          >
            {test[currentQuestion].optionA}
          </button>
          <button
            onClick={() => {
              chooseOption("optionB");
            }}
          >
            {test[currentQuestion].optionB}
          </button>
          <button
            onClick={() => {
              chooseOption("optionC");
            }}
          >
            {test[currentQuestion].optionC}
          </button>
          <button
            onClick={() => {
              chooseOption("optionD");
            }}
          >
            {test[currentQuestion].optionD}
          </button>
        </div>
  
        {currentQuestion == test.length - 1 ? (
          <button className="text-uppercase" onClick={finishQuiz} id="nextQuestion">
            {t('finish_quiz')}
          </button>
        ) : (
          <button className="text-uppercase" onClick={nextQuestion} id="nextQuestion">
            {t('next_question')}
          </button>
        )}
      </div>
    ): (<h1 className="text-danger">{userName}&nbsp;{

         noTest ==='0'? t('consumed_all_tests'):t('loading')  
     }
   </h1>
   )}
  </>
  );
}

export default Quiz;