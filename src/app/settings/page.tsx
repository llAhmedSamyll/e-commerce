"use client";

import { updateDataShcema, updateDataShcemaType } from "@/schema/updatedata";
import { updatePassShcema, updatePassShcemaType } from "@/schema/updatePass";
import updateInfo from "@/settingsActions/updateInfo";
import updatePassapi from "@/settingsActions/updatePass";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);

  const form = useForm<updateDataShcemaType>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
    resolver: zodResolver(updateDataShcema),
  });

  const { register, handleSubmit, formState } = form;

  async function updateData(value: {
    name: string;
    email: string;
    phone: string;
  }) {
    setLoadingProfile(true);
    const res = await updateInfo(value);
    console.log(res);
    if (res.message === "fail") {
      setLoadingProfile(false);
      toast.error(res.errors.msg);
    } else {
      setLoadingProfile(false);
      toast.success(res.message);
      form.reset();
    }
    setLoadingProfile(false);
  }
  // ----------------------------------------------------------------------------------------------

  const formPass = useForm<updatePassShcemaType>({
    defaultValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(updatePassShcema),
  });

  const {
    register: registerPass,
    handleSubmit: handleSubmitPass,
    formState: formStatePass,
  } = formPass;

  async function updatePass(value: updatePassShcemaType) {
    setLoadingPassword(true);
    const res = await updatePassapi(value);
    if (res.message === "fail") {
      toast.error(res.errors.msg);
      setLoadingPassword(false);
    }
    if (res.message === "success") {
      setLoadingPassword(false);
      toast.success("Password changed successfully");
      formPass.reset();
    } else {
      toast.error(res.message);
      setLoadingPassword(false);
    }
  }

  return (
    <div className="py-10 px-4 flex justify-center">
      <div className="w-full max-w-3xl space-y-10">
        {/* 🧑‍💻 Update Profile */}
        <form onSubmit={handleSubmit(updateData)}>
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all border">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <i className="fa-solid fa-user-pen text-blue-500"></i>
              Update Personal Information
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <input
                  {...register("name")}
                  type="text"
                  placeholder="Full Name"
                  className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
                <div>
                  {formState.errors.name ? (
                    <p className="text-red-500 text-sm  mt-1  ">
                      <i className=" text-yellow-600 mr-2 fa-solid fa-circle-exclamation" />
                      {formState.errors.name.message}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div>
                <input
                  {...register("email")}
                  placeholder="Email"
                  type="email"
                  className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
                <div>
                  {formState.errors.email ? (
                    <p className="text-red-500 text-sm  mt-1  ">
                      <i className=" text-yellow-600 mr-2 fa-solid fa-circle-exclamation" />
                      {formState.errors.email.message}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="md:col-span-2">
                <input
                  {...register("phone")}
                  placeholder="Phone"
                  type="text"
                  className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
                <div>
                  {formState.errors.phone ? (
                    <p className="text-red-500 text-sm  mt-1  ">
                      <i className=" text-yellow-600 mr-2 fa-solid fa-circle-exclamation" />
                      {formState.errors.phone.message}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={loadingProfile}
              className="mt-6 w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl shadow-sm transition-all disabled:opacity-50"
            >
              {loadingProfile ? <span><i className="fa-solid fa-gear fa-spin mr-2"></i>Saving...</span> : "Save Changes"}
            </button>
          </div>
        </form>

        {/* 🔒 Change Password */}
        <form onSubmit={handleSubmitPass(updatePass)}>
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all border">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <i className="fa-solid fa-lock text-green-500"></i>
              Change Password
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <input
                  {...registerPass("currentPassword")}
                  placeholder="Current Password"
                  type="password"
                  className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition"
                />
                <div>
                  {formStatePass.errors.currentPassword ? (
                    <p className="text-red-500 text-sm  mt-1  ">
                      <i className=" text-yellow-600 mr-2 fa-solid fa-circle-exclamation" />
                      {formStatePass.errors.currentPassword.message}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div>
                <input
                  {...registerPass("password")}
                  placeholder="New Password"
                  type="password"
                  className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition"
                />
                <div>
                  {formStatePass.errors.password ? (
                    <p className="text-red-500 text-sm  mt-1  ">
                      <i className=" text-yellow-600 mr-2 fa-solid fa-circle-exclamation" />
                      {formStatePass.errors.password.message}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div>
                <input
                  {...registerPass("rePassword")}
                  placeholder="Confirm Password"
                  type="password"
                  className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition"
                />
                <div>
                  {formStatePass.errors.rePassword ? (
                    <p className="text-red-500 text-sm  mt-1  ">
                      <i className=" text-yellow-600 mr-2 fa-solid fa-circle-exclamation" />
                      {formStatePass.errors.rePassword.message}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loadingPassword}
              className="mt-6 w-full md:w-auto bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-xl shadow-sm transition-all disabled:opacity-50"
            >
              {loadingPassword ? <span><i className="fa-solid fa-gear fa-spin mr-2"></i>Updating...</span>  : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
