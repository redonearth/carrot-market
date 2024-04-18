export default function Loading() {
  return (
    <div className="p-5 animate-pulse flex flex-col gap-y-5">
      {[...Array(10)].map((_, index) => (
        <div key={index} className="*:rounded-md flex gap-x-5">
          <div className="size-28 rounded-md bg-neutral-700" />
          <div className="flex flex-col gap-y-2 *:rounded-md">
            <div className="bg-neutral-700 h-5 w-40" />
            <div className="bg-neutral-700 h-5 w-20" />
            <div className="bg-neutral-700 h-5 w-10" />
          </div>
        </div>
      ))}
    </div>
  );
}
