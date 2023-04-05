import * as lscache from 'lscache';

export const loadState = () => {
  try {
    lscache.flushExpired();
    const serializedState = lscache.get('state');
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    lscache.set('state', serializedState, 10);
  } catch {

  }
};