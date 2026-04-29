interface Props {
  score: number
  onPlayAgain: () => void
}

export default function FinalPage({ score, onPlayAgain }: Props) {
  return (
    <div className="page final-page">
      <h1 className="title">Game Over</h1>

      <div className="score-display">
        <span className="score-number">{score}</span>
        <span className="score-unit">digit{score !== 1 ? 's' : ''}</span>
      </div>

      <button className="btn btn-primary btn-large" onClick={onPlayAgain}>
        PLAY AGAIN
      </button>
    </div>
  )
}
