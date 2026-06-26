import apis from "@/api/index";
import { AuthWrapper, Input, PrimaryButton } from "@/components/index";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { HiOutlineKey } from "react-icons/hi";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";

const otpSchema = Yup.object().shape({
  otp: Yup.string()
    .matches(/^\d{6}$/, "OTP must be 6 digits")
    .required("OTP is required"),
});

// Matches the backend RESEND_COOLDOWN_MS (60s).
const RESEND_COOLDOWN = 60;

const VerifyOtp = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email || "";

  // From signup a code was just emailed → start the 60s clock. From a login
  // redirect (unverified account) no fresh code was sent, so let them resend now.
  const [cooldown, setCooldown] = useState(state?.fromLogin ? 0 : RESEND_COOLDOWN);

  useEffect(() => {
    if (cooldown <= 0) return undefined;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const { mutate: verify, isPending } = useMutation({
    mutationFn: (values) => apis.verifyOtp({ email, otp: values.otp }),
    onSuccess: ({ data }) => {
      if (data?.success) {
        toast.success(data?.message || "Email verified. Please sign in.");
        navigate("/login");
      }
    },
    onError: (err) => toast.error(err || "Invalid or expired code"),
  });

  const { mutate: resend, isPending: isResending } = useMutation({
    mutationFn: () => apis.resendOtp({ email }),
    onSuccess: ({ data }) => {
      toast.success(data?.message || "A new code has been sent.");
      setCooldown(RESEND_COOLDOWN);
    },
    onError: (err) => toast.error(err || "Couldn't resend the code"),
  });

  const formik = useFormik({
    initialValues: { otp: "" },
    validationSchema: otpSchema,
    onSubmit: (values) => verify(values),
  });

  const canResend = email && cooldown <= 0 && !isResending;

  return (
    <AuthWrapper
      title="Verify your email"
      subtitle={
        email ? `Enter the 6-digit code we sent to ${email}` : "Enter the 6-digit verification code"
      }
    >
      <form onSubmit={formik.handleSubmit} className="space-y-5">
        <Input
          label="Verification Code"
          id="otp"
          type="text"
          inputMode="numeric"
          maxLength={6}
          required
          icon={HiOutlineKey}
          placeholder="••••••"
          {...formik.getFieldProps("otp")}
          error={formik.errors.otp}
          touched={formik.touched.otp}
        />

        <PrimaryButton
          type="submit"
          label="Verify Email"
          variant="primary"
          className="w-full mt-4 py-3"
          isLoading={isPending}
        />
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-muted">
          Didn't get the code?{" "}
          {canResend ? (
            <button
              type="button"
              onClick={() => resend()}
              className="cursor-pointer font-semibold text-primary hover:underline"
            >
              Resend code
            </button>
          ) : (
            <span className="font-medium text-faint">
              {isResending ? "Sending…" : email ? `Resend in ${cooldown}s` : "Resend unavailable"}
            </span>
          )}
        </p>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-muted">
          Entered the wrong email?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="cursor-pointer font-semibold text-primary hover:underline"
          >
            Sign up again
          </span>
        </p>
      </div>
    </AuthWrapper>
  );
};

export default VerifyOtp;
