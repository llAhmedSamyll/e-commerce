export default async function getAllCategories() {
  let res = await fetch("https://ecommerce.routemisr.com/api/v1/categories", {
    method: "GET",
    next: { revalidate: 120 },
  });
  let data = await res.json();
  return data;
}
