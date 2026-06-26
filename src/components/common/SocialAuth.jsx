import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { FaFacebookF } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apis from "@/api/index";
import { useAuthContext } from "@/context/AuthContext";
import { useModalContext } from "@/context/ModalContext";
import { GOOGLE_CLIENT_ID, FACEBOOK_APP_ID } from "@/constants";
import { facebookLogin } from "@/utils/facebook";
import { Modal, PrimaryButton } from "@/components";

const SocialAuth = () => {
  const navigate = useNavigate();
  const { login } = useAuthContext();
  const { modal, openModal, closeModal } = useModalContext();
  const [loading, setLoading] = useState(false);

  const authenticate = async (provider, token, link = false) => {
    setLoading(true);
    try {
      const { data } = await apis.socialLogin({ provider, token, link });

      // Same-email account exists → ask the user whether to link.
      if (data?.linkRequired) {
        openModal("link", { provider, token, email: data.email });
        return;
      }

      // 2FA on → finish at the challenge step with the pending token.
      if (data?.twoFactorRequired) {
        navigate("/two-factor", { state: { pendingToken: data.pendingToken } });
        return;
      }

      if (data?.success && data?.token) {
        login(data.token);
        toast.success(data?.message || "Logged in successfully");
        navigate("/");
      }
    } catch (err) {
      toast.error(err || "Social sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  const handleFacebook = async () => {
    try {
      const accessToken = await facebookLogin();
      await authenticate("facebook", accessToken);
    } catch (err) {
      toast.error(err?.message || "Facebook sign-in was cancelled");
    }
  };

  const confirmLink = () => {
    const link = modal?.data;
    closeModal();
    if (link) authenticate(link.provider, link.token, true);
  };

  const cancelLink = () => {
    closeModal();
    toast.info("Please sign in with your email and password instead.");
    navigate("/login");
  };

  // Nothing to show if neither provider is configured.
  if (!GOOGLE_CLIENT_ID && !FACEBOOK_APP_ID) return null;

  return (
    <div className="mt-6">
      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-xs uppercase tracking-wider text-faint">or continue with</span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <div className="flex flex-col items-center gap-3">
        {GOOGLE_CLIENT_ID && (
          <div className="flex justify-center scheme-light">
            <GoogleLogin
              onSuccess={(cred) => authenticate("google", cred.credential)}
              onError={() => toast.error("Google sign-in failed")}
              theme="filled_black"
              shape="pill"
              text="continue_with"
              size="large"
              width="300"
            />
          </div>
        )}

        {FACEBOOK_APP_ID && (
          <button
            type="button"
            onClick={handleFacebook}
            disabled={loading}
            className="flex w-75 items-center justify-center gap-2.5 rounded-full bg-[#1877F2] py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FaFacebookF /> Continue with Facebook
          </button>
        )}
      </div>

      <Modal
        isOpen={modal?.type === "link"}
        onClose={closeModal}
        size="sm"
        title="Account already exists"
      >
        <p className="text-sm text-muted">
          An account with <span className="text-ink">{modal?.data?.email}</span> already exists.
          Link your <span className="capitalize">{modal?.data?.provider}</span> sign-in to it?
        </p>
        <div className="mt-6 flex gap-3">
          <PrimaryButton
            label="Use password"
            variant="secondary"
            className="flex-1 py-2.5"
            onClick={cancelLink}
          />
          <PrimaryButton
            label="Link account"
            variant="primary"
            className="flex-1 py-2.5"
            onClick={confirmLink}
          />
        </div>
      </Modal>
    </div>
  );
};

export default SocialAuth;
