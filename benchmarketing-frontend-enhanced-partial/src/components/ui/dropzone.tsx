
import * as React from "react";
import { useCallback } from "react";
import { useDropzone, FileRejection, Accept } from "react-dropzone";
import { cn } from "@/lib/utils";
import { X, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface DropzoneProps extends React.HTMLAttributes<HTMLDivElement> {
  value: File[];
  onAddFiles: (acceptedFiles: File[]) => void;
  onRemoveFile: (file: File) => void;
  accept?: Accept;
  maxFiles?: number;
  maxSize?: number;
  disabled?: boolean;
}

export function Dropzone({
  value,
  onAddFiles,
  onRemoveFile,
  accept,
  maxFiles = 1,
  maxSize = 5 * 1024 * 1024, // 5MB
  disabled = false,
  className,
  ...props
}: DropzoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (rejectedFiles && rejectedFiles.length > 0) {
        const fileRejectionErrors = rejectedFiles.map(
          (fileRejection) => fileRejection.errors[0].message
        );
        console.error("File rejection errors:", fileRejectionErrors);
        return;
      }

      onAddFiles(acceptedFiles);
    },
    [onAddFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    maxSize,
    disabled,
  });

  return (
    <div {...props} className={cn("space-y-4", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-primary/50",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-1">
          <Upload className="h-8 w-8 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">
            {isDragActive
              ? "Drop the files here..."
              : "Drag & drop files here, or click to select files"}
          </p>
          <p className="text-xs text-muted-foreground/75">
            Supports CSV files up to 5MB
          </p>
        </div>
      </div>

      {value && value.length > 0 && (
        <div className="grid gap-2">
          {value.map((file) => (
            <div
              key={`${file.name}-${file.size}`}
              className="flex items-center justify-between bg-muted p-3 rounded-md"
            >
              <div className="flex items-center gap-2 truncate">
                <Upload className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm truncate">{file.name}</span>
                <span className="text-xs text-muted-foreground">
                  {(file.size / 1024).toFixed(0)} KB
                </span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onRemoveFile(file)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove file</span>
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
