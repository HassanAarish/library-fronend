import apis from "@/api/index";
import { AuthWrapper, Input, PrimaryButton } from "@/components/index";
import { useAuthContext } from "@/context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { HiOutlineKey } from "react-icons/hi";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Navigate, useNavigate, useLocation } from "react-router-dom";

const schema = Yup.object().shape({
  code: Yup.string()
    .matches(/^\d{6}$/, "Enter the 6-digit code")
    .required("Code is required"),
});

const TwoFactorVerify = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { login } = useAuthContext();
  const pendingToken = state?.pendingToken;

  const { mutate: verify, isPending } = useMutation({
    mutationFn: (values) => apis.twoFactorVerify({ pendingToken, code: values.code }),
    onSuccess: ({ data }) => {
      if (data?.success && data?.token) {
        login(data.token);
        toast.success(data?.message || "Logged in successfully");
        navigate("/");
      }
    },
    onError: (err) => toast.error(err || "Invalid code. Please try again."),
  });

  const formik = useFormik({
    initialValues: { code: "" },
    validationSchema: schema,
    onSubmit: (values) => verify(values),
  });

  // Reached without a first-factor pending session → back to login.
  if (!pendingToken) return <Navigate to="/login" replace />;

  return (
    <AuthWrapper
      title="Two-step verification"
      subtitle="Enter the 6-digit code from your authenticator app"
    >
      <form onSubmit={formik.handleSubmit} className="space-y-5">
        <Input
          label="Authentication Code"
          id="code"
          type="text"
          inputMode="numeric"
          maxLength={6}
          required
          icon={HiOutlineKey}
          placeholder="••••••"
          {...formik.getFieldProps("code")}
          error={formik.errors.code}
          touched={formik.touched.code}
        />

        <PrimaryButton
          type="submit"
          label="Verify"
          variant="primary"
          className="mt-4 w-full py-3"
          isLoading={isPending}
        />
      </form>

      <div className="mt-8 text-center">
        <p className="text-sm text-muted">
          Can't access your app?{" "}
          <span
            onClick={() => navigate("/login")}
            className="cursor-pointer font-semibold text-primary hover:underline"
          >
            Back to sign in
          </span>
        </p>
      </div>
    </AuthWrapper>
  );
};

export default TwoFactorVerify;
