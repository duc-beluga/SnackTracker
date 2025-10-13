"use client";

import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import {
  googleSignInAction,
  passwordSignInAction,
} from "@/app/server-actions/auth/actions";
import { GoogleIcon } from "@/components/ui/google-icon";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui";
import { setCurrentUser } from "@/app/store/authSlice";
import { getSignInForm } from "@/utils/zod/forms/SignInForm";
import { SignInSchemaType } from "@/utils/zod/schemas/SignInSchema";

export default function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();

  const router = useRouter();

  const form = getSignInForm();

  async function onGoogleSignIn() {
    try {
      await googleSignInAction();
    } catch (err) {
      toast.error("Google sign-up failed.");
    }
  }

  async function onPasswordSignIn(values: z.infer<typeof SignInSchemaType>) {
    setIsLoading(true);
    const result = await passwordSignInAction(values);

    try {
      if (result.error) {
        toast.error(result.error);
        setIsLoading(false);
      } else {
        dispatch(setCurrentUser(result.user));
        toast.success("Signed in succesfully!");
        router.back();
      }
    } catch {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex-1 flex flex-col min-w-64">
      <h1 className="text-2xl font-medium">Sign in</h1>
      <p className="text-sm text-foreground mb-6">
        Don't have an account?{" "}
        <Link className="text-foreground font-medium underline" href="/sign-up">
          Sign up
        </Link>
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onPasswordSignIn)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email..." {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel>Password</FormLabel>
                  <Link
                    className="text-xs text-foreground underline"
                    href="/forgot-password"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <FormControl>
                  <Input placeholder="Password..." {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </Form>

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-background px-2 text-muted-foreground">or</span>
        </div>
      </div>

      <Button
        onClick={onGoogleSignIn}
        variant="outline"
        className="flex items-center justify-center gap-2 hover:bg-accent"
      >
        <GoogleIcon />
        Continue with Google
      </Button>
    </div>
  );
}
