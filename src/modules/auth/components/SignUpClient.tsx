"use client";
import FormInput from "@/components/shared/FormInput";
import { Form } from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";
import { evaluatePassword } from "../lib/helpers";
import { signUpSchema } from "@/modules/auth/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { TSignUpFormValues } from "../lib/types";
import { Button } from "@/components/ui/button";
import { useSignUp } from "../controllers/signUpController";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AUTH_ROUTES } from "@/constants/routes";
import Link from "next/link";
import AuthFormHeader from "./AuthFormHeader";
import { Fragment } from "react";

export default function SignUpClient() {
  const form = useForm<TSignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const router = useRouter();

  const requirements = evaluatePassword(form.watch("password"));

  const { signUp, isLoading: isSignUpLoading } = useSignUp();

  const onSubmit: SubmitHandler<TSignUpFormValues> = async (data) => {
    // Split full_name into first_name and last_name for API
    const nameParts = data.full_name.trim().split(" ");
    const first_name = nameParts[0] || "";
    const last_name = nameParts.slice(1).join(" ") || nameParts[0] || "";

    const payload = {
      first_name,
      last_name,
      email: data.email,
      mobile_number: "", // Empty for now as per Figma design
      password: data.password,
    };

    await signUp(payload);
    toast.success("Sign up successful");
    router.push(`${AUTH_ROUTES.VERIFY_OTP}?email=${data.email}`);
  };

  return (
    <Fragment>
      <AuthFormHeader
        title='Create an Account'
        description='Sign up to start tracking your sustainability goals.'
      />

      <Form {...form}>
        <form className='space-y-5' onSubmit={form.handleSubmit(onSubmit)}>
          <FormInput
            label='Full name'
            name='full_name'
            placeholder='Enter your full name'
            required
          />

          <FormInput
            label='Email address'
            name='email'
            placeholder='abc@email.com'
            required
          />

          <FormInput
            type='password'
            label='Password'
            name='password'
            placeholder='Enter Password'
            required
          />

          <FormInput
            type='password'
            label='Confirm Password'
            name='confirm_password'
            placeholder='Re-enter Password'
            required
          />

          <PasswordStrengthIndicator requirements={requirements} />

          <Button
            type='submit'
            className='w-full'
            size='lg'
            isLoading={isSignUpLoading}
          >
            Sign Up
          </Button>
        </form>
      </Form>

      <footer className='flex items-center justify-between text-sm mt-20'>
        <p className='text-[#0E0F10]'>
          Already have an account?{" "}
          <Link href={AUTH_ROUTES.SIGN_IN} className='text-[#4CAF50]'>
            Sign In
          </Link>
        </p>

        <Link href='#' className='text-[#4CAF50]'>
          Terms & Conditions
        </Link>
      </footer>
    </Fragment>
  );
}
