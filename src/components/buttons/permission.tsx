import { useState, useEffect } from "react";
import { LucideArrowDownRightSquare } from "lucide-react";

interface PermissionButtonProps {
  setStream: React.Dispatch<React.SetStateAction<MediaStream | null>>;
}

export function PermissionButton({ setStream }: PermissionButtonProps) {
  const [permission, setPermission] = useState(false);

  useEffect(() => {
    getMicrophoneAndAudioPermission();
  }, []);

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

  return (
    !permission && (
      <button
        className="px-6 h-12 text-lg inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-primary border-2 border-primary shadow hover:bg-primary/90 hover:text-zinc-300"
        onClick={getMicrophoneAndAudioPermission}>
        <LucideArrowDownRightSquare size={20} className="mr-2" /> Ativar Permissões
      </button>
    )
  );
}
