export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-20 p-5">
      <div className="max-w-7xl flex flex-col gap-12 items-start mt-28">
        {children}
      </div>
    </div>
  );
}
