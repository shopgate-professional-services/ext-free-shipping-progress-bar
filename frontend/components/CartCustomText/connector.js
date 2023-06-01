import { connect } from 'react-redux';
import { isCartRoute } from './selector';

/**
 * Maps state to props.
 * @param {Object} state State.
 * @returns {bool} The route is the cart page
 */
const mapStateToProps = state => ({
  isCartRoute: isCartRoute(state),
});

export default connect(mapStateToProps);
