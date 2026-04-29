import { GameMode } from '../types'

interface Props {
  onStart: (mode: GameMode) => void
}

const MODES: { mode: GameMode; label: string }[] = [
  { mode: 'digits',               label: 'Digits' },
  { mode: 'simple-letters',       label: 'Simple Letters' },
  { mode: 'complex-letters',      label: 'Complex Letters' },
  { mode: 'similar-pronunciation', label: 'Letters with Similar Pronunciation' },
]

export default function LandingPage({ onStart }: Props) {
  return (
    <div className="page landing-page">
      <h1 className="title">ZAPS: Memory &amp; Language</h1>
      <p className="subtitle">Build-A-Brain — PSYC 203</p>
      <div className="instructions">
        <h2>How to play</h2>
        <ol>
          <li>Choose a sequence type below.</li>
          <li>A sequence will appear on screen — memorize it before the timer runs out.</li>
          <li>Type it back exactly and hit <strong>Submit</strong>.</li>
          <li>Each round adds one more character — see how far you can go!</li>
        </ol>
      </div>
      <p className="instruction-text">Select a mode to start:</p>
      <div className="mode-buttons">
        {MODES.map(({ mode, label }) => (
          <button
            key={mode}
            className="btn btn-primary btn-large btn-mode"
            onClick={() => onStart(mode)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
