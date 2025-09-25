"use client";
import ShowPasswordButton from "@/app/_Components/ShowPasswordButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { registerSchema, registerSchemaType } from "@/schema/register";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function Register() {
  const [loading, setloading] = useState(false);

  const router = useRouter();
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(registerSchema),
    shouldFocusError: true,
  });

  async function handelRegister(value: registerSchemaType) {
    setloading(true);

    const response = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", value)
      .then((res) => {
        setloading(false);
        toast.success(res.data.message);
        form.reset();
        router.push("/login");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        console.log(err);
        setloading(false);
      });
  }

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-[480px] w-full">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm">
            <h1 className="text-slate-900 text-center text-3xl font-bold">
              Register
            </h1>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handelRegister)}>
                <div className="mt-12 space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>User name</FormLabel>
                        <FormControl>
                          <div className="relative flex items-center">
                            <input
                              {...field}
                              type="text"
                              required
                              className="w-full text-slate-900  border border-slate-300 px-4 py-3 pr-8 rounded-md outline-blue-600"
                              placeholder="Enter user name"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                  <FormField
                    control={form.control}
                    name="rePassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Repassword</FormLabel>
                        <FormControl>
                          <div className="relative flex items-center">
                            <input
                              {...field}
                              id="rePasswordInput"
                              type="password"
                              required
                              className="w-full text-slate-900 border border-slate-300 px-4 py-3 pr-8 rounded-md outline-blue-600"
                              placeholder="Enter your password again"
                            />
                            <ShowPasswordButton inputId="rePasswordInput" />
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
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <div className="relative flex items-center">
                            <input
                              {...field}
                              type="tel"
                              inputMode="tel"
                              required
                              className="w-full text-slate-900  border border-slate-300 px-4 py-3 pr-8 rounded-md outline-blue-600"
                              placeholder="Enter your phone number"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="!mt-12">
                    <button
                      type="submit"
                      className="w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer"
                    >
                      {loading ? (
                        <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                      ) : (
                        "Sign up"
                      )}
                    </button>
                  </div>
                  <p className="text-slate-900 text-sm !mt-6 text-center">
                    If you have an account ,
                    <Link
                      href="/login"
                      className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold"
                    >
                      Login now
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
