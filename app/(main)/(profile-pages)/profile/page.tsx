"use client";

import { Coins, Loader } from "lucide-react";
import {
  Spinner,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Location } from "@/app/interfaces/SnackInterfaces";
import SnackReels from "@/components/snack-reels";
import { getCurrentUser } from "@/app/server-actions/auth/actions";
import { User } from "@supabase/supabase-js";
import Image from "next/image";
import { getUserTokens } from "@/app/server-actions/user/actions";
import AncientMapIcon from "@/components/icons/map";

export default function ProfilePage() {
  const [currentUser, setCurrentUser] = useState<User | null>();
  const [isLoading, setIsLoading] = useState(true);
  const [userTokens, setUserTokens] = useState(0);

  useEffect(() => {
    async function loadUserData() {
      try {
        const user = await getCurrentUser();
        const tokens = await getUserTokens();

        setCurrentUser(user);
        setUserTokens(tokens);
      } finally {
        setIsLoading(false);
      }
    }

    loadUserData();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full flex justify-center pt-20">
        <Spinner />
      </div>
    );
  }

  if (!currentUser) {
    return redirect("/sign-in");
  }

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-28 relative">
        <div className="absolute -bottom-16 left-8">
          {currentUser.user_metadata?.avatar_url ? (
            <Image
              priority
              width={128}
              height={128}
              className="rounded-full border-4 border-white shadow-lg"
              src={currentUser.user_metadata.avatar_url}
              alt="Profile"
            />
          ) : (
            <div className="bg-blue-500 h-32 w-32 rounded-full border-4 border-white flex items-center justify-center text-white text-4xl font-bold shadow-lg">
              <span className="text-4xl font-bold">
                {currentUser.email?.charAt(0)}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <div className="pt-20 px-5 sm:px-8 pb-2">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">
                {currentUser.email?.split("@gmail.com")[0]}
              </h1>
              <p className="text-gray-600">{currentUser.email}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 p-2 sm:p-8 pt-8">
          <div className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-yellow-100 px-3 py-1 shadow-sm border border-yellow-300">
            <Coins size={18} className="text-yellow-600 shrink-0" />
            <span className="text-sm sm:text-base font-semibold text-yellow-800">
              {userTokens} Tokens
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-blue-100 px-3 py-1 shadow-sm border border-blue-300">
            <AncientMapIcon />
            <span className="text-sm sm:text-base font-semibold text-blue-800">
              Ancient Map
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-10 px-3 sm:px-0">
        <Tabs defaultValue="uploaded" className="w-full p-4">
          <div className="flex w-full justify-center">
            <TabsList className="grid w-full sm:w-[400px] grid-cols-2 mb-3">
              <TabsTrigger value="uploaded">Uploaded</TabsTrigger>
              <TabsTrigger value="liked">Liked</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="uploaded">
            <SnackReels location={Location.Uploaded} />
          </TabsContent>
          <TabsContent value="liked">
            <SnackReels location={Location.Liked} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
