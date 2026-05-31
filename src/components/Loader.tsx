import React from "react";

const Loader: React.FC = () => (
  <div
    role="status"
    aria-label="Loading"
    className="flex justify-center items-center py-20"
  >
    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    <span className="sr-only">Loading...</span>
  </div>
);

export default Loader;