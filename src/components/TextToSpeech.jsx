import React, {
  useState,
  useEffect,
  useContext,
} from "react";

import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext";
import { Helmet } from "react-helmet-async";



const TextToSpeech = () => {
  
  const [text, setText] = useState("");
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] =
    useState("");
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [isSpeaking, setIsSpeaking] =
    useState(false);

  const {
    user,
    incrementGuestUsage,
  } = useContext(AppContext);

  useEffect(() => {
    const loadVoices = () => {
      const allVoices =
        speechSynthesis.getVoices();

      setVoices(allVoices);

      if (
        allVoices.length > 0 &&
        !selectedVoice
      ) {
        setSelectedVoice(
          allVoices[0].name
        );
      }
    };

    loadVoices();

    speechSynthesis.onvoiceschanged =
      loadVoices;

    return () => {
      
      speechSynthesis.cancel();
    };
  }, [selectedVoice]);

  const handleSpeak = () => {
    if (!text.trim()) {
      toast.error(
        "Please enter some text"
      );
      return;
    }

    // Guest Usage Count
    if (!user) {
      incrementGuestUsage();
    }

    speechSynthesis.cancel();

    const utterance =
      new SpeechSynthesisUtterance(
        text
      );

    const voice = voices.find(
      (v) =>
        v.name === selectedVoice
    );

    if (voice) {
      utterance.voice = voice;
    }

    utterance.rate = rate;
    utterance.pitch = pitch;

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      toast.error("Speech failed");
    };

    speechSynthesis.speak(
      utterance
    );

    toast.success("Speaking...");
  };

  const handleStop = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-slate-900 rounded-xl">
      <Helmet>
  <title>Online Text to Speech Converter | ToolGrid</title>
  <meta name="description" content="Convert your text to natural-sounding speech instantly. Our free online text-to-speech tool is perfect for accessibility, reading aloud, and content creation." />
</Helmet>

      <h2 className="text-2xl font-bold mb-4 text-amber-400">
        Text To Speech
      </h2>

      <textarea
        value={text}
        onChange={(e) =>
          setText(e.target.value)
        }
        placeholder="Enter text..."
        className="w-full h-40 p-4 rounded bg-slate-800 text-white"
      />

      <div className="grid md:grid-cols-2 gap-4 mt-4">

        <div>
          <label className="block mb-2">
            Voice
          </label>

          <select
            value={selectedVoice}
            onChange={(e) =>
              setSelectedVoice(
                e.target.value
              )
            }
            className="w-full p-3 rounded bg-slate-800"
          >
            {voices.map(
              (voice, index) => (
                <option
                  key={index}
                  value={voice.name}
                >
                  {voice.name} (
                  {voice.lang})
                </option>
              )
            )}
          </select>
        </div>

        <div>
          <label className="block mb-2">
            Speed ({rate}x)
          </label>

          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={rate}
            onChange={(e) =>
              setRate(
                Number(
                  e.target.value
                )
              )
            }
            className="w-full"
          />
        </div>

        <div>
          <label className="block mb-2">
            Pitch ({pitch})
          </label>

          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={pitch}
            onChange={(e) =>
              setPitch(
                Number(
                  e.target.value
                )
              )
            }
            className="w-full"
          />
        </div>

      </div>

      <div className="flex gap-3 mt-6">

        <button
          onClick={handleSpeak}
          disabled={isSpeaking}
          className="px-6 py-3 bg-amber-500 rounded font-bold text-black"
        >
          Speak
        </button>

        <button
          onClick={handleStop}
          className="px-6 py-3 bg-red-500 rounded font-bold"
        >
          Stop
        </button>

      </div>

    </div>
  );
};

export default TextToSpeech;