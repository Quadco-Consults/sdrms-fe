import { Suspense } from "react";
import VerifyEmailClient from "@/modules/auth/components/VerifyEmailClient";

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailClient />
    </Suspense>
  );
}
