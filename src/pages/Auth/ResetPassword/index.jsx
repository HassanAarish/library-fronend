import apis from "@/api/index";
import { AuthWrapper, Input, PrimaryButton } from "@/components/index";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { HiOutlineLockClosed } from "react-icons/hi";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";

const resetSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Please confirm your password"),
});

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const { mutate: reset, isPending } = useMutation({
    mutationFn: (values) => apis.resetPassword(token, { password: values.password }),
    onSuccess: ({ data }) => {
      if (data?.success) {
        toast.success(data?.message || "Password reset. Please sign in.");
        navigate("/login");
      }
    },
    onError: (err) => toast.error(err || "Invalid or expired reset link"),
  });

  const formik = useFormik({
    initialValues: { password: "", confirmPassword: "" },
    validationSchema: resetSchema,
    onSubmit: (values) => reset(values),
  });

  return (
    <AuthWrapper
      title="Set a new password"
      subtitle="Choose a strong password you haven't used before."
    >
      <form onSubmit={formik.handleSubmit} className="space-y-5">
        <Input
          label="New Password"
          id="password"
          type="password"
          required
          icon={HiOutlineLockClosed}
          placeholder="••••••••"
          {...formik.getFieldProps("password")}
          error={formik.errors.password}
          touched={formik.touched.password}
        />
        <Input
          label="Confirm Password"
          id="confirmPassword"
          type="password"
          required
          icon={HiOutlineLockClosed}
          placeholder="••••••••"
          {...formik.getFieldProps("confirmPassword")}
          error={formik.errors.confirmPassword}
          touched={formik.touched.confirmPassword}
        />

        <PrimaryButton
          type="submit"
          label="Reset Password"
          variant="primary"
          className="w-full mt-4 py-3"
          isLoading={isPending}
        />
      </form>

      <div className="mt-8 text-center">
        <p className="text-sm text-muted">
          Back to{" "}
          <span
            onClick={() => navigate("/login")}
            className="cursor-pointer font-semibold text-primary hover:underline"
          >
            Sign in
          </span>
        </p>
      </div>
    </AuthWrapper>
  );
};

export default ResetPassword;
