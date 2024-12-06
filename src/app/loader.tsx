import { Skeleton } from "@/components/ui/skeleton";

export function Loader() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[155px] w-[150px] flex items-center justify-center sm:w-[240px] bg-neutral-500 rounded-xl">
        <Skeleton className="h-[140px] bg-neutral-300  w-[140px] sm:w-[240px]" />
      </Skeleton>
      <div className="space-y-2">
        <Skeleton className="h-[30px] flex items-center justify-center bg-neutral-500  w-[150px] sm:w-[240px]">
          <Skeleton className="h-[20px] bg-neutral-300  w-[130px] sm:w-[240px]" />
        </Skeleton>
        <Skeleton className="h-[30px] bg-neutral-500 flex items-center justify-center w-[150px] sm:w-[240px]">
          <Skeleton className="h-[20px] bg-neutral-300  w-[130px] sm:w-[240px]" />
        </Skeleton>
      </div>
    </div>
  );
}
