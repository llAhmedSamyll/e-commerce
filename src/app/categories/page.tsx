import getAllCategories from "@/api/getAllCategories";
import { CategoryType } from "@/types/category.type";
import Image from "next/image";
import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import SubCategory from "../_Components/SubCategory";

export default async function Categories() {
  const { data }: { data: CategoryType[] } = await getAllCategories();

  return (
    <>
      <div className="container mx-auto ">
        <div className=" flex  flex-wrap justify-center p-2 ">
          {data?.map((category) => (
            <div
              key={category._id}
              className="p-3 w-full  md:w-1/2 lg:w-1/3  xl:w-1/4 2xl:w-1/5 "
            >
              <Drawer>
                <DrawerTrigger>
                  <div className="bg-white outline-1 outline-slate-300 hover:shadow-lg hover:scale-[1.1] text-teal-800 hover:text-black  cursor-pointer  rounded-2xl overflow-hidden    transition-all transton-[.3s]   ">
                    <div className="  w-full max-h-100 md:max-h-50 bg-white flex justify-center items-center  overflow-hidden ">
                      <Image
                        priority
                        width={500}
                        height={500}
                        className=" object-cover "
                        src={category.image}
                        alt={category.name}
                      />
                    </div>
                    <div className="flex justify-center items-center font-bold text-lg p-2 ">
                      {category.name}
                    </div>
                  </div>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle className="font-bold text-xl">
                      Subcategories
                    </DrawerTitle>
                  </DrawerHeader>
                  <DrawerDescription>
                    <SubCategory id={category?._id} />
                  </DrawerDescription>
                  <DrawerFooter>
                    <DrawerClose>
                      <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
