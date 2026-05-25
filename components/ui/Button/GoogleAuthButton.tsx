"use client";

export default function GoogleAuthButton() {
  const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_URL_API;
  const handleGoogleLogin = () => {
    window.location.href = `${BASE_API_URL}/auth/login/google`;
  };
  return (
    <button
      onClick={handleGoogleLogin}
      className="google-auth-btn cursor-pointer"
    >
      <img src="/assets/Google_Logo.png" alt="Google" width={16} height={16} />
      Continue with Google
    </button>
  );
}
