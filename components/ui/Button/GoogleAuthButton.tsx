"use client";

import { BASE_URL_API } from "@/apiConstant/apiConstant";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../button";

export default function GoogleAuthButton() {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = () => {
    if (!BASE_URL_API) {
      toast.error("Google sign-in is not configured.");
      return;
    }

    setLoading(true);
    window.location.href = `${BASE_URL_API}/auth/login/google`;
  };

  return (
    <Button
      type="button"
      onClick={handleGoogleLogin}
      disabled={loading}
      variant="secondary"
      className="gap-1.5"
    >
      <Image
        src="/assets/Google_Logo.png"
        alt="Google"
        width={16}
        height={16}
      />
      {loading ? "Redirecting..." : "Continue with Google"}
    </Button>
  );
}
