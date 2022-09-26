import { connect } from 'react-redux';
import { getCurrency, getSubTotal } from '@shopgate/engage/cart';

const mapStateToProps = (state) => ({
  subTotal: getSubTotal(state),
  currency: getCurrency(state),
});

export default connect(mapStateToProps);
