import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import { I18n } from '@shopgate/engage/components';
import connect from './connector';
import getConfig from '../../helpers/getConfig';

/**
 * Get extension config
 */
const { cartAdditionalText } = getConfig();

/**
 * Style
 */
const customTextStyle = css({
  fontSize: '12px',
  lineHeight: 'normal',
  padding: '0 16px 20px 16px',
  marginTop: '-10px',
}).toString();

/**
 * The CartAdditionalText component
 * Displays a custom text in the product.tax-disclaimer.after portal (PDP excluded)
 * @returns {JSX}
 */
const CartAdditionalText = ({ isCartRoute }) => (
  isCartRoute && cartAdditionalText.length > 0 ? (
    <div className={customTextStyle}>
      <I18n.Text string={cartAdditionalText} />
    </div>
  ) : null
);

CartAdditionalText.propTypes = {
  isCartRoute: PropTypes.bool.isRequired,
};

export default connect(CartAdditionalText);
