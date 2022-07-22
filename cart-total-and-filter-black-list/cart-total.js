function calculate(sum, count, promo = null) {
  let grandTotal = sum;
  if (promo === 'ДАРИМ300' && sum <= 300) {
    grandTotal = 0;
  } else if (promo === 'ДАРИМ300') {
    grandTotal -= 300;
  }
  if (count >= 10) {
    grandTotal -= grandTotal * 0.05;
  }
  if (grandTotal > 50000) {
    grandTotal -= (grandTotal - 50000) * 0.2;
  }
  if (grandTotal >= 20000 && promo === 'СКИДКА15') {
    grandTotal -= grandTotal * 0.15;
  }
  return grandTotal;
}

export default calculate;
