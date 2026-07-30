import Image from "next/image";

import { OnboardingForm } from "@/components/Forms/OnboardingForm";

export default function OnboardingPage() {
  return (
    <div className="auth-bg flex min-h-screen items-center justify-center px-6 py-12">
      <div className="relative z-10 w-full max-w-2xl">
        <div className="flex flex-col items-center">
          <div className="relative flex justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="h-40 w-40 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(20,184,166,0.08) 0%, rgba(20,184,166,0.04) 35%, transparent 70%)",
                  filter: "blur(28px)",
                }}
              />
            </div>

            <Image
              src="/assets/svg/subtend.svg"
              alt="Subtend"
              width={180}
              height={60}
              className="h-auto w-[160px] md:w-[180px] relative z-10"
              priority
            />
          </div>

          <div className="mt-10 space-y-3 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-primary md:text-5xl">
              Welcome to Subtend
            </h1>

            <p className="mx-auto max-w-md text-base leading-7 text-secondary">
              Create your first workspace to get started.
            </p>
          </div>

          <div className="mt-10 w-full max-w-lg rounded-card border border-default bg-card p-8 shadow-card md:p-10">
            <OnboardingForm />
          </div>
        </div>
      </div>
    </div>
  );
}
