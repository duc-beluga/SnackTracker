import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

const ProfilePage = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }
  return <div>{JSON.stringify(user, null, 2)}</div>;
};

export default ProfilePage;
