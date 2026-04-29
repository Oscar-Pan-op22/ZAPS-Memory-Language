import { useState } from 'react'
import { GameState, GameMode, Scores } from './types'
import { generateString, memTime } from './utils'
import LandingPage from './pages/LandingPage'
import GamePage from './pages/GamePage'
import ResultPage from './pages/ResultPage'
import ScoreboardPage from './pages/ScoreboardPage'

const emptyScores: Scores = {
  'digits': null,
  'simple-letters': null,
  'complex-letters': null,
  'similar-pronunciation': null,
}

const initialState: GameState = {
  page: 'landing',
  mode: 'digits',
  level: 1,
  currentString: '',
  userAnswer: '',
  scores: emptyScores,
}

export default function App() {
  const [state, setState] = useState<GameState>(initialState)

  function handleStart(mode: GameMode) {
    setState(s => ({
      ...initialState,
      scores: s.scores,       // preserve scores across sessions
      page: 'game',
      mode,
      level: 1,
      currentString: generateString(1, mode),
    }))
  }

  function handlePlayAgain() {
    setState(s => ({ ...initialState, scores: s.scores, page: 'landing' }))
  }

  function handleSubmit(answer: string) {
    setState(s => ({ ...s, page: 'result', userAnswer: answer }))
  }

  function handleNext() {
    const nextLevel = state.level + 1
    setState(s => ({
      ...s,
      page: 'game',
      level: nextLevel,
      currentString: generateString(nextLevel, s.mode),
      userAnswer: '',
    }))
  }

  function handleGameOver() {
    const finalScore = state.level - 1
    setState(s => ({
      ...s,
      page: 'scoreboard',
      scores: {
        ...s.scores,
        [s.mode]: s.scores[s.mode] === null
          ? finalScore
          : Math.max(s.scores[s.mode]!, finalScore),
      },
    }))
  }

  const isCorrect = state.userAnswer === state.currentString

  switch (state.page) {
    case 'landing':
      return <LandingPage onStart={handleStart} />
    case 'game':
      return (
        <GamePage
          level={state.level}
          digitString={state.currentString}
          memTime={memTime(state.level)}
          onSubmit={handleSubmit}
        />
      )
    case 'result':
      return (
        <ResultPage
          level={state.level}
          correctString={state.currentString}
          userAnswer={state.userAnswer}
          isCorrect={isCorrect}
          onNext={handleNext}
          onGameOver={handleGameOver}
        />
      )
    case 'scoreboard':
      return (
        <ScoreboardPage
          scores={state.scores}
          onPlayAgain={handlePlayAgain}
        />
      )
  }
}
