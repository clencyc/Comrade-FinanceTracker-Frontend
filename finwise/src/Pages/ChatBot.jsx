import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessages([
          ...messages,
          userMessage,
          { sender: "bot", text: data.response },
        ]);
      } else {
        setMessages([
          ...messages,
          userMessage,
          { sender: "bot", text: "Error fetching response." },
        ]);
      }
    } catch (error) {
      setMessages([
        ...messages,
        userMessage,
        { sender: "bot", text: "Network error." },
      ]);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl ml-[300px] mt-10 p-4 border rounded-lg shadow-lg bg-white h-[80vh] flex flex-col">
      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-2 border-b">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`my-2 p-2 rounded-lg ${
              msg.sender === "user"
                ? "bg-blue-500 text-white self-end"
                : "bg-gray-200 text-black self-start"
            }`}
          >
            {msg.sender === "bot" ? (
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            ) : (
              msg.text
            )}
          </div>
        ))}
        {loading && <p className="text-gray-500">Bot is typing...</p>}
      </div>

      {/* Input Area */}
      <div className="flex mt-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border rounded-l-lg"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white p-2 rounded-r-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}
