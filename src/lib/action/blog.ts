// firebaseUtils.ts
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";

export const handleUpload = (
  video: File,
  onProgress: (progress: number) => void,
  onComplete: (message: string) => void,
  onError: (error: string) => void
): Promise<string> => {
  const db = getFirestore();
  const storage = getStorage();

  if (!video) {
    onError("Please provide a video file.");
    return Promise.reject("No video file provided.");
  }

  return new Promise((resolve, reject) => {
    try {
      const videoRef = ref(storage, `videos/${video.name}`);
      const uploadTask = uploadBytesResumable(videoRef, video);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onProgress(progress);
        },
        (error) => {
          const errorMessage = `Error: ${error.message}`;
          onError(errorMessage);
          reject(errorMessage);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            onComplete("Video uploaded successfully!");
            resolve(downloadURL); // Resolve with the download URL
          } catch (error) {
            const errorMessage = `Error retrieving download URL: ${error.message}`;
            onError(errorMessage);
            reject(errorMessage);
          }
        }
      );
    } catch (error) {
      const errorMessage = `Unexpected error: ${error.message}`;
      onError(errorMessage);
      reject(errorMessage);
    }
  });
};
