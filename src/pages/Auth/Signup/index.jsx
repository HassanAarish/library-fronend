import apis from "@/api/index";
import { AuthWrapper, Input, PrimaryButton, SocialAuth } from "@/components/index";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { HiOutlineLockClosed, HiOutlineMail, HiOutlineUser } from "react-icons/hi";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const signupSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Signup = () => {
  const navigate = useNavigate();

  const { mutate: registerUser, isPending } = useMutation({
    mutationFn: (values) => apis.register(values),
    // Register returns a confirmation message (no token) — the account must be
    // verified via OTP before logging in, so we forward the email to that step.
    onSuccess: ({ data }, values) => {
      if (data?.success) {
        toast.success(data?.message || "Registration successful");
        navigate("/verify-otp", { state: { email: values.email } });
      }
    },
    onError: (err) => {
      toast.error(err || "Registration failed");
    },
  });

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "", authType: "email" },
    validationSchema: signupSchema,
    onSubmit: (values) => {
      registerUser(values);
    },
  });

  return (
    <AuthWrapper title="Create Account" subtitle="Join our library community">
      <form onSubmit={formik.handleSubmit} className="space-y-5">
        <Input
          label="Full Name"
          id="name"
          type="text"
          required
          icon={HiOutlineUser}
          placeholder="John Doe"
          {...formik.getFieldProps("name")}
          error={formik.errors.name}
          touched={formik.touched.name}
        />

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

        <PrimaryButton
          type="submit"
          label="Sign Up"
          variant="primary"
          className="w-full mt-4 py-3"
          isLoading={isPending}
        />
      </form>

      <SocialAuth />

      <div className="mt-8 text-center">
        <p className="text-gray-400 text-sm">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-primary cursor-pointer hover:underline font-semibold"
          >
            Sign in here
          </span>
        </p>
      </div>
    </AuthWrapper>
  );
};

export default Signup;
