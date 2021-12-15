import React, { useState } from 'react'

const Button = ({ clickHandler, text }) => (
  <button onClick={clickHandler}>
    {text}
  </button>
)

const DisplayText = ({ text }) => (
  <p style={{ fontSize: '30px', fontWeight: '700' }}>{text}</p>
)

const DisplayStats = ({ stats }) => {
  if (sum(stats) === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <DisplayStat text='good' stat={stats[0]} />
      <DisplayStat text='neutral' stat={stats[1]} />
      <DisplayStat text='bad' stat={stats[2]} />
      <DisplayStat text='all' stat={sum(stats)} />
      <DisplayStat text='average' stat={average(stats)} />
      <DisplayStat text='positive' stat={positiveFeedback(stats)} />
    </div>

  )
}

const DisplayStat = ({ text, stat }) => <p>{text} {stat}</p>

const sum = (arr) => arr.reduce((acc, stat) => acc + stat, 0)

const average = (arr) => (arr[0] - arr[2]) / sum(arr)

const positiveFeedback = (arr) => `${arr[0] * 100 / sum(arr)} %`

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const stats = [good, neutral, bad]

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <DisplayText text='give feedback' />
      <Button clickHandler={handleGoodClick} text='good' />
      <Button clickHandler={handleNeutralClick} text='neutral' />
      <Button clickHandler={handleBadClick} text='bad' />
      <DisplayText text='statistics' />
      <DisplayStats stats={stats} />
    </div>
  )
}

export default App
