export default async function getProductDetails(id) {
  let res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${id}`,
    {
      method: "GET",
      next: { revalidate: 120 },
    }
  );
  let { data } = await res.json();
  return data;
}
