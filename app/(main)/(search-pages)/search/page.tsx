import { Location } from "@/app/interfaces/SnackInterfaces";
import SnackReels from "@/components/snack-reels";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const { query: searchString } = await searchParams;

  return (
    <div className="flex flex-col py-6 gap-4 w-full px-6">
      <div className="text-sm text-gray-500">
        Showing results for:{" "}
        <span className="font-medium text-gray-700">
          {searchString || "..."}
        </span>
      </div>

      <div className="border-t border-gray-200" />

      <SnackReels location={Location.Search} searchQuery={searchString} />
    </div>
  );
}
