"use client";
import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import SelectCity from "../../_Components/SelectCity";
import { checkoutSchemaType, checkoutshcema } from "../../../schema/checkout";
import onlinePayment from "@/chekoutActions/onlineChekOut";
import { useParams } from "next/navigation";

export default function OnlineCheckOut() {
  const [loading, setloading] = useState(false);
  const [disablebtn, setdisablebtn] = useState(false);
  const {id} : {id: string} = useParams();

  const form = useForm({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
    resolver: zodResolver(checkoutshcema),
    shouldFocusError: true,
  });
  
  async function handelOnlinCheckOut(value: checkoutSchemaType) {
    setloading(true);
    setdisablebtn(true);
    console.log(value);
    const res = await onlinePayment( id , "http://localhost:3000/", value);
    if (res.status === "success"){
      window.location.href = res.session.url
    }
  }

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-[480px] w-full">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm">
            <h1 className="text-slate-900 text-center text-3xl font-bold">
              Checkout
            </h1>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handelOnlinCheckOut)}>
                <div className="mt-12 space-y-6">
                  <SelectCity form={form} />

                  <FormField
                    control={form.control}
                    name="details"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Details</FormLabel>
                        <FormControl>
                          <div className="relative flex items-center">
                            <textarea
                              {...field}
                              className="w-full text-slate-900 border border-slate-300 px-4 py-3 pr-8 rounded-md outline-blue-600"
                              placeholder="Enter your details"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone number </FormLabel>
                        <FormControl>
                          <div className="relative flex items-center">
                            <input
                              {...field}
                              type="tel"
                              className="w-full text-slate-900 border border-slate-300 px-4 py-3 pr-8 rounded-md outline-blue-600"
                              placeholder="Enter your phone number"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem className="hidden">
                        <FormLabel>city </FormLabel>
                        <FormControl>
                          <div className="relative flex items-center">
                            <input
                              {...field}
                              type="text"
                              className="w-full text-slate-900 border border-slate-300 px-4 py-3 pr-8 rounded-md outline-blue-600"
                              placeholder="Your city"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="!mt-12">
                    <button
                      disabled={disablebtn}
                      type="submit"
                      className="w-full disabled:bg-blue-400 disabled:cursor-not-allowed py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer"
                    >
                      {loading ? (
                        <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                      ) : (
                        "Checkout"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
