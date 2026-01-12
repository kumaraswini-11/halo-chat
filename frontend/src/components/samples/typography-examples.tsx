import React from "react";

export const TypographyExamples = () => {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Typography</h2>

      <div className="flex flex-wrap gap-4 items-center">
        {/* Tailwind font size utilities */}
        <span className="text-[10px]">text-[10px]</span>
        <span className="text-xs">text-xs</span>
        <span className="text-sm">text-sm</span>
        <span className="text-base">text-base</span>
        <span className="text-lg">text-lg</span>
        <span className="text-xl">text-xl</span>
        <span className="text-2xl">text-2xl</span>
        <span className="text-3xl">text-3xl</span>
        <span className="text-4xl">text-4xl</span>
        <span className="text-5xl">text-5xl</span>
        <span className="text-6xl">text-6xl</span>
      </div>
    </section>
  );
};
