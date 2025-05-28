import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { SignInSchemaType } from "../schemas/SignInSchema";

export const getSignInForm = () =>
  useForm<z.infer<typeof SignInSchemaType>>({
    resolver: zodResolver(SignInSchemaType),
    defaultValues: {
      email: "",
      password: "",
    },
  });
