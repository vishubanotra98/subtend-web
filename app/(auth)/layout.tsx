import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen bg-page">
      <aside className="auth-bg relative hidden w-[58%] overflow-hidden border-r border-default lg:flex">
        <div className="absolute inset-0 z-0 block dark:hidden select-none pointer-events-none">
          <Image
            src="/assets/SubtendLight.avif"
            alt="Subtend Light Background"
            fill
            priority
            sizes="58vw"
            className="object-cover object-right opacity-60"
            quality={100}
            fetchPriority="high"
            unoptimized
          />
        </div>

        <div className="absolute inset-0 z-0 hidden dark:block select-none pointer-events-none">
          <Image
            src="/assets/SubtendDark.avif"
            alt="Subtend Dark Background"
            fill
            priority
            sizes="58vw"
            className="object-cover object-right opacity-60"
            fetchPriority="high"
            unoptimized
          />
        </div>

        <div className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.7),transparent_55%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.035),transparent_55%)]" />

        <div className="relative z-10 flex w-full items-center">
          <div className="max-w-xl px-16 xl:px-20">
            <span className="mb-8 inline-block text-sm font-semibold uppercase tracking-[0.32em] text-teal-700 dark:text-brand">
              SUBTEND
            </span>

            <h1 className="text-[60px] font-semibold leading-[1.04] tracking-[-0.04em] text-slate-900 dark:text-white">
              Track issues.
              <br />
              Ship faster.
              <br />
              Stay sane.
            </h1>

            <p className="mt-8 max-w-sm text-[17px] leading-8 text-slate-600 dark:text-gray-300">
              A focused workspace for modern engineering teams to plan,
              collaborate, and ship software without unnecessary complexity.
            </p>
          </div>
        </div>
      </aside>

      {/* ===========================================================
          AUTH PANEL
      =========================================================== */}
      <main className="flex w-full items-center justify-center bg-background px-8 py-12 lg:w-[42%]">
        <div className="w-full max-w-lg">{children}</div>
      </main>
    </div>
  );
}
