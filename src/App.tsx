import axios from "axios";
import {
  LucideArrowDownRightSquare,
  Download,
  CircleDot,
  Trash,
  StopCircleIcon,
  Upload,
  Rocket,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

function App() {
  const videoConstraints: MediaTrackConstraints = {
    width: { min: 1800 },
    height: { min: 720 },
    aspectRatio: 0.6666666667,
    facingMode: "user",
    noiseSuppression: true,
    frameRate: { ideal: 60, max: 60 },
    autoGainControl: true,
  };

  const [permission, setPermission] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const mimeType = "video/webm;codecs=vp9,opus";
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");

  const [videoChunks, setVideoChunks] = useState<Blob[]>([]);
  const [recordedVideo, setRecordedVideo] = useState<string | null>(null);
  const [video64, setVideo64] = useState<string | null>(null);

  const getMicrophoneAndAudioPermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const videoStream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: true,
        });

        setPermission(true);
        //combine both audio and video streams
        const combinedStream = new MediaStream([
          ...videoStream.getVideoTracks(),
          ...audioStream.getAudioTracks(),
        ]);
        setStream(combinedStream);

        setPermission(true);
      } catch (err) {
        alert(err);
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };

  useEffect(() => {
    getMicrophoneAndAudioPermission();
  }, []);

  const startRecording = async () => {
    setRecordingStatus("recording");

    //create new Media recorder instance using the stream
    if (stream === null) return;

    const media = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 180000 });
    // mediaRecorder.current?.stream.
    mediaRecorder.current = media;
    mediaRecorder.current.start();

    let localVideoChunks: Blob[] = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localVideoChunks.push(event.data);
    };
    setVideoChunks(localVideoChunks);
  };

  function blobToBase64(blob: Blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  const stopRecording = () => {
    setRecordingStatus("inactive");

    if (mediaRecorder.current === null) return;

    //stops the recording instance
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = async () => {
      const videoBlob = new Blob(videoChunks, { type: mimeType });
      const videoUrl = URL.createObjectURL(videoBlob);

      const base64 = await blobToBase64(videoBlob);
      setVideo64(base64 as string);

      setRecordedVideo(videoUrl);
      setVideoChunks([]);
    };
  };

  const api = axios.create({
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Accept: "*/*",
    },
  });

  const postVideo = () => {
    api
      .post(import.meta.env.VITE_DB_URL_LOCAL + "Video/UploadVideo", {
        file: video64,
      })
      .then((response) => {
        console.log(response);
      });
  };

  const sendToRocketChat = () => {

  }

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
            download={true}
            screenshotFormat={"image/jpeg"}
            videoConstraints={videoConstraints}
          />
        </div>

        <div className="flex w-[67%] justify-end gap-x-6">
          <button
            disabled={true}
            className="mr-auto text-muted-foreground/80 px-6 h-12 text-lg inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border-2 shadow 
          hover:bg-red-500/80 hover:text-zinc-300">
            <Trash size={20} className="mr-2" /> Descartar
          </button>

          {!permission && (
            <button
              className="px-6 h-12 text-lg inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-primary border-2 border-primary shadow hover:bg-primary/90 hover:text-zinc-300"
              onClick={getMicrophoneAndAudioPermission}>
              <LucideArrowDownRightSquare size={20} className="mr-2" /> Ativar Permissões
            </button>
          )}

          <button
            className="ml-auto text-red-500/60 border-red-500/60 px-6 h-12 text-lg inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border-2 shadow 
          hover:bg-red-500/80 hover:text-zinc-300"
            onClick={() => {
              recordingStatus === "inactive" ? startRecording() : stopRecording();
            }}>
            {recordingStatus === "inactive" ? (
              <>
                <CircleDot size={20} className="mr-2" /> Rec
              </>
            ) : (
              <>
                <StopCircleIcon size={20} className="mr-2" /> Stop
              </>
            )}
          </button>

          <a
            download
            target="_blank"
            href={recordedVideo || ``}
            className={`${
              recordingStatus === "inactive" ? "cursor-not-allowed" : "cursor-pointer"
            }`}>
            <button
              disabled={recordedVideo === null && recordingStatus === "inactive"}
              className="px-6 h-12 text-lg inline-flex items-center justify-center rounded-md  font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90">
              <Download size={20} className="mr-2" /> Baixar
            </button>
          </a>
          <button
            onClick={postVideo}
            disabled={recordedVideo === null && recordingStatus === "inactive"}
            className="px-6 h-12 text-lg inline-flex items-center justify-center rounded-md  font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90">
            <Upload size={20} className="mr-2" /> Salvar
          </button>
          <button
            onClick={sendToRocketChat}
            disabled={recordedVideo === null && recordingStatus === "inactive"}
            className="px-6 h-12 text-lg inline-flex items-center justify-center rounded-md  font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-green-500 text-primary-foreground shadow hover:bg-primary/90">
            <Rocket size={20} className="mr-2" /> Enviar 
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
