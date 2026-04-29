import { GameMode, Scores } from '../types'

interface Props {
  scores: Scores
  onPlayAgain: () => void
}

const MODE_LABELS: Record<GameMode, string> = {
  'digits':               'Digits',
  'simple-letters':       'Simple Letters',
  'complex-letters':      'Complex Letters',
  'similar-pronunciation': 'Letters with Similar Pronunciation',
}

const ALL_MODES: GameMode[] = [
  'digits',
  'simple-letters',
  'complex-letters',
  'similar-pronunciation',
]

export default function ScoreboardPage({ scores, onPlayAgain }: Props) {
  return (
    <div className="page scoreboard-page">
      <h1 className="title">Scoreboard</h1>

      <div className="scoreboard-table">
        <div className="scoreboard-header">
          <span>Mode</span>
          <span>Best Score</span>
        </div>
        {ALL_MODES.map(mode => (
          <div key={mode} className="scoreboard-row">
            <span className="scoreboard-mode">{MODE_LABELS[mode]}</span>
            <span className={`scoreboard-score ${scores[mode] === null ? 'na' : ''}`}>
              {scores[mode] === null ? 'N/A' : `${scores[mode]}`}
            </span>
          </div>
        ))}
      </div>

      <button className="btn btn-primary btn-large" onClick={onPlayAgain}>
        PLAY AGAIN
      </button>
    </div>
  )
}
