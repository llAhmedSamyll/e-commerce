import getAllCategories from "../../api/getAllCategories";
import CategorySwiper from "./CategorySwiper";

export default async function CategorySlider() {
  const { data } = await getAllCategories();
  return (
    <>
      <CategorySwiper data={data} />
    </>
  );
}
