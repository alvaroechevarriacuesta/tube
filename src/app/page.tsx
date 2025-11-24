import { listVideos } from "@/services/db/videos/list";
import { VideoCard } from "./_components/video-card";

export default async function Home() {
  const videos = await listVideos();

  return (
    <div className="min-h-screen">
      <div className="h-full min-h-screen max-w-5xl mx-auto flex flex-col p-4">
        <h1 className="text-2xl font-bold">Videos</h1>
        <div className="flex items-center gap-2">
          
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {videos.length > 0 ? (
            videos.map((video) => <VideoCard key={video.id} video={video} />)
          ) : (
            <p className="text-muted-foreground">No videos found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
