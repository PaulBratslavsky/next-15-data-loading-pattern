import { cn } from "../../lib/utils";

interface SpinnerProps {
  height?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Spinner({ height = "full", size = "md", className }: SpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-4",
    lg: "w-12 h-12 border-4",
  };

  return (
    <div className={cn("flex items-center justify-center w-full bg-gray-50", className)} style={{ height }}>
      <div className={cn(
        "border-gray-200 border-t-blue-500 rounded-full animate-spin",
        sizeClasses[size]
      )}></div>
    </div>
  );
} 