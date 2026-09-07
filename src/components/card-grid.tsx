import { Children, ReactNode } from "react";

interface CardGridProps {
  children: ReactNode;
}

export default function CardGrid({ children }: CardGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {Children.map(children, (child) => (
        <div className="h-full" data-gsap="card">
          {child}
        </div>
      ))}
    </div>
  );
}
