import { notFound } from 'next/navigation';
import { getVideo } from '@/services/db/videos/get';
import { VideoPlayer } from './_components/video-player';

type WatchPageProps = {
  params: Promise<{ id: string }>;
};

export default async function WatchPage({ params }: WatchPageProps) {
  const { id } = await params;
  const video = await getVideo(id);

  if (!video) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{video.title}</h1>
          {video.description && (
            <p className="text-muted-foreground">{video.description}</p>
          )}
        </div>
        <VideoPlayer id={id} video={video} />
      </div>
    </div>
  );
}
