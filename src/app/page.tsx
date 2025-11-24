import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="h-full min-h-screen max-w-5xl mx-auto flex flex-col p-4">
        <h1 className="text-2xl font-bold">Videos</h1>
        <div className="flex items-center gap-2">
          
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Card className="bg-blue-100 min-h-[200px]">
            <div className="p-4">
              <p>Card 1</p>
            </div>
          </Card>
          <Card className="bg-green-100 min-h-[200px]">
            <div className="p-4">
              <p>Card 2</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
