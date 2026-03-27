import { Suspense } from "react";
import ResetPasswordClient from "@/modules/auth/components/ResetPasswordClient";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordClient />
    </Suspense>
  );
}
