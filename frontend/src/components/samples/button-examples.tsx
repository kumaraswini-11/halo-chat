import {
  ArrowLeft,
  ArrowRight,
  Check,
  ExternalLink,
  LoaderCircle,
  Trash2,
  Upload,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function ButtonExamples() {
  return (
    <section className="space-y-8">
      <h2 className="text-2xl font-semibold mb-4">Buttons</h2>

      {/* Sizes */}
      <div className="flex flex-wrap gap-4">
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
        <Button size="icon" aria-label="Trash">
          <Trash2 className="size-4" />
        </Button>
      </div>

      {/* Variants */}
      <div className="flex flex-wrap gap-4">
        <Button variant="default">Default</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
        <Button variant="destructive">Destructive</Button>
      </div>

      {/* Icon + text */}
      <div className="flex flex-wrap gap-4">
        <Button>
          <Upload className="size-4 mr-2" />
          Upload
        </Button>

        <Button>
          Save
          <Check className="size-4 ml-2" />
        </Button>

        <Button>
          <ArrowLeft className="size-4 mr-2" />
          Back
        </Button>

        <Button>
          Continue
          <ArrowRight className="size-4 ml-2" />
        </Button>
      </div>

      {/* Loading */}
      <div className="flex flex-wrap gap-4">
        <Button disabled>
          <LoaderCircle className="size-4 animate-spin mr-2" />
          Saving...
        </Button>
      </div>

      {/* Disabled with tooltip */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button disabled>Submit</Button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>Form is incomplete</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Full-width / block */}
      <div className="w-full">
        <Button className="w-full">Block Button</Button>
      </div>

      {/* External Link */}
      <div className="flex flex-wrap gap-4">
        <Button asChild variant="link">
          <a href="https://example.com" target="_blank" rel="noopener noreferrer">
            External Link <ExternalLink className="size-4 ml-1" />
          </a>
        </Button>
      </div>

      {/* File Upload Trigger */}
      <div className="flex flex-wrap gap-4">
        <label htmlFor="file-upload">
          <Button variant="outline" asChild>
            <span>
              <Upload className="size-4 mr-2" />
              Upload File
            </span>
          </Button>
        </label>
        <input id="file-upload" type="file" className="hidden" />
      </div>

      {/* Destructive Confirmation UI */}
      <div className="flex flex-wrap gap-4">
        <Button variant="destructive">
          <Trash2 className="size-4 mr-2" />
          Delete
        </Button>
        <Button variant="outline" className="text-red-500 border-red-500 hover:bg-red-50">
          Confirm Delete
        </Button>
      </div>
    </section>
  );
}
