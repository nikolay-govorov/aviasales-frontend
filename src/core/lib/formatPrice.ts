const priceFormatter = new Intl.NumberFormat(["ru-RU"], {
  style: "currency",
  currency: "RUB"
});

export function formatPrice(price: number): string {
  return priceFormatter.format(price);
}
