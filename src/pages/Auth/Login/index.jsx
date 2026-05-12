import apis from "@/api/index";
import { Input, PrimaryButton } from "@/components/index";
import { useAuthContext } from "@/context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import React from "react";
import { HiOutlineLockClosed, HiOutlineMail } from "react-icons/hi";
import { toast } from "react-toastify";
import * as Yup from "yup";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const { login } = useAuthContext();

  const { mutate: loginUser, isPending } = useMutation({
    mutationFn: (values) => apis.login(values),
    onSuccess: ({ data }) => {
      if (data?.success) {
        login(data?.token);
        toast.success(data?.message || "Login Successful");
        navigate("/");
      }
    },
    onError: (err) => {
      toast.error(err || "Check your credentials");
    },
  });

  const formik = useFormik({
    initialValues: { email: "", password: "", authType: "email" },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      loginUser(values);
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] px-4 font-display">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400 text-sm">Access your library dashboard</p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          {/* Email Field using our new Input component */}
          <Input
            label="Email Address"
            id="email"
            type="email"
            required
            icon={HiOutlineMail}
            placeholder="name@example.com"
            {...formik.getFieldProps("email")}
            error={formik.errors.email}
            touched={formik.touched.email}
          />

          {/* Password Field using our new Input component */}
          <Input
            label="Password"
            id="password"
            type="password"
            required
            icon={HiOutlineLockClosed}
            placeholder="••••••••"
            {...formik.getFieldProps("password")}
            error={formik.errors.password}
            touched={formik.touched.password}
          />

          {/* Action Button using our PrimaryButton component */}
          <PrimaryButton
            type="submit"
            label="Sign In"
            variant="primary"
            className="w-full mt-4 py-3"
            isLoading={isPending}
          />
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/auth/register")}
              className="text-primary cursor-pointer hover:underline font-semibold"
            >
              Register here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
