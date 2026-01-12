import { BadgeCheck } from "lucide-react";

import { AvatarComponent } from "@/components/shared/avatar-component";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const AvatarExample = () => {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Avatar Examples</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {/* 1. Initials fallback (default) */}
        <ExampleBlock label="Initials fallback">
          <AvatarComponent name="John Doe" className="h-10 w-10 rounded-md" />
        </ExampleBlock>

        {/* 2. Remote image */}
        <ExampleBlock label="Remote image">
          <AvatarComponent
            src="https://avatars.githubusercontent.com/u/12345678?v=4"
            name="John Doe"
            className="h-12 w-12 rounded-full"
          />
        </ExampleBlock>

        {/* 3. Broken image fallback */}
        <ExampleBlock label="Broken image">
          <AvatarComponent
            src="https://example.com/broken.jpg"
            name="Broken Img"
            className="h-12 w-12 rounded-full"
          />
        </ExampleBlock>

        {/* 4. No name (no fallback initials) */}
        <ExampleBlock label="No name / alt">
          <AvatarComponent src="" className="h-12 w-12 rounded-full" />
        </ExampleBlock>

        {/* 5. Long name fallback */}
        <ExampleBlock label="Long name">
          <AvatarComponent name="Alexandrianna von Mustermann" className="h-12 w-12 rounded-full" />
        </ExampleBlock>

        {/* 6. Square shape */}
        <ExampleBlock label="Square shape">
          <AvatarComponent name="Jane" className="h-12 w-12 rounded-md" />
        </ExampleBlock>

        {/* 7. Circle shape */}
        <ExampleBlock label="Circle shape">
          <AvatarComponent name="Jane" className="h-12 w-12 rounded-full" />
        </ExampleBlock>

        {/* 8. Status badge (bottom-right) */}
        <ExampleBlock label="Status badge">
          <AvatarComponent
            name="Online User"
            className="h-12 w-12 rounded-full"
            cornerPosition="bottom-right"
            cornerContent={<span className="block w-3 h-3 bg-green-500 rounded-full" />}
          />
        </ExampleBlock>

        {/* 9. Icon badge (top-right) */}
        <ExampleBlock label="Icon badge">
          <AvatarComponent
            name="Verified"
            className="h-12 w-12 rounded-full"
            cornerPosition="top-right"
            cornerContent={<BadgeCheck className="size-4 text-blue-500" />}
          />
        </ExampleBlock>

        {/* 10. Top-left corner */}
        <ExampleBlock label="Top-left badge">
          <AvatarComponent
            name="Top Left"
            className="h-12 w-12 rounded-full"
            cornerPosition="top-left"
            cornerContent={<div className="w-2 h-2 bg-red-500 rounded-full" />}
          />
        </ExampleBlock>

        {/* 11. Bottom-left corner */}
        <ExampleBlock label="Bottom-left badge">
          <AvatarComponent
            name="Bottom Left"
            className="h-12 w-12 rounded-full"
            cornerPosition="bottom-left"
            cornerContent={<div className="w-2 h-2 bg-yellow-500 rounded-full" />}
          />
        </ExampleBlock>

        {/* 12. Clickable avatar */}
        <ExampleBlock label="Clickable">
          <AvatarComponent
            name="Clickable"
            className="h-12 w-12 rounded-full"
            onClick={() => alert("Avatar clicked")}
          />
        </ExampleBlock>

        {/* 13. Custom ring + shadow */}
        <ExampleBlock label="Custom ring/shadow">
          <AvatarComponent
            name="Styled"
            className="h-12 w-12 rounded-full ring-2 ring-purple-500 shadow-md"
          />
        </ExampleBlock>

        {/* 14. Pulse status badge */}
        <ExampleBlock label="Pulse badge">
          <AvatarComponent
            name="Live"
            className="h-12 w-12 rounded-full"
            cornerPosition="bottom-right"
            cornerContent={
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-600"></span>
              </span>
            }
          />
        </ExampleBlock>

        {/* 15. With Tooltip */}
        <ExampleBlock label="With Tooltip">
          <Tooltip>
            <TooltipTrigger asChild>
              <AvatarComponent
                name="Alex Tooltip"
                className="h-12 w-12 rounded-full cursor-pointer"
              />
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Alex Johnson</p>
            </TooltipContent>
          </Tooltip>
        </ExampleBlock>
      </div>
    </section>
  );
};

const ExampleBlock = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-col items-center gap-2">
    {children}
    <span className="text-xs text-muted-foreground text-center">{label}</span>
  </div>
);
