"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Fragment, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { AUTH_ROUTES } from "@/constants/routes";
import { useResendOtp } from "../controllers/resendOtpController";
import AuthFormHeader from "./AuthFormHeader";
import { useVerifyEmail } from "../controllers/verifyEmailController";
import { useVerifyMfa } from "../controllers/verifyMfaController";

export default function VerifyEmailClient() {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(300);

  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const type = searchParams.get("type");
  const isMfa = searchParams.get("mfa") === "true";
  const isFpr = searchParams.get("fpr") === "true";

  const router = useRouter();

  useEffect(() => {
    const countdown = setInterval(() => {
      if (timer > 0) {
        setTimer((prevTime) => prevTime - 1);
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [timer]);

  const { resendOtp } = useResendOtp();
  const { verifyEmail, isLoading: isVerifyLoading } = useVerifyEmail();
  const { verifyMfa, isLoading: isMfaLoading } = useVerifyMfa();

  const onSubmit = async () => {
    if (!otp) {
      return toast.error("Please enter the otp code");
    }

    if (email && otp) {
      if (isFpr) {
        const res = await verifyEmail({
          email,
          totp: otp,
        });
        if (res?.status === true) {
          return router.push(
            `${AUTH_ROUTES.RESET_PASSWORD}?email=${email}&token=${otp}&fpr=true`
          );
        }
      }
      if (type === "RESET_PASSWORD") {
        const res = await verifyEmail({
          email,
          totp: otp,
        });
        if (res?.status === true) {
          return router.push(
            `${AUTH_ROUTES.RESET_PASSWORD}?email=${email}&token=${otp}`
          );
        }
      }
      if (isMfa) {
        const res = await verifyMfa({
          email,
          totp: otp,
        });

        if (res?.status === true && res?.data?.access_token) {
          localStorage.setItem("access_token", res.data.access_token);
          toast.success("MFA verified successfully");
          router.push("/dashboard");
          return;
        }
      } else {
        const res = await verifyEmail({
          email,
          totp: otp,
        });

        if (res?.status === true) {
          toast.success("Email verified successfully");
          router.push("/auth/signin");
          return;
        }
      }

      toast.error("Verification failed. Please try again.");
    }
  };

  const handleResendOtp = async () => {
    if (email) {
      await resendOtp({
        email: email,
      });

      setTimer(300);
      toast.success("We've sent another OTP to your inbox");
    }
  };

  return (
    <Fragment>
      <AuthFormHeader
        title={isMfa ? "Multi-Factor Authentication" : "Verify OTP"}
        description={
          isMfa
            ? "Enter your MFA code to continue"
            : "Enter the code sent to your email"
        }
      />

      <div className="flex gap-3 w-full items-center justify-center mt-6 mb-10">
        {[...Array(6)].map((_, index) => (
          <Input
            key={index}
            type="text"
            maxLength={1}
            value={otp[index] || ""}
            onChange={(e) => {
              const value = e.target.value;
              if (value.length <= 1 && /^\d*$/.test(value)) {
                const newOtp = otp.split("");
                newOtp[index] = value;
                setOtp(newOtp.join(""));
                if (value && index < 5) {
                  const nextInput = document.querySelector(
                    `input[name=otp-${index + 1}]`
                  ) as HTMLInputElement;
                  nextInput?.focus();
                }
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Backspace" && !otp[index] && index > 0) {
                const prevInput = document.querySelector(
                  `input[name=otp-${index - 1}]`
                ) as HTMLInputElement;
                prevInput?.focus();
              }
            }}
            name={`otp-${index}`}
            className="w-14 h-14 text-center text-xl"
          />
        ))}
      </div>

      <p className="text-center text-sm">
        OTP will expire in{" "}
        <span className="font-bold">
          {String(Math.floor(timer / 60)).padStart(2, "0")}:
          {String(timer % 60).padStart(2, "0")}
        </span>
      </p>

      {timer === 0 && (
        <Button
          type="button"
          variant="ghost"
          size="lg"
          className="p-0 ml-auto block text-primary font-normal"
          onClick={handleResendOtp}
        >
          Resend OTP
        </Button>
      )}

      <Button
        type="button"
        className="w-full mt-6"
        size="lg"
        onClick={onSubmit}
        isLoading={isMfa ? isMfaLoading : isVerifyLoading}
      >
        Verify OTP
      </Button>
    </Fragment>
  );
}
