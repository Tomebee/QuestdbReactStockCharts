import { forwardRef } from "react";

export const Button = forwardRef(({ onClick, children, secondary }, ref) => {
  const primaryClassNames = "bg-violet-600 text-white hover:bg-violet-800 ";
  const secondaryClassNames = "bg-white border border-yellow-400 hover:bg-yellow-500 hover:text-white";
  return (
    <button
      ref={ref}
      onClick={onClick}
      className={"ml-10 block mt-1.5 px-6 h-12 rounded-md transition shadow-md tracking-wider " + (secondary ? secondaryClassNames : primaryClassNames)}
    >
      {children}
    </button>
  );
});
