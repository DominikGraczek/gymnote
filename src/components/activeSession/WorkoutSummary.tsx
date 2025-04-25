import { useNavigate } from "react-router";
import { useState, useRef } from "react";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { Session } from "../../models/session";

interface WorkoutSummaryProps {
  startTime: number;
  endTime?: number;
  logs: Record<string, { reps: number; weight: number }[]>;
  sessionId: string;
  note: string;
  photoUrl?: string;
  setNote: (note: string) => void;
  setPhotoUrl: (photoUrl: string) => void;
  userUid: string;
  routineId: string;
  saveSession: (session: Session) => void;
}

export const WorkoutSummary = ({
  startTime,
  endTime,
  logs,
  sessionId,
  note,
  photoUrl,
  setNote,
  setPhotoUrl,
  userUid,
  routineId,
  saveSession,
}: WorkoutSummaryProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const elapsed = endTime ? Math.floor((endTime - startTime) / 1000) : Math.floor((Date.now() - startTime) / 1000);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  const calculateCalories = () => {
    let total = 0;
    Object.values(logs).forEach((sets) => {
      sets.forEach(({ reps, weight }) => {
        total += (reps * weight) / 2;
      });
    });
    return total.toFixed(1);
  };

  const handlePhotoUpload = async (file: File) => {
    if (!file) return null;

    setIsUploading(true);
    try {
      const storageRef = ref(storage, `workout-photos/${sessionId}/${uuidv4()}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setPhotoUrl(downloadURL);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading photo:", error);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPhotoPreview(previewUrl);

      await handlePhotoUpload(file);
    }
  };

  const handleSubmit = async () => {
    setIsSaving(true);

    const uploadedPhotoUrl = photoPreview
      ? photoPreview
      : photoUrl;

    const sessionData = {
      id: sessionId,
      uid: userUid,
      routineId,
      startedAt: new Date(startTime).toISOString(),
      endedAt: new Date().toISOString(),
      exercisesDone: Object.entries(logs).flatMap(([name, sets]) => sets.map((s) => ({ name, sets: s }))),
      note: note || "",
      photoUrl: uploadedPhotoUrl || "",
    };

    try {
      await saveSession(sessionData);
      navigate("/");
    } catch (err) {
      console.error("Error saving session", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <div className="bg-purple-600 text-white rounded-xl p-4 mt-6 text-center">
        <h2 className="text-xl font-bold mb-2">Workout Summary</h2>
        <p className="mb-1">⏱ Duration: {formatTime(elapsed)}</p>
        <p>🔥 Calories Burned: {calculateCalories()} kcal</p>
      </div>

      <div className="mt-4">
        <label
          htmlFor="photoInput"
          className={`block text-center text-black bg-purple-400 rounded-lg p-4 cursor-pointer ${
            isUploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isUploading ? "📷 Uploading..." : "📷 Tap to take a photo"}
        </label>

        <input
          ref={fileInputRef}
          id="photoInput"
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleFileChange}
          disabled={isUploading}
        />

        {photoPreview && (
          <div className="mt-4">
            <img src={photoPreview} alt="Workout preview" className="w-full h-64 object-cover rounded-lg" />
          </div>
        )}
      </div>

      <textarea
        className="text-black border-1 rounded-xl w-full p-2 mt-4 pb-10"
        placeholder="Leave a note about workout"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <div className="flex gap-4 mt-4">
        <button
          className="text-black flex-1 font-bold bg-gray-300 px-4 py-2 rounded-full"
          onClick={() => navigate("/")}
          disabled={isSaving}
        >
          Cancel
        </button>
        <button
          className="text-white flex-1 font-bold bg-purple-600 px-4 py-2 rounded-full"
          onClick={handleSubmit}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save Workout"}
        </button>
      </div>
    </div>
  );
};
