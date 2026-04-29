import { useEffect, useRef } from 'react'

interface Props {
  level: number
  correctString: string
  userAnswer: string
  isCorrect: boolean
  onNext: () => void
  onGameOver: () => void
}

function ColoredAnswer({ correct, answer }: { correct: string; answer: string }) {
  return (
    <span className="answer-value digit-display-sm">
      {answer.split('').map((ch, i) => (
        <span key={i} style={{ color: ch === correct[i] ? 'var(--correct)' : 'var(--wrong)' }}>
          {ch}
        </span>
      ))}
      {/* show remaining correct digits as red if answer is shorter */}
      {answer.length < correct.length &&
        correct.slice(answer.length).split('').map((_, i) => (
          <span key={`missing-${i}`} style={{ color: 'var(--wrong)' }}>_</span>
        ))}
    </span>
  )
}

export default function ResultPage({
  level: _level,
  correctString,
  userAnswer,
  isCorrect,
  onNext,
  onGameOver,
}: Props) {
  const divRef = useRef<HTMLDivElement>(null)

  useEffect(() => { divRef.current?.focus() }, [])

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') isCorrect ? onNext() : onGameOver()
  }

  return (
    <div ref={divRef} className="page result-page" onKeyDown={handleKeyDown} tabIndex={-1}>
      <h2 className={`result-heading ${isCorrect ? 'correct' : 'wrong'}`}>
        {isCorrect ? 'Correct!' : 'Wrong!'}
      </h2>

      <div className="answer-comparison">
        <div className="answer-row">
          <span className="answer-label">Correct:</span>
          <span className="answer-value digit-display-sm">{correctString}</span>
        </div>
        <div className="answer-row">
          <span className="answer-label">Your answer:</span>
          {isCorrect ? (
            <span className="answer-value digit-display-sm correct">{userAnswer}</span>
          ) : (
            <ColoredAnswer correct={correctString} answer={userAnswer || ''} />
          )}
        </div>
      </div>

      {isCorrect ? (
        <div className="result-actions">
          <button className="btn btn-primary btn-large" onClick={onNext}>
            NEXT LEVEL
          </button>
        </div>
      ) : (
        <div className="result-actions">
          <button className="btn btn-danger btn-large" onClick={onGameOver}>
            SEE SCORE
          </button>
        </div>
      )}
    </div>
  )
}
