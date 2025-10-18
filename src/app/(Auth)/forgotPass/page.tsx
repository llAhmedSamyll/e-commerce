"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import forgetPass from "@/PassActions/forgetPass";
import { forgetPassSchema } from "@/schema/forgetPass";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function FrogotPass() {
  const [loading, setloading] = useState(false);
  const [disablebtn, setdisablebtn] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgetPassSchema),
  });

  async function handelForgetPass(value: { email: string }) {
    setloading(true);
    setdisablebtn(true);
    const res = await forgetPass(value);
    console.log(res);
    if (res.statusMsg === "fail") {
      setloading(false);
      setdisablebtn(false);

      toast.error(res.message);
    } else {
      toast.success(res.message);
      setTimeout(() => (window.location.href = "/otp"), 1000);
    }
  }

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-[480px] w-full">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm">
            <h1 className="text-slate-900 text-center text-3xl font-bold">
              Forgot Password
            </h1>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(handelForgetPass)}>
                <div className="mt-12 space-y-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email </FormLabel>
                        <FormControl>
                          <div className="relative flex items-center">
                            <input
                              {...field}
                              type="email"
                              className="w-full text-slate-900 border border-slate-300 px-4 py-3 pr-8 rounded-md outline-blue-600"
                              placeholder="Enter your email"
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
                        "send"
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
