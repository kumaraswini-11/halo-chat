import { FileText, Download, Image, Music, Video, File } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { FileType } from "@/lib/types";
import { cn } from "@/lib/utils";

interface MessageFileProps {
  fileName: string;
  fileSize: number;
  fileUrl?: string;
  fileMimeType?: string;
  className?: string;
}

export function MessageFile({
  fileName,
  fileSize,
  fileUrl,
  fileMimeType,
  className,
}: MessageFileProps) {
  const fileType = getFileType(fileName, fileMimeType);
  const formattedSize = formatFileSize(fileSize);

  const handleDownload = () => {
    if (fileUrl) {
      window.open(fileUrl, "_blank");
    }
  };

  return (
    <div
      className={cn(
        "bg-muted hover:bg-muted/80 flex items-center gap-3 rounded-xl border p-3 transition-colors",
        className,
      )}
    >
      {/* File Icon */}
      <div
        className={cn("shrink-0 rounded-lg p-2", getIconBackground(fileType))}
      >
        {getFileIcon(fileType)}
      </div>

      {/* File Info */}
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium">{fileName}</div>
        <div className="text-muted-foreground flex items-center gap-2 text-xs">
          <span>{formattedSize}</span>
          <span>•</span>
          <span className="capitalize">{fileType}</span>
        </div>
      </div>

      {/* Download Button */}
      {fileUrl && (
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-8 shrink-0"
                onClick={handleDownload}
              >
                <Download className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Download</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}

// ============================================================================
// Helper Functions
// ============================================================================

// Determine file type from filename or mime type
function getFileType(fileName: string, mimeType?: string): FileType {
  const extension = fileName.split(".").pop()?.toLowerCase();

  if (mimeType) {
    if (mimeType.startsWith("image/")) return "image";
    if (mimeType.startsWith("audio/")) return "audio";
    if (mimeType.startsWith("video/")) return "video";
  }

  // Document types
  const documentExtensions = [
    "pdf",
    "doc",
    "docx",
    "txt",
    "rtf",
    "odt",
    "xls",
    "xlsx",
    "ppt",
    "pptx",
  ];
  if (extension && documentExtensions.includes(extension)) return "document";

  // Image types
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp"];
  if (extension && imageExtensions.includes(extension)) return "image";

  // Audio types
  const audioExtensions = ["mp3", "wav", "ogg", "m4a", "aac", "flac"];
  if (extension && audioExtensions.includes(extension)) return "audio";

  // Video types
  const videoExtensions = ["mp4", "avi", "mov", "wmv", "flv", "webm", "mkv"];
  if (extension && videoExtensions.includes(extension)) return "video";

  return "other";
}

// Get appropriate icon for file type
function getFileIcon(fileType: FileType) {
  const iconClassName = "size-5";

  switch (fileType) {
    case "document":
      return <FileText className={iconClassName} />;
    case "image":
      return <Image className={iconClassName} />;
    case "audio":
      return <Music className={iconClassName} />;
    case "video":
      return <Video className={iconClassName} />;
    default:
      return <File className={iconClassName} />;
  }
}

// Get background color for file icon
function getIconBackground(fileType: FileType): string {
  switch (fileType) {
    case "document":
      return "bg-blue-500/10 text-blue-600 dark:text-blue-400";
    case "image":
      return "bg-green-500/10 text-green-600 dark:text-green-400";
    case "audio":
      return "bg-purple-500/10 text-purple-600 dark:text-purple-400";
    case "video":
      return "bg-red-500/10 text-red-600 dark:text-red-400";
    default:
      return "bg-gray-500/10 text-gray-600 dark:text-gray-400";
  }
}

// Format file size to human-readable format
function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${Math.round((bytes / Math.pow(k, i)) * 100) / 100} ${sizes[i]}`;
}
