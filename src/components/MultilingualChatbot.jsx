import { useState, useRef } from "react";
import { CohereClientV2 } from "cohere-ai";
import './MultilingualChatbot.css';

const cohere = new CohereClientV2({
  token: "VITE_COHERE_API_KEY",
});

// Supported languages (add more as needed)
const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "Hindi" },
  { code: "mr", label: "Marathi" },
  { code: "ta", label: "Tamil" },
  { code: "bn", label: "Bengali" },
  { code: "te", label: "Telugu" },
  // Add more languages here
];

const MultilingualChatbot = () => {
  const [prompt, setPrompt] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [inputMode, setInputMode] = useState("text"); // "text" or "audio"
  const [language, setLanguage] = useState("en");
  const [recording, setRecording] = useState(false);
  const [audioInput, setAudioInput] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const systemMessage = {
    role: "system",
    content: `You are InspireBot, an AI assistant designed to empower rural entrepreneurs. 
              Provide practical, actionable, and culturally relevant advice to help users grow their businesses, 
              access government schemes, and connect with local marketplaces. 
              Respond in a friendly and supportive tone, ensuring clarity and simplicity for users of all backgrounds.
              Always reply in the user's selected language (${LANGUAGES.find(l => l.code === language)?.label || "English"}).`,
  };

  // Handle text or audio input submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputMode === "text" && prompt.trim()) {
      fetchCohereResponse(prompt, language);
      setPrompt("");
    } else if (inputMode === "audio" && audioInput) {
      handleAudioTranscription(audioInput, language);
      setAudioInput(null);
      audioChunksRef.current = [];
    }
  };

  // Fetch Cohere response and generate audio
  const fetchCohereResponse = async (userPrompt, lang) => {
    setLoading(true);
    try {
      const messages = [
        { ...systemMessage, content: systemMessage.content.replace(/\(\w+\)/, `(${LANGUAGES.find(l => l.code === lang)?.label || "English"})`) },
        ...conversation,
        { role: "user", content: userPrompt },
      ];

      const response = await cohere.chat({
        model: "command-r",
        messages: messages,
      });

      let result = response?.message?.content;
      if (Array.isArray(result)) {
        result = result.map((r) => (typeof r === "string" ? r : r.text)).join(" ");
      }
      result = result?.trim();

      // Optionally, translate result to selected language using your backend or a translation API
      // For now, assume Cohere responds in the correct language

      const points = result
        ? result.split(".").filter((point) => point.trim() !== "")
        : ["No response from InspireBot."];

      setConversation((prev) => [
        ...prev,
        { role: "user", content: userPrompt },
        { role: "system", content: points },
      ]);

      // Generate audio for the response
      if (result) {
        const audioResponse = await fetch("http://127.0.0.1:5000/generate-audio", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: result, language: lang }),
        });
        const audioData = await audioResponse.json();
        setAudioUrl(audioData.audio_url);
      } else {
        setAudioUrl(null);
      }
    } catch (error) {
      setConversation((prev) => [
        ...prev,
        { role: "user", content: prompt },
        {
          role: "system",
          content: ["Error: Unable to fetch a response. Please check your network or API key."],
        },
      ]);
      setAudioUrl(null);
    } finally {
      setLoading(false);
    }
  };

  // Handle audio transcription (send audio to backend for speech-to-text)
  const handleAudioTranscription = async (audioBlob, lang) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("audio", audioBlob, "input.wav");
      formData.append("language", lang);

      const response = await fetch("http://127.0.0.1:5000/transcribe-audio", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.text) {
        setPrompt(data.text);
        await fetchCohereResponse(data.text, lang);
      } else {
        setConversation((prev) => [
          ...prev,
          { role: "user", content: "[Audio input]" },
          {
            role: "system",
            content: ["Sorry, could not transcribe your audio."],
          },
        ]);
      }
    } catch (error) {
      setConversation((prev) => [
        ...prev,
        { role: "user", content: "[Audio input]" },
        {
          role: "system",
          content: ["Error: Unable to transcribe audio."],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Audio recording logic
  const startRecording = async () => {
    setRecording(true);
    audioChunksRef.current = []; // Clear previous audio
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new window.MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (e) => {
      audioChunksRef.current.push(e.data);
    };
    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
      setAudioInput(audioBlob);
      setRecording(false);
    };
    mediaRecorder.start();
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  };

  const handleClearHistory = () => {
    setConversation([]);
    setAudioUrl(null);
  };

  return (
    <>
      <div className="animated-bg"></div>
      <div className="min-vh-100" style={{zIndex: 1, position: "relative"}}>
        <div className="chatbot-main">
          <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            {/* <img
              src="https://i.ibb.co/6bQQP6r/robot-animated.gif" // replace with your own gif if you want
              alt="InspireBot"
              style={{
                width: 70,
                height: 70,
                borderRadius: "50%",
                marginBottom: 10,
                boxShadow: "0 4px 16px rgba(100,100,255,0.10)",
                border: "3px solid #e0eafc",
                background: "#fff"
              }}
            /> */}
            <div className="chatbot-title" style={{fontFamily: "'Poppins',sans-serif", letterSpacing: "2px"}}>
              InspireBot
            </div>
            <div className="chatbot-desc" style={{fontStyle: "italic", fontSize: "1.1rem"}}>
              Welcome to <b>InspireBot</b>, your calm AI companion for rural entrepreneurship.<br />
              <span style={{color: "#4f46e5"}}>Ask in your language, by text or voice!</span>
            </div>
          </div>

          {/* Language Selector & Input Mode */}
          <div className="selector-row">
            <div>
              <label htmlFor="language">Language:</label>
              <select
                id="language"
                value={language}
                onChange={e => setLanguage(e.target.value)}
                className="form-select"
              >
                {LANGUAGES.map(lang => (
                  <option key={lang.code} value={lang.code}>{lang.label}</option>
                ))}
              </select>
            </div>
            <div className="input-mode-btns">
              <button
                className={`btn btn-sm ${inputMode === "text" ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => setInputMode("text")}
                disabled={inputMode === "text"}
              >
                <span role="img" aria-label="Text">⌨️</span> Text
              </button>
              <button
                className={`btn btn-sm ${inputMode === "audio" ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => setInputMode("audio")}
                disabled={inputMode === "audio"}
              >
                <span role="img" aria-label="Audio">🎤</span> Audio
              </button>
            </div>
          </div>

          {/* Chat Conversation */}
          <div className="chat-area" style={{transition: "box-shadow 0.3s", animation: "fadeIn 0.8s"}}>
            {conversation.length > 0 &&
              conversation.map((entry, index) => (
                <div
                  key={index}
                  className={`chat-bubble-row ${entry.role}`}
                >
                  <div className={`chat-bubble ${entry.role} animated-bubble`}>
                    {Array.isArray(entry.content) ? (
                      <ul>
                        {entry.content.map((point, i) => (
                          <li key={i}>{point.trim()}</li>
                        ))}
                      </ul>
                    ) : (
                      <span>{entry.content}</span>
                    )}
                  </div>
                </div>
              ))}
            {loading && (
              <div className="d-flex justify-content-center mt-3">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
          </div>

          {/* Audio Output */}
          {audioUrl && (
            <div className="audio-player">
              <audio controls>
                <source src={audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}

          {/* Input Section */}
          <form
            onSubmit={handleSubmit}
            className="input-row"
          >
            {inputMode === "text" ? (
              <input
                type="text"
                placeholder={`Ask InspireBot your question in ${LANGUAGES.find(l => l.code === language)?.label || "English"}...`}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="form-control"
                required
              />
            ) : (
              <div className="d-flex align-items-center gap-2" style={{ flex: 1 }}>
                {!recording && (
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={startRecording}
                  >
                    <span role="img" aria-label="Record">🔴</span> Start Recording
                  </button>
                )}
                {recording && (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={stopRecording}
                  >
                    <span role="img" aria-label="Stop">⏹️</span> Stop
                  </button>
                )}
                {audioInput && (
                  <span className="text-success">Audio ready! Submit to transcribe.</span>
                )}
              </div>
            )}
            <button
              type="submit"
              disabled={loading || (inputMode === "audio" && !audioInput)}
              className="btn btn-outline-dark"
            >
              {loading ? "Loading.." : "Ask"}
            </button>
            {conversation.length > 0 && (
              <button
                type="button"
                onClick={handleClearHistory}
                className="btn btn-outline-danger"
              >
                Clear
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default MultilingualChatbot;
