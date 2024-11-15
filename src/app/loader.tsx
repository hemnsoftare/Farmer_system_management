import { Skeleton } from "@/components/ui/skeleton";

export function Loader() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[155px] w-[240px] bg-neutral-500 rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-[30px] bg-neutral-500 w-[240px]" />
        <Skeleton className="h-[30px] bg-neutral-500 w-[240px]" />
      </div>
    </div>
  );
}
