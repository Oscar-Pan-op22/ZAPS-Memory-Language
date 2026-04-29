import { useState, useEffect, useRef } from 'react'

interface Props {
  level: number
  digitString: string
  memTime: number
  onSubmit: (answer: string) => void
}

type Phase = 'memorize' | 'input'

export default function GamePage({ level, digitString, memTime, onSubmit }: Props) {
  const [phase, setPhase] = useState<Phase>('memorize')
  const [answer, setAnswer] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // Reset when a new round starts
  useEffect(() => {
    setPhase('memorize')
    setAnswer('')
  }, [digitString])

  // Transition from memorize → input after memTime seconds
  useEffect(() => {
    if (phase !== 'memorize') return
    const id = setTimeout(() => setPhase('input'), memTime * 1000)
    return () => clearTimeout(id)
  }, [phase, memTime])

  // Focus input when input phase starts
  useEffect(() => {
    if (phase === 'input') {
      inputRef.current?.focus()
    }
  }, [phase])

  function handleSubmit() {
    if (answer.length === 0) return
    onSubmit(answer)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div className="page game-page">
      <div className="level-badge">Level {level}</div>

      {phase === 'memorize' ? (
        <div className="memorize-container">
          <p className="instruction-text">Memorize this sequence:</p>
          <div className="digit-display">{digitString}</div>
          <div className="timer-bar-wrapper">
            <div
              className="timer-bar"
              style={{ animationDuration: `${memTime}s` }}
            />
          </div>
        </div>
      ) : (
        <div className="input-container">
          <p className="instruction-text">What was the sequence?</p>
          <input
            ref={inputRef}
            className="digit-input"
            type="text"
            inputMode="numeric"
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type string here"
            maxLength={level + 5}
          />
          <button
            className="btn btn-primary btn-large"
            onClick={handleSubmit}
            disabled={answer.length === 0}
          >
            SUBMIT
          </button>
        </div>
      )}
    </div>
  )
}
