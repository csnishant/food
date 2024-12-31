import React from "react";
import { Button } from "./ui/button";

const NoResultFound = ({ searchText }: { searchText: string }) => {
  return (
    <div className="flex flex-col items-center justify-center my-10">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        No Results Found
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mt-2">
        We couldn't find any results for "{searchText}". Try searching with
        different keywords.
      </p>
      <Button
        className="mt-4 bg-orange hover:bg-hoverOrange"
        onClick={() => window.location.reload()}>
        Try Again
      </Button>
    </div>
  );
};

export default NoResultFound;
