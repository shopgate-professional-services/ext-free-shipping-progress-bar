import React from 'react';
import PropTypes from 'prop-types';
import { I18n } from '@shopgate/engage/components';
import { css } from 'glamor';
import { themeName } from '@shopgate/pwa-common/helpers/config';
import connect from './connector';
import getConfig from '../../helpers/getConfig';
import { getCompleted, getMissingAmount } from '../../helpers/getProcessBarValues';

const isIOS = themeName.includes('ios');

/**
 * Get exntesion config
 */
const {
  freeShippingFrom,
  outerColor,
  innerColor,
} = getConfig();

/**
 * Inner style of the process bar
 * @param {int} completed Percentage value of the progress bar
 * @returns {string}
 */
const innerStyle = completed => css({
  height: '-webkit-fill-available',
  width: `calc(${completed}% + 2px)`,
  backgroundColor: `${outerColor}`,
  borderRadius: 'inherit',
  textAlign: 'right',
  marginLeft: '-1px',
}).toString();

const outerStyle = css(isIOS ? {
  height: '9px',
  width: 'inherit',
  backgroundColor: `${innerColor}`,
  border: `2px solid ${outerColor}`,
  borderRadius: '4px',
  marginTop: '10px',
} : {
  height: '9px',
  width: 'inherit',
  backgroundColor: `${innerColor}`,
  border: `2px solid ${outerColor}`,
  borderRadius: '0',
  marginTop: '10px',
}).toString();

const noticeStyle = css({
  marginTop: '9px',
  fontSize: '14px',
  lineHeight: 'normal',
}).toString();

const containerStyle = css({
  padding: '16px',
  backgroundColor: '#fff',
}).toString();

/**
 * The ProgressBar component
 * @param {Object} props Properties
 * @returns {JSX}
 */
const ProgressBar = ({ completed }) => (
  <div className={outerStyle}>
    <div className={innerStyle(completed)} />
  </div>
);

/**
 * The ProgressBarContainer component
 * @param {int} missingAmount Amount to reach the free shipping
 * @param {int} completed Percentage value of the progress bar
 * @param {string} currency Currency
 * @returns {JSX}
 */
const ProgressBarContainer = ({ missingAmount, completed, currency }) => (
  missingAmount > 0 ? (
    <div className={containerStyle}>
      <ProgressBar completed={completed} />
      <div className={noticeStyle}>
        <I18n.Text string="freeShippingProgressBar.isNotReached" params={{ missingAmount }}>
          <I18n.Price price={missingAmount} currency={currency} forKey="missingAmount" />
        </I18n.Text>
      </div>
    </div>
  ) : (
    <div className={containerStyle}>
      <ProgressBar completed={completed} />
      <div className={noticeStyle}>
        <I18n.Text string="freeShippingProgressBar.isReached" />
      </div>
    </div>
  )
);

/**
 * The FreeShippingProgressBar component
 * @param {Object} props Properties
 * @returns {JSX}
 */
const FreeShippingProgressBar = props => (
  freeShippingFrom > 0 ? (
    <ProgressBarContainer
      missingAmount={getMissingAmount(props.subTotal, freeShippingFrom)}
      completed={getCompleted(props.subTotal, freeShippingFrom)}
      currency={props.currency}
    />
  ) : null
);

ProgressBarContainer.propTypes = {
  completed: PropTypes.number,
  currency: PropTypes.string,
  missingAmount: PropTypes.number,
};

ProgressBarContainer.defaultProps = {
  completed: 0,
  currency: '',
  missingAmount: freeShippingFrom,
};

ProgressBar.propTypes = {
  completed: PropTypes.number,
};

ProgressBar.defaultProps = {
  completed: 0,
};

FreeShippingProgressBar.propTypes = {
  currency: PropTypes.string,
  subTotal: PropTypes.number,
};

FreeShippingProgressBar.defaultProps = {
  subTotal: 0,
  currency: '',
};

export default connect(FreeShippingProgressBar);
