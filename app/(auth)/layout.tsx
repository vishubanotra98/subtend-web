export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen bg-page">
      {/* ===========================================================
          HERO
      =========================================================== */}

      <aside className="auth-bg relative hidden w-[58%] overflow-hidden border-r border-default lg:flex">
        {/* Content */}
        <div className="relative z-10 flex w-full items-center">
          <div className="max-w-xl px-16 xl:px-20">
            {/* Logo */}
            <span className="mb-8 inline-block text-sm font-semibold uppercase tracking-[0.32em] text-teal-700 dark:text-brand">
              SUBTEND
            </span>

            {/* Heading */}
            <h1 className="text-[60px] font-semibold leading-[1.04] tracking-[-0.04em] text-slate-900 dark:text-white">
              Track issues.
              <br />
              Ship faster.
              <br />
              Stay sane.
            </h1>

            {/* Description */}
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
