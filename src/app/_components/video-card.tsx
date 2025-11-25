import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import type { VideoModel } from '@/generated/prisma/models/Video';

type VideoCardProps = {
  video: VideoModel;
};

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

export function VideoCard({ video }: VideoCardProps) {
  return (
    <Link href={`/watch/${video.id}`} className="block">
      <Card className="cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02]">
        <CardHeader>
          <CardTitle>{video.title}</CardTitle>
          {video.description && (
            <CardDescription>{video.description}</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Duration: {formatDuration(video.duration)}
          </p>
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground">
          ID: {video.id}
        </CardFooter>
      </Card>
    </Link>
  );
}
