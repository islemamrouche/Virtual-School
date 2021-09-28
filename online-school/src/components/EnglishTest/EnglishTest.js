import "./EnglishTest.css";
import Menu from "./Menu";
import Quiz from "./Quiz";
import { Test1, Test2, Test3 } from "../helpers/Questions";
import EndScreen from "./EndScreen";
import React, {useEffect, useState } from "react";
import { GameStateContext } from "../helpers/Contexts";

import { useTranslation} from "react-i18next";
import i18n from "i18next";

function EnglishTest() {
  const { t } = useTranslation();

  const [gameState, setGameState] = useState("menu");
  const [userName, setUserName] = useState("");
  const [score, setScore] = useState(0);
  const [userTests, setUserTests]=useState();
  const [test, setTest]=useState();
  const [noTest, setNoTest]=useState('1');


  useEffect(() =>{
    if (userTests){
      if (userTests.test1==false){
        setTest(Test1)
      }
      else if (userTests.test1==true && userTests.test2==false) {
        setTest(Test2)
      }
      else if (userTests.test1==true && userTests.test2==true && userTests.test3 == false)  {
        setTest(Test3)
      }
      else {
        setNoTest('0')
      }
    }
  })

  return (
      <div className="Quiz-App">
        <h2 className="text-uppercase">{t('general_english_test')}</h2>
        <GameStateContext.Provider
          value={{
            gameState,
            setGameState,
            userName,
            setUserName,
            score,
            setScore,
            userTests,
            setUserTests,
            test,
            setTest,
            noTest,
            setNoTest
          }}
        >
          {gameState === "menu" && <Menu />}
          {gameState === "playing" && <Quiz />}
          {gameState === "finished" && <EndScreen />}
        </GameStateContext.Provider>
      </div>

  );
}

export default EnglishTest;