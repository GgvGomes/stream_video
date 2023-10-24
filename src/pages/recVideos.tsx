import { useState } from "react";
import { Download, Upload, Rocket } from "lucide-react";

import Webcam from "react-webcam";
import { PermissionButton } from "../components/buttons/permission";
import { videoConstraints } from "../functions/fileFunctions";
import { api } from "../utils/axios";
import { RecButton } from "../components/buttons/rec";

export function RecVideos() {
  const [stream, setStream] = useState<MediaStream | null>(null);

  const { RecButtonComponent, recordingStatus, urlVideo, video64 } = RecButton({
    stream,
  });

  const postVideo = () =>
    api.post("/UploadVideo", { file: video64 }).then((response) => {
      console.log(response);
    });

  const sendToRocketChat = () =>
    api.post(`/SendVideotoRocketChat`, { file: video64 }).then((response) => {
      console.log(response);
    });

  return (
    <div className="w-full h-full flex flex-wrap justify-center align-top pt-20">
      <h1 className="text-7xl font-bold text-primary">Vídeo Stream Conversor</h1>

      <div className="w-full h-[82%] flex flex-wrap content-start justify-center">
        <div className="h-[80%] w-[68%] border-2 border-muted-foreground rounded-md mb-6 mt-2">
          <Webcam
            width={1080}
            className="w-full h-full"
            audio={false}
            // audio={true}
            screenshotFormat={"image/jpeg"}
            videoConstraints={videoConstraints}
          />
        </div>

        <div className="flex w-[67%] justify-end gap-x-6">
          {/* <button
            onClick={resetStates}
            disabled={true}
            className="mr-auto text-muted-foreground/80 px-6 h-12 text-lg inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border-2 shadow 
          hover:bg-red-500/80 hover:text-zinc-300">
            <Trash size={20} className="mr-2" /> Descartar
          </button> */}

          <PermissionButton setStream={setStream} />

          <RecButtonComponent />

          <a
            download
            target="_blank"
            href={urlVideo || ``}
            className={`${
              recordingStatus === "inactive" ? "cursor-not-allowed" : "cursor-pointer"
            }`}>
            <button
              disabled={urlVideo === null && recordingStatus === "inactive"}
              className="px-6 h-12 text-lg inline-flex items-center justify-center rounded-md  font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90">
              <Download size={20} className="mr-2" /> Baixar
            </button>
          </a>

          <button
            onClick={postVideo}
            disabled={urlVideo === null && recordingStatus === "inactive"}
            className="px-6 h-12 text-lg inline-flex items-center justify-center rounded-md  font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90">
            <Upload size={20} className="mr-2" /> Salvar
          </button>

          <button
            onClick={sendToRocketChat}
            // disabled={recordedVideo === null && recordingStatus === "inactive"}
            className="px-6 h-12 text-lg inline-flex items-center justify-center rounded-md  font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-green-500 text-primary-foreground shadow hover:bg-green-500/90">
            <Rocket size={20} className="mr-2" /> Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
