'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(initialState, actions) {
  let prevState = { ...initialState };
  const history = [];

  for (const action of actions) {
    let newState;

    switch (action.type) {
      case 'clear':
        newState = {};
        break;

      case 'addProperties':
        newState = { ...prevState, ...action.extraData };
        break;

      case 'removeProperties':
        newState = { ...prevState };
        action.keysToRemove.forEach((key) => {
          delete newState[key];
        });
        break;

      default:
        newState = { ...prevState };
    }

    history.push(newState);
    prevState = newState;
  }

  return history;
}

module.exports = transformStateWithClones;
