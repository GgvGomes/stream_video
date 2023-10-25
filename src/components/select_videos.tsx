import { useEffect, useState } from "react";
import { Video } from "../types/videos";
import { api } from "../utils/axios";
import moment from "moment";

interface SelectVideosProps {
  setUrlVideo: React.Dispatch<React.SetStateAction<string>>;
}

export function SelectVideos({ setUrlVideo }: SelectVideosProps) {
  const [videosInfos, setVideosInfos] = useState<Video[]>([]);

  useEffect(() => {
    api.get("/GetVideos").then((response) => {
      setVideosInfos(response.data);
    });
  }, []);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    if (value === "") setUrlVideo("");
    else setUrlVideo(videosInfos.filter((item) => item.id.toString() == value)[0].video);
  };

  return (
    <>
      <div
        id="grid_input"
        className="flex h-12 mb-4 w-full py-1 items-center justify-between rounded-md border border-input bg-transparent  text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 relative">
        <input
          onChange={handleInputChange}
          list="list"
          className="px-2 bg-transparent w-[99%] ml-[0.5%] h-full  text-lg placeholder-muted-foreground focus:outline-none border-2 border-muted-foreground/30 rounded-md"
        />

        <datalist id="list">
          {videosInfos.map((video) => (
            <option value={video.id} key={video.id}>
              {moment(video.data_criado).format("DD/MM/YYYY HH:MM")}
            </option>
          ))}
        </datalist>
      </div>
    </>
  );
}
