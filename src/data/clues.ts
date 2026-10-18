import type { Clue } from '../types/clue'

export const INITIAL_CLUES: Clue[] = [
  {
    id: '1',
    title: 'The Torn Letter',
    description: 'A charred fragment of correspondence found in the study fireplace, referencing a midnight rendezvous at the boathouse.',
    location: 'Study Fireplace',
    discovered: true,
    importance: 'high',
  },
  {
    id: '2',
    title: 'The Silver Pocket Watch',
    description: 'Stopped at exactly 11:42 PM. The crystal is shattered and specks of river clay cling to the engraved bezel.',
    location: 'Garden Path',
    discovered: true,
    importance: 'high',
  },
  {
    id: '3',
    title: 'A Smudged Footprint',
    description: 'Size 10 leather boot print coated in red clay, leading towards the conservatory entrance.',
    location: 'Conservatory Entrance',
    discovered: false,
    importance: 'medium',
  },
  {
    id: '4',
    title: 'The Cryptic Cipher',
    description: 'A slip of parchment bearing substitution glyphs and a wax seal stamped with an owl insignia.',
    location: 'Library Bookshelf',
    discovered: false,
    importance: 'medium',
  },
]
