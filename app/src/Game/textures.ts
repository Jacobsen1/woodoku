import woodUrl from '../assets/wood.png'

// Imported (not from public/) so the URL points at this game's server, also when
// the game is mounted inside the game hub. Kept out of constants.ts, which the UI
// tests import in Node.
export const WOOD_TEXTURE = `url('${woodUrl}')`
