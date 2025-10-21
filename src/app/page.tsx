import MainSlider from "./_Components/MainSlider";
import CategorySlider from "./_Components/CategorySlider";
import AllProducts from "./_Components/AllProducts";
export const metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <>
      <MainSlider />
      <CategorySlider />
      <AllProducts />
    </>
  );
}
