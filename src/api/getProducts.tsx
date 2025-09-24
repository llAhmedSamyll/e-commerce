export default async function getProducts() {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/products", {
    method: "GET",
    next: { revalidate: 120 },
  });
  const { data } = await res.json();

  return data;
}
