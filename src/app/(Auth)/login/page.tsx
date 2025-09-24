"use client";
import React from "react";
import ShowPasswordButton from "@/app/_Components/ShowPasswordButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { loginSchemaType, loginSchema } from "@/schema/login";
import { signIn } from "next-auth/react";

export default function Login() {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
    shouldFocusError: true,
  });

  async function handellogin(value: loginSchemaType) {
    const res = await signIn("credentials", {
      email: value.email,
      password: value.password,
      redirect: false,
      callbackUrl: "/",
    });

    if (res?.ok) {
      toast.success("Success");
      window.location.href = "/"
    } else {
      toast.error(res.error);
    }
  }

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-[480px] w-full">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm">
            <h1 className="text-slate-900 text-center text-3xl font-bold">
              login
            </h1>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handellogin)}>
                <div className="mt-12 space-y-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative flex items-center">
                            <input
                              {...field}
                              type="email"
                              required
                              className="w-full text-slate-900 border border-slate-300 px-4 py-3 pr-8 rounded-md outline-blue-600"
                              placeholder="Enter your email"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative flex items-center">
                            <input
                              {...field}
                              id="passwordInput"
                              type="password"
                              required
                              className="w-full text-slate-900 border border-slate-300 px-4 py-3 pr-8 rounded-md outline-blue-600"
                              placeholder="Enter your password"
                            />
                            <ShowPasswordButton inputId="passwordInput" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-3 block text-sm text-slate-900"
                      >
                        Remember me
                      </label>
                    </div>
                    <div className="text-sm">
                      <a
                        href="jajvascript:void(0);"
                        className="text-blue-600 hover:underline font-semibold"
                      >
                        Forgot your password?
                      </a>
                    </div>
                  </div>
                  <div className="!mt-12">
                    <button
                      type="submit"
                      className="w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer"
                    >
                      Sign in
                    </button>
                  </div>
                  <p className="text-slate-900 text-sm !mt-6 text-center">
                    If you have an account ,
                    <Link
                      href="/register"
                      className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold"
                    >
                      register here
                    </Link>
                  </p>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
