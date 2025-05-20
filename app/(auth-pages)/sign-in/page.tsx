import { googleSignUp, signInAction } from "@/app/server-actions/auth/actions";
import { FormMessage, Message } from "@/components/form-message";
import { GoogleIcon } from "@/components/google-icon";
import { SubmitButton } from "@/components/submit-button";
import { Button, Input, Label } from "@/components/ui";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
};

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <div className="flex-1 flex flex-col min-w-64">
      <form>
        <h1 className="text-2xl font-medium">Sign in</h1>
        <p className="text-sm text-foreground">
          Don't have an account?{" "}
          <Link
            className="text-foreground font-medium underline"
            href="/sign-up"
          >
            Sign up
          </Link>
        </p>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />
          <div className="flex justify-between items-center">
            <Label htmlFor="password">Password</Label>
            <Link
              className="text-xs text-foreground underline"
              href="/forgot-password"
            >
              Forgot Password?
            </Link>
          </div>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            required
          />
          <SubmitButton formAction={signInAction} pendingText="Signing in...">
            Sign in
          </SubmitButton>

          <FormMessage message={searchParams} />
        </div>
      </form>
      <Button onClick={googleSignUp}>
        <GoogleIcon />
      </Button>
    </div>
  );
}
