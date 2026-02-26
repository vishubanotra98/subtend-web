import { Suspense } from "react";
import ClientVerification from "@/components/Verifications/ClientVerification";

export default function UserInvite() {
  return (
    <main>
      <Suspense
        fallback={
          <p className="text-gray-400 text-center mt-10">
            Loading invite details...
          </p>
        }
      >
        <ClientVerification />
      </Suspense>
    </main>
  );
}
