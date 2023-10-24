import { useRef, useState } from "react";
import { blobToBase64 } from "../../functions/fileFunctions";

import { CircleDot, StopCircleIcon } from "lucide-react";

interface RecButtonProps {
  stream: MediaStream | null;
}

export function RecButton({ stream }: RecButtonProps) {
  const mimeType = "video/webm;codecs=vp9,opus";
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");

  const [videoChunks, setVideoChunks] = useState<Blob[]>([]);
  const [urlVideo, setUrlVideo] = useState<string | null>(null);
  const [video64, setVideo64] = useState<string | null>(null);

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

      setUrlVideo(videoUrl);
      setVideoChunks([]);
    };
  };

  const RecButtonComponent = () => (
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
  );

  return { RecButtonComponent, recordingStatus, urlVideo, video64 };
}
