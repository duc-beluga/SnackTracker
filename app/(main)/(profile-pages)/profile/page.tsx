import { createClient } from "@/utils/supabase/server";
import { Calendar, Edit, Settings, Star } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

const ProfilePage = async () => {
  const supabase = await createClient();
  const userBio =
    "Snack enthusiast. Always on the hunt for the perfect sweet and salty combo!";
  const userSince = "March 2023";
  const userLocation = "Chicago, IL";
  const favoriteSnacks = [
    "Salt & Vinegar Chips",
    "Dark Chocolate Almonds",
    "Cheese Crackers",
    "Cookies & Cream Ice Cream",
  ];
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }
  return (
    <div className="min-h-screen">
      {/* {JSON.stringify(user, null, 2)} */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-28 relative">
        <div className="absolute -bottom-16 left-8">
          <div className="bg-blue-500 h-32 w-32 rounded-full border-4 border-white flex items-center justify-center text-white text-4xl font-bold shadow-lg">
            {user.email?.charAt(0)}
          </div>
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
        <div className="mt-4 bg-white rounded-lg shadow p-6">
          <p className="text-gray-800">{userBio}</p>
          <div className="mt-4 flex items-center text-gray-600 text-sm">
            <Calendar size={16} className="mr-1" />
            <span>Member since {userSince}</span>
            <span className="mx-4">•</span>
            <span>{userLocation}</span>
          </div>
        </div>
        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <Star size={20} className="text-yellow-500 mr-2" />
            <h2 className="text-xl font-semibold">Favorite Snacks</h2>
          </div>
          <div className="space-y-3">
            {favoriteSnacks.map((snack, index) => (
              <div
                key={index}
                className="flex items-center py-2 border-b border-gray-100 last:border-0"
              >
                <div className="w-2 h-2 rounded-full bg-purple-500 mr-3"></div>
                <span>{snack}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
