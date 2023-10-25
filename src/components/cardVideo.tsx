import moment from "moment";
import { Video } from "../types/videos";

export function CardVideo({ date, id, video }: Video) {
  return (
    <div className="p-4 h-72 w-[22%] cursor-pointer group">
      <a
        href={video}
        download={"video_" + moment(date).format("DD/MM/YYYY HH:MM") + ".mp4"}
        className="border-2 p-1 w-full h-[90%] flex border-foreground/20 rounded-xl overflow-hidden transition-all opacity-75 hover:opacity-100 relative">
        <video
          src={video}
          controls={false}
          className="w-full h-full pointer-events-none absolute inset-0 transition-all "
        />
      </a>

      <div className="w-full flex justify-between pt-2 text-muted-foreground transition-all group-hover:text-foreground px-1">
        <span className="text-sm font-semibold">Id: {id}</span>
        <span className="text-sm font-semibold">
          Data: {moment(date).format("DD/MM/YYYY HH:MM")}
        </span>
      </div>
    </div>
  );
}
