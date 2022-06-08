import { forwardRef } from "react";

export const Datepicker = forwardRef(({ onChange, value, children }, ref) => {
  return (
    <div class=" ml-4 datepicker relative form-floating mb-3 xl:w-96">
      <input
        ref={ref}
        type="date"
        value={value}
        onChange={onChange}
        class="form-control block shadow-md w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-yellow-400 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-violet-800 focus:outline-none"
        placeholder="To"
      />
      <label for="floatingInput" class="text-gray-700">
        {children}
      </label>
    </div>
  );
});
