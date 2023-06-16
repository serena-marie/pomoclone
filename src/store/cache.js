// Look into local storage by key, return a string and try to parse as JSON
// Wrapped in try/catch because calls to localStorage can fail if the user
// privacy doesn't allow for use of local storage
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    // if it doesn't exist, let the reducers init state
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    // so reducers will init state
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    // serialize to string - only works if state is seralizable but
    // redux general recc is that state should be seralizable
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    // Ignore write wrrors
    console.log(`err ${err}`);
  }
};
