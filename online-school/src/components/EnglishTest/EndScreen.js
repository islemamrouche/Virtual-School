import React, {useState} from "react";
import "./EnglishTest.css";
import { useContext } from "react";
import { GameStateContext } from "../helpers/Contexts";

import { useTranslation} from "react-i18next";
import i18n from "i18next";

const EndScreen = () => {
  const { t } = useTranslation();

  const { score, setScore, setGameState, userName, test } = useContext(
    GameStateContext
  );

  // const [level, setLevel]=useState()

  const restartQuiz = () => {
    setScore(0);
    setGameState("menu");
  };

  const results = (score*100)/test.length
  var level=""
  if (results<30){
    level="A1"
  } else if (results >=30 && results < 50) {
    level="A2"
  }else if(results >=50 && results < 80){
    level="B1"
  } else{
    level="B2"
  }

  return (
    <div className="Quiz-EndScreen">
      <h2 className="text-uppercase text-white">{t('test_finished')}</h2>
      <h3>{t('taken_by')} {userName}</h3>
      <h3>{t('your_score_is')} {results.toFixed(2)}%</h3>
      <h3>{t('your_level_is')} {level}</h3>
      <button onClick={restartQuiz}>{t('restart_test')}</button>
    </div>
  );
};

export default EndScreen;