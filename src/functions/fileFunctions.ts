export function blobToBase64(blob: Blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

export const videoConstraints: MediaTrackConstraints = {
  width: { min: 1800 },
  height: { min: 720 },
  aspectRatio: 0.6666666667,
  facingMode: "user",
  noiseSuppression: true,
  frameRate: { ideal: 60, max: 60 },
  autoGainControl: true,
};
