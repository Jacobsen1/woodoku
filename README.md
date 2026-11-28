# woodoku
## Game hub (Module Federation)

woodoku is also a Module Federation remote for the game hub. `npm run build`
emits `build/remoteEntry.js`, exposing `./mount` (a `mount(el, ctx)` function
that returns an unmount function). `npm run preview` serves it with CORS on
port 5001. Set `VITE_BASE` to publish under a sub-path. The game still works
standalone at the same address.
