/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectOrders = (state) => state.get('orders');

const makeSelectMessage = () => createSelector(
  selectOrders,
  (homeState) => homeState.get('message')
);

export {
  selectOrders,
  makeSelectMessage,
};
