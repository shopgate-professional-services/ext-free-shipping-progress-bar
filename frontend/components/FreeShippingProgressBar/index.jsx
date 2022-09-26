import React from 'react';
import PropTypes from 'prop-types';
import { I18n } from '@shopgate/engage/components';
import connect from './connector';
import getConfig from '../../helpers/getConfig';
import { getCompleted, getMissingAmount } from '../../helpers/getProcessBarValues';
import { css } from 'glamor';
import { themeName } from '@shopgate/pwa-common/helpers/config';

const isIOS = themeName.includes('ios');

/**
 * Get config
 */
const { 
  freeShippingFrom,
  outerColor,
  innerColor,
} = getConfig();

/**
 * Styling
 */
const innerStyle = completed => css({
  height: '-webkit-fill-available',
  width: `calc(${completed}% + 2px)`,
  backgroundColor: `${outerColor}`,
  borderRadius: 'inherit',
  textAlign: 'right',
  marginLeft: '-1px'
}).toString();

const outerStyle = css(isIOS ? {
  height: '9px',
  width: 'inherit',
  backgroundColor: `${innerColor}`,
  border: `2px solid ${outerColor}`,
  borderRadius: '4px',
  marginTop: '10px'
} : {
  height: '9px',
  width: 'inherit',
  backgroundColor: `${innerColor}`,
  border: `2px solid ${outerColor}`,
  borderRadius: '0',
  marginTop: '10px'
}).toString()

const noticeStyle = css({
  marginTop: '9px',
  fontSize: '14px',
  lineHeight: 'normal'
}).toString()

const containerStyle = css({
  padding: '16px',
  backgroundColor: '#fff'
}).toString()


/**
 * The ProgressBar component
 */
const ProgressBar = ({ completed }) => (
  <div className={outerStyle}>
    <div className={innerStyle(completed)} />
  </div>
)

/**
 * The ProgressBarContainer component
 * TODO: check warings for 'forKey'
 */
const ProgressBarContainer = ({ missingAmount, completed, currency }) => (
  missingAmount > 0 ? (
    <div className={containerStyle}>
      <ProgressBar completed={completed} />
      <div className={noticeStyle}>
        <I18n.Text string="freeShippingProgressBar.isNotReached" params={{ missingAmount: missingAmount }}>
          <strong forKey="missingAmount">
            <I18n.Price price={missingAmount} currency={currency} />
          </strong>
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
)

/**
 * The FreeShippingProgressBar component
 */
const FreeShippingProgressBar = (probs) => (
  freeShippingFrom > 0 ? (
    <ProgressBarContainer
      missingAmount={getMissingAmount(probs.subTotal, freeShippingFrom)}
      completed={getCompleted(probs.subTotal, freeShippingFrom)}
      currency={probs.currency}
    />
  ): null
);

FreeShippingProgressBar.propTypes = {
  subTotal: PropTypes.number,
  currency: PropTypes.string,
};

FreeShippingProgressBar.defaultProps = {
  subTotal: 0,
  currency: "",
};

export default connect(FreeShippingProgressBar);
