import { useState } from 'react'
import './App.css'
import {IntRateCard} from "./components/IntRateCard.jsx";
import Chart from '../node_modules/chart.js/auto'
import {Bar, Line} from "react-chartjs-2"
import { CategoryScale } from 'chart.js/auto';
import {Calculator} from "./components/Calculator.jsx";
import ReactGA from 'react-ga-gtm';
ReactGA.initialize('UA-179516420-1');
ReactGA.pageview(window.location.pathname + window.location.search);

function App() {

    const [inputList, setInputList] = useState([]);
    const onAddBtnClick = event => {
        setInputList(inputList.concat(
            <Calculator key={inputList.indexOf(event.target.value)} />));
    };


  return (
    <>
        <div>
            <header>
                <h1>Mortgage Payment Calculator</h1>
            </header>
            <button onClick={onAddBtnClick}>Add input</button>
            <Calculator key={1}/>
            {inputList}
        </div>
    </>
  )
}

export default App
