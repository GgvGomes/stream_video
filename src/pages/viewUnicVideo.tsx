import { Download, Rocket } from "lucide-react";
import { api } from "../utils/axios";
import { SelectVideos } from "../components/select_videos";
import { useState } from "react";

export default function ViewUnicVideo() {
  const [urlVideo, setUrlVideo] = useState<string>("");
  const sendToRocketChat = () =>
    api.post(`/SendVideotoRocketChat`, { file: urlVideo }).then((response) => {
      console.log(response);
    });

  return (
    <div className="w-full h-full flex flex-wrap justify-center align-top pt-10">
      <h1 className="text-7xl font-bold text-primary">View Video</h1>

      <div className="w-full px-[6%] py-10 h-[90%] ">
        <SelectVideos setUrlVideo={setUrlVideo} />

        <div className="w-full h-[86%] border-2 rounded-xl flex justify-center p-10">
          {urlVideo != "" && (
            <video
              // style={{
              //   transform: "rotate(180deg)",
              // }}
              dir="ltr"
              controls
              className="w-full h-full">
              <source
                src={urlVideo}
                type="video/mp4"
              />
            </video>
          )}
        </div>

        <div className="flex w-[99%] mt-3 justify-end gap-x-6">
          <a
            download
            target="_blank"
            href={urlVideo || ``}
            className={`${urlVideo === "" ? "cursor-not-allowed" : "cursor-pointer"}`}>
            <button
              disabled={urlVideo === ""}
              className="px-6 h-12 text-lg inline-flex items-center justify-center rounded-md  font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90">
              <Download size={20} className="mr-2" /> Baixar
            </button>
          </a>

          <button
            onClick={sendToRocketChat}
            disabled={urlVideo === ""}
            className="px-6 h-12 text-lg inline-flex items-center justify-center rounded-md  font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-green-500 text-primary-foreground shadow hover:bg-green-500/90">
            <Rocket size={20} className="mr-2" /> Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
