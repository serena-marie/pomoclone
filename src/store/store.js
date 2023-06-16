import { configureStore } from '@reduxjs/toolkit';
import modeReducer from './modeSlice';
import { loadState, saveState } from './cache';

const persistedState = loadState();

const store = configureStore({
  preloadedState: persistedState,
  reducer: {
    mode: modeReducer,
  },
});

store.subscribe(() => {
  saveState(store.getState());
});

/**
 * The store brings together the state, actions, and reduces that make up your app.
 * The store - holds current state via (store.getState())
 * Allows the state to be updates via store.dispatch(action)
 * "Registers listener callbacks via store.subscribe(listener)"
*/
export default store;
