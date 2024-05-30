import React, { useState } from 'react';
import './App.css';
import { data } from './data.js'

const App = () => {

  // define state attributes for the quizz app
  let [index, setIndex] = useState(0)
  let [question, setQuestion] = useState(data[0].question)
  let [choices, setChoices] = useState(data[0].options)
  let [answer, setAnswer] = useState(data[0].answer)
  let [sources, setSources] = useState(data[0].source)
  let [score, setScore] = useState(0)
  let [selection, setSelection] = useState('')
  let [result, setResult] = useState(false)
  let [lock, setLock] = useState(true)


  // determins logic upon clicking the 'next' button
  const next = () => {
    // if the 'next' button is locked
    if (lock === false) {
      // update the running score of the quiz
      if (selection === answer) {
        setScore(prev => prev + 1)
      }
      // if we are at the of the questions object, set the results flag to true.
      if (index === data.length - 1) {
        setResult(true)
      }
      // update the state attributes with data for the next question
      else {
        setIndex(++index)
        setQuestion(data[index].question)
        setLock(true)
        setChoices(data[index].options)
        setAnswer(data[index].answer)
        setSources(data[index].source)
      }
    }
  }

  // updates the selected answer and unlocks the next button
  const select = (e, ans) => {
    e.target.classList.add("selected")
    setSelection(ans.option)
    setLock(false)
  }

  // resets the quiz application
  const reset = () => {
    setIndex(0)
    setQuestion(data[0].question)
    setChoices(data[0].options)
    setAnswer(data[0].answer)
    setSources(data[0].source)
    setSelection('')
    setScore(0)
    setLock(true)
    setResult(false)
  }

  return (
    <div className='container'>
      {/* terniary operator - if 'result' is set to true, it will output the test results. if set to false, it will dispaly the quiz */}
      {result ? <div>
        <h1 className='score'>You scored: {score} out of {data.length}</h1>
        <button onClick={reset}> Reset</button>
      </div> : <div>
        <h2>{question}</h2>
        <ul>
          {choices.map((option) => (
            <li key={option} onClick={(e) => {
              select(e, { option })
            }}>{option}</li >
          ))}
        </ul>
        <button onClick={next}> Next question</button>
        <div className='sources'>{sources.map((source) => {
          return <div key={source}><a href="{source}">{source}</a><br></br></div>
        })}</div>
      </div>}
    </div >
  );
}

export default App;
