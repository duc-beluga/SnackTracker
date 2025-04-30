"use client";

import React, { ReactNode, useEffect } from "react";
import { store } from "./store";
import { Provider } from "react-redux";
import { createClient } from "@/utils/supabase/client";
import { setCurrentUser } from "./authSlice";

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const supabase = createClient();

    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      store.dispatch(setCurrentUser(user));
    };

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      store.dispatch(setCurrentUser(session?.user || null));
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);
  return <Provider store={store}>{children}</Provider>;
};
