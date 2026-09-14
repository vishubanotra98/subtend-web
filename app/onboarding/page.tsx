import Image from "next/image";

import { OnboardingForm } from "@/components/Forms/OnboardingForm";

export default function OnboardingPage() {
  return (
    <div className="onboarding-bg flex min-h-screen items-center justify-center px-6 py-12">
      <div className="relative z-10 w-full max-w-2xl">
        <div className="flex flex-col items-center">
          <div className="relative flex justify-center">
            <Image
              src="/assets/svg/subtend.svg"
              alt="Subtend"
              width={180}
              height={60}
              className="relative z-10 h-auto w-[160px] md:w-[180px]"
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
