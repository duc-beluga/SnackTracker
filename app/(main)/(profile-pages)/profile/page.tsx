"use client";

import { Edit, Loader, Settings } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Location } from "@/app/interfaces/SnackInterfaces";
import SnackReels from "@/components/snack-reels";
import { getCurrentUser } from "@/app/server-actions/auth/actions";
import { User } from "@supabase/supabase-js";
import Image from "next/image";

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const currentUser = await getCurrentUser();

        setUser(currentUser);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCurrentUser();
  }, []);

  if (isLoading) {
    return <Loader />; // or some loading state
  }
  if (!user) {
    return redirect("/sign-in");
  }
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-28 relative">
        <div className="absolute -bottom-16 left-8">
          {user?.user_metadata?.avatar_url ? (
            <Image
              priority
              width={128}
              height={128}
              className="rounded-full border-4 border-white shadow-lg"
              src={user?.user_metadata?.avatar_url}
              alt={"Profile"}
            />
          ) : (
            <div className="bg-blue-500 h-32 w-32 rounded-full border-4 border-white flex items-center justify-center text-white text-4xl font-bold shadow-lg">
              <span className="text-4xl font-bold">
                {user.email?.charAt(0)}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="pt-20 px-8 pb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">
              {user.email?.split("@gmail.com")[0]}
            </h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
          <div className="flex space-x-2">
            <button className="bg-white p-2 rounded-full shadow hover:bg-gray-50">
              <Edit size={20} className="text-gray-600" />
            </button>
            <button className="bg-white p-2 rounded-full shadow hover:bg-gray-50">
              <Settings size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <Tabs defaultValue="uploaded" className="w-full">
          <div className="flex w-full justify-center">
            <TabsList className="grid w-[400px] grid-cols-2">
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
};

export default ProfilePage;
