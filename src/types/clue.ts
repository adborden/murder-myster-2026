export interface Clue {
  id: string
  title: string
  description: string
  location: string
  discovered: boolean
  importance: 'high' | 'medium' | 'low'
}
