export function formatDate(value) {
  if (!value) return "N/A";

  return new Date(value).toLocaleDateString("vi-VN");
}

export function formatMoney(value) {
  if (!value) return "N/A";

  return Number(value).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
}
