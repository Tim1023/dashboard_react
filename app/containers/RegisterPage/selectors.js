import { createSelector } from 'reselect';

/**
 * Direct selector to the registerPage state domain
 */

const selectGlobal = (state) => state.get('global');

const makeRegisterError = () => createSelector(
  selectGlobal,
  (global) => global.get('loginError'),
);

const selectRegsiterPage = (state) => state.get('registerPage');

const makeSelectUsername = () => createSelector(
  selectRegsiterPage,
  (registerPage) => registerPage.get('username'),
);

const makeSelectPassword = () => createSelector(
  selectRegsiterPage,
  (registerPage) => registerPage.get('password'),
);

export {
  makeSelectUsername,
  makeSelectPassword,
  makeRegisterError,
};
