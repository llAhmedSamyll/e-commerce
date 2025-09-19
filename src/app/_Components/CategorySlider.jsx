import getAllCategories from "../api/getAllCategories";
import CategorySwiper from "../_Components/CategorySwiper";

export default async function CategorySlider() {
  let { data } = await getAllCategories();
  return (
    <>
      <CategorySwiper data={data} />
    </>
  );
}
