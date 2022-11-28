/**
 * Get completed status in percent
 * @param {number} subTotal Cart sub total
 * @param {number} freeShippingFrom  Free shipping from amount
 * @returns {number}
 */
export const getCompleted = (subTotal, freeShippingFrom) => {
  let completed = Math.round((subTotal / freeShippingFrom) * 100) * 100 / 100;

  completed = completed > 100 ? completed = 100 : completed;

  if (freeShippingFrom <= 0 && subTotal <= 0) {
    return 0;
  }

  return completed;
};

/**
 * Get missming amout for free shipping
 * @param {number} subTotal Cart sub total
 * @param {number} freeShippingFrom Free shipping from amount
 * @returns {number}
 */
export const getMissingAmount = (subTotal, freeShippingFrom) => {
  const missingAmount = Math.round((freeShippingFrom - subTotal) * 100) / 100;

  if (missingAmount < 0) {
    return 0;
  }

  return missingAmount;
};
