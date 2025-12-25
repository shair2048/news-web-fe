// hooks/use-voice-search.ts
import envConfig from "@/env.config";
import { useState, useRef, useCallback } from "react";

interface Article {
  _id: object;
  title: string;
  description: string;
  imageUrl: string;
  publishedAt: string;
  category: {
    _id: object;
    name: string;
    slug: string;
  };
}

export interface SearchByVoiceResponse {
  success: boolean;
  voice_interpreted: {
    raw_keywords: string;
    intent: string | null;
  };
  keyword: string | null;
  data?: Article[];
  currentPage?: number;
  totalPages?: number;
}

export function useVoiceSearch(maxDuration: number = 5000) {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  //   useEffect(() => {
  //     return () => {
  //       if (timeoutRef.current) clearTimeout(timeoutRef.current);
  //     };
  //   }, []);

  const startRecording = useCallback(
    (onResult: (data: SearchByVoiceResponse | null) => void) => {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          mediaRecorderRef.current = new MediaRecorder(stream);
          chunksRef.current = [];

          mediaRecorderRef.current.ondataavailable = (e) => {
            if (e.data.size > 0) chunksRef.current.push(e.data);
          };

          mediaRecorderRef.current.onstop = async () => {
            const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });

            stream.getTracks().forEach((track) => track.stop());
            setIsRecording(false);
            setIsProcessing(true);

            try {
              const formData = new FormData();
              formData.append("audio", audioBlob);

              const response = await fetch(
                `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/search/voice`,
                {
                  method: "POST",
                  body: formData,
                }
              );

              const data = await response.json();
              onResult(data);
            } catch (error) {
              console.error("Voice search error:", error);
              onResult(null);
            } finally {
              setIsProcessing(false);
            }
          };

          mediaRecorderRef.current.start();
          setIsRecording(true);

          // 4. Đặt hẹn giờ tự động tắt
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => {
            if (
              mediaRecorderRef.current &&
              mediaRecorderRef.current.state === "recording"
            ) {
              mediaRecorderRef.current.stop(); // auto stop
            }
          }, maxDuration);
        })
        .catch((error) => {
          console.error("Error accessing microphone:", error);
          alert("Vui lòng cấp quyền microphone.");
        });
    },
    [maxDuration]
  );

  const stopRecording = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    }
  }, []);

  return { isRecording, isProcessing, startRecording, stopRecording };
}
