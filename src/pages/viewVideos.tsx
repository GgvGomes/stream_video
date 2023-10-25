import { useEffect, useState } from "react";
import { CardVideo } from "../components/cardVideo";
import { Video } from "../types/videos";
import { api } from "../utils/axios";

export function ViewVideos() {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    api.get<Video[]>("/GetVideos").then((response) => {
      setVideos(response.data);
    });
  });

  return (
    <div className="w-full h-full flex flex-wrap justify-center align-top pt-10">
      <h1 className="text-7xl font-bold text-primary">View All Videos</h1>

      <div className="w-full px-[6%] py-10 h-[90%] ">
        <div className="container-videos w-full h-full border-2 rounded-xl flex flex-wrap justify-center align-top gap-y-2 gap-x-[1.5%] p-10 overflow-y-auto overflow-x-hidden">
          {/* Card videos */}
          {videos.map((video) => (
            <>
              <CardVideo key={video.id} {...video} />
              <CardVideo key={video.id} {...video} />
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
