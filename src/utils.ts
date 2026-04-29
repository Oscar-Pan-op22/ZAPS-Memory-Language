import { GameMode } from './types'

const CHAR_SETS: Record<GameMode, string[]> = {
  'digits': ['0','1','2','3','4','5','6','7','8','9'],
  'simple-letters': ['A','D','I','J','K','O','Q','R','U','Y'],
  'complex-letters': ['A','F','H','L','M','N','S','W','X','Y'],
  'similar-pronunciation': ['B','C','D','E','G','P','Q','T','V','Z'],
}

export function generateString(length: number, mode: GameMode): string {
  const chars = CHAR_SETS[mode]
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

export function memTime(level: number): number {
  return 2 + (level - 1) * 0.8
}
