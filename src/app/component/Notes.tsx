import Masonry from "react-masonry-css";
import type React from "react";

const breakpointColumns = {
  default: 3,
  1024: 2,
  480: 1,
};

export default function Notes({ children }: { children: React.ReactNode }) {
  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="mx-auto w-full px-6 pb-6 flex gap-4"
      columnClassName="space-y-4"
    >
      {children}
    </Masonry>
  );
}
