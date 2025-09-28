import React from "react";

export default async function SubCategory({ id }: { id: string }) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`,
    {
      method: "GET",
      next: { revalidate: 120 },
    }
  );
  interface SubCategoryType {
    _id: string;
    name: string;
  }
  const { data }: { data: SubCategoryType[] } = await res.json();

  return (
    <div className=" container mx-auto flex flex-wrap justify-center items-center p-5 gap-5 " >
      {data.map((value) => (
        <>
          <div className=" rounded-2xl shadow-md shadow-slate-500 border-slate-200 border hover:bg-[#101828] hover:border-none transition-all hover:text-yellow-300 text-slate-800   lg:w-1/5  flex justify-center items-center   " key={value._id}>
            {" "}
            <p className=" p-3 font-bold text-md  ">{value?.name}</p>
          </div>
        </>
      ))}
    </div>
  );
}
