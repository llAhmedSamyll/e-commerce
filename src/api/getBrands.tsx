export default async function getBrands() {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands", {
    method: "GET",
    next: { revalidate: 120 },
  });
  const data = await res.json();
  return data;
}
