import { createSelector } from 'reselect';
import { getCurrentRouteHelper as getCurrentRoute } from '@shopgate/engage/core';
import { CART_PATH } from '@shopgate/engage/cart';

/**
 * Creates a selector to determine if it is the route of the cart page
 * @returns {bool}
 */
export const isCartRoute = createSelector(
  getCurrentRoute,
  route => route.pattern === CART_PATH
);
