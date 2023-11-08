// task 1
export function calculateDiscount(price, percent) {
  if (typeof price !== 'number' && typeof percent !== 'number') {
    throw new TypeError('Arguments must be numbers');
  }
  return (price / 100) * percent;
}

// ====================================================================

// task 2
export function getMarketingPrice(product) {
  const productObject = JSON.parse(product);

  return productObject.prices ? productObject.prices.marketingPrice : null;
}

// =============================================

// task 3
export async function getAvatarUrl(userId) {
  try {
    const image = await fetchAvatarImage(userId);
    return image.url;
  } catch (error) {
    return '/images/default.jpg';
  }
}

