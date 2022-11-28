import { connect } from 'react-redux';
import { getCurrency, getSubTotal } from '@shopgate/engage/cart';

/**
 * Maps state to props.
 * @param {*} state The current application state.
 * @returns {Object}
 */
const mapStateToProps = state => ({
  subTotal: getSubTotal(state),
  currency: getCurrency(state),
});

export default connect(mapStateToProps);
