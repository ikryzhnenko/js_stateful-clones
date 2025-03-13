'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const statesArray = []; // Array to hold all resulting states
  let currentState = { ...state };
  // Start with a shallow clone of the initial state

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        // Create a completely empty state
        currentState = {};
        break;

      case 'addProperties':
        // Add all key-value pairs from extraData
        currentState = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties':
        // Remove specified keys from the state
        currentState = Object.keys(currentState).reduce((newState, key) => {
          if (!action.keysToRemove.includes(key)) {
            newState[key] = currentState[key];
          }

          return newState;
        }, {});
        break;
    }

    // Push the new state to the statesArray
    statesArray.push(currentState);
  }

  return statesArray;
}

module.exports = transformStateWithClones;
