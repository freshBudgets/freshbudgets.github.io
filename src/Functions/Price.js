export function FormatPrice(num) {
  const price = parseFloat(Math.round(num * 100) / 100).toFixed(2)
  return `$${price}`;
}
