import apis from "@/api/index";
import { AuthWrapper, Input, PrimaryButton } from "@/components/index";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { HiOutlineMail } from "react-icons/hi";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Email is required"),
});

const ForgotPassword = () => {
  const navigate = useNavigate();

  const { mutate: resetPassword, isPending } = useMutation({
    mutationFn: (values) => apis.forgotPassword(values),
    onSuccess: ({ data }) => {
      if (data?.success) {
        toast.success(data?.message || "Reset link sent to your email");
        navigate("/login");
      }
    },
    onError: (err) => {
      toast.error(err || "Failed to send reset link");
    },
  });

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: forgotPasswordSchema,
    onSubmit: (values) => {
      resetPassword(values);
    },
  });

  return (
    <AuthWrapper title="Reset Password" subtitle="Enter your email to reset your password">
      <form onSubmit={formik.handleSubmit} className="space-y-5">
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

        <PrimaryButton
          type="submit"
          label="Send Reset Link"
          variant="primary"
          className="w-full mt-4 py-3"
          isLoading={isPending}
        />
      </form>

      <div className="mt-8 text-center">
        <p className="text-gray-400 text-sm">
          Remember your password?{" "}
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

export default ForgotPassword;
