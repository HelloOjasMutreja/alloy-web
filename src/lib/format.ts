export function formatRupee(value: number): string {
  const abs = Math.round(Math.abs(value));
  const str = abs.toString();

  if (str.length <= 3) return `₹${str}`;

  const last3 = str.slice(-3);
  const rest = str.slice(0, -3);
  const formatted = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + last3;
  return `₹${formatted}`;
}

