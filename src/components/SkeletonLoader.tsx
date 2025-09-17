import { Skeleton } from '@/components/ui/skeleton';
import { theme } from '@/lib/theme';

interface SkeletonLoaderProps {
  count?: number;
}

export default function SkeletonLoader({ count = 3 }: SkeletonLoaderProps) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton
          key={index}
          className="h-12 w-full"
          style={{ backgroundColor: theme.colors.accent_blue }}
        />
      ))}
    </div>
  );
}