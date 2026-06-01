import React from "react";
interface LoaderProps {
  message?: string;
}
const Loader: React.FC<LoaderProps> = ({ message = "Loading…" }) => (
  <div
    role="status"
    aria-label={message}
    className="flex flex-col items-center justify-center py-24 gap-4"
  >
    <div className="w-9 h-9 rounded-full border-[2.5px] border-gray-200 border-t-blue-600 animate-spin" />
    <span className="text-sm text-gray-400">{message}</span>
    <span className="sr-only">{message}</span>
  </div>
);

export default Loader;