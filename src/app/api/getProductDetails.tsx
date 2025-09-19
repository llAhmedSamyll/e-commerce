export default async function getProductDetails(id) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${id}`,
    {
      method: "GET",
      next: { revalidate: 120 },
    }
  );
  const { data } = await res.json();
  return data;
}
