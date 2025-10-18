"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import otpCode from "@/PassActions/otpcode";
import toast from "react-hot-toast";
import Link from "next/link";

const FormSchema = z.object({
  resetCode: z.string().min(6, {
    message: "Your reset code must be 6 numbers.",
  }),
});

export default function InputOTPForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      resetCode: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const res = await otpCode(data);
    console.log(res);
    if (res.status === "Success") {
      toast.success("success");
      window.location.href = "/resetPassword";
    } else {
      toast.error(res.message);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
      <div className="max-w-[500px] w-full">
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-2/3 space-y-6"
            >
              <FormField
                control={form.control}
                name="resetCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl">Reset code</FormLabel>

                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot
                            index={0}
                            className="border-1 border-teal-500"
                          />
                          <InputOTPSlot
                            index={1}
                            className="border-1 border-teal-500"
                          />
                          <InputOTPSlot
                            index={2}
                            className="border-1 border-teal-500"
                          />
                          <InputOTPSlot
                            index={3}
                            className="border-1 border-teal-500"
                          />
                          <InputOTPSlot
                            index={4}
                            className="border-1 border-teal-500"
                          />
                          <InputOTPSlot
                            index={5}
                            className="border-1 border-teal-500"
                          />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription>
                      Please enter the reset code sent to your email.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Submit</Button>
            </form>
          </Form>
          <Link
            href="/forgotPass"
            className="absolute top-2 right-4 bg-white p-1 rounded-lg "
          >
            <i className="fa-solid fa-arrow-left text-sm"></i> Back
          </Link>
        </div>
      </div>
    </div>
  );
}
