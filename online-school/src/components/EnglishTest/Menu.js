import "./EnglishTest.css";
import { useState, useContext } from "react";
import { GameStateContext } from "../helpers/Contexts";
import { getCookie } from "../Helpers/Cookie";

import { useTranslation} from "react-i18next";
import i18n from "i18next";

function Menu() {
  const { t } = useTranslation();
  const { gameState, setGameState, userName, setUserName, userTests, setUserTests } = useContext(
    GameStateContext
  );

  const handleChange = (e) =>{
    setUserName(e.target.value);
	}

	const handleSubmit = (e)=>{
		e.preventDefault();
    setGameState("playing");
		const csrftoken = getCookie('csrftoken');
			fetch('http://localhost:8000/api/register_email/',
			{
			method:'POST',
			mode:'cors',
			headers: new Headers({'x-csrftoken':csrftoken,'content-type': 'application/json'}),
			body:JSON.stringify(userName),
			})
			.then(res=> res.json())
			.then(data => setUserTests(data))
}

  return (
    <div className="Quiz-Menu">
      <label className="text-uppercase">{t('enter_your_email')}:</label>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder={` ${t('your_email')}...`}
          onChange={handleChange}
          required
        />
        <button
        className="text-uppercase"
          type="submit"
        >
        {t('start_test')}
        </button>
      </form>
    </div>
  );
}

export default Menu;