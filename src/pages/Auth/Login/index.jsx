import apis from "@/api/index";
import { AuthWrapper, Input, PrimaryButton, SocialAuth } from "@/components/index";
import { useAuthContext } from "@/context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { HiOutlineLockClosed, HiOutlineMail } from "react-icons/hi";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const { mutate: loginUser, isPending } = useMutation({
    mutationFn: (values) => apis.login(values),
    onSuccess: ({ data }) => {
      // 2FA on → backend returns a pending token; go finish at the challenge step.
      if (data?.twoFactorRequired) {
        navigate("/two-factor", { state: { pendingToken: data.pendingToken } });
        return;
      }
      if (data?.success && data?.token) {
        login(data.token);
        toast.success(data?.message || "Login successful");
        navigate("/");
      }
    },
    onError: (err, variables) => {
      const message = typeof err === "string" ? err : "";
      // Unverified accounts get a 403 from the backend — send them to the
      // verify/resend screen with their email instead of a dead-end toast.
      if (message.toLowerCase().includes("verify your email")) {
        toast.info(message);
        navigate("/verify-otp", {
          state: { email: variables?.email, fromLogin: true },
        });
        return;
      }
      toast.error(err || "Check your credentials");
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      authType: "email",
      rememberMe: false,
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      loginUser(values);
    },
  });

  return (
    <AuthWrapper title="Welcome Back" subtitle="Access your library dashboard">
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

        {/* Remember Me and Forgot Password */}
        <div className="flex items-center justify-between mt-2">
          <Input
            id="rememberMe"
            type="checkbox"
            label="Remember me"
            {...formik.getFieldProps("rememberMe")}
            checked={formik.values.rememberMe}
          />
          <span
            onClick={() => navigate("/forgot-password")}
            className="text-sm text-primary hover:underline cursor-pointer font-medium"
          >
            Forgot Password?
          </span>
        </div>

        {/* Action Button using our PrimaryButton component */}
        <PrimaryButton
          type="submit"
          label="Sign In"
          variant="primary"
          className="w-full mt-4 py-3"
          isLoading={isPending}
        />
      </form>

      <SocialAuth />

      <div className="mt-8 text-center">
        <p className="text-gray-400 text-sm">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-primary cursor-pointer hover:underline font-semibold"
          >
            Register here
          </span>
        </p>
      </div>
    </AuthWrapper>
  );
};

export default Login;
