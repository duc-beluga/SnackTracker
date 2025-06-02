export default function SearchPage({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  const searchString = searchParams.query;
  return <div>Search result for: {searchString}</div>;
}
