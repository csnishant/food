import React from "react";
import { Skeleton } from "./ui/skeleton";

const SearchPageSkeleton = () => {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {Array(6)
        .fill("")
        .map((_, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden">
            <Skeleton className="aspect-w-16 aspect-h-9 w-full h-48" />
            <div className="p-4">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
              <div className="mt-4 flex gap-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SearchPageSkeleton;
