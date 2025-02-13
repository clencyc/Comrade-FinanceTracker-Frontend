import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Send, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const TypewriterText = ({ text, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 20);
      return () => clearTimeout(timer);
    } else {
      onComplete?.();
    }
  }, [currentIndex, text, onComplete]);

  return <ReactMarkdown>{displayedText}</ReactMarkdown>;
};

TypewriterText.propTypes = {
  text: PropTypes.string.isRequired,
  onComplete: PropTypes.func
};

const ChatMessage = ({ message, isTyping }) => {
  const isBot = message.sender === 'bot';
  
  return (
    <div className={`flex w-full mb-4 ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div className={`max-w-[80%] rounded-2xl p-4 ${
        isBot 
          ? 'bg-gray-100 text-gray-800' 
          : 'bg-blue-600 text-white'
      }`}>
        <div className="font-medium mb-1">
          {isBot ? 'FinwiseAI: ' : 'User: '}
        </div>
        {isBot && isTyping ? (
          <TypewriterText text={message.text} />
        ) : (
          <ReactMarkdown className="prose prose-sm dark:prose-invert">
            {message.text}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
};

ChatMessage.propTypes = {
  message: PropTypes.shape({
    sender: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired,
  isTyping: PropTypes.bool
};

ChatMessage.defaultProps = {
  isTyping: false
};

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/chat/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setIsTyping(true);
        setMessages(prev => [...prev, { sender: 'bot', text: data.response }]);
      } else {
        setMessages(prev => [...prev, { sender: 'bot', text: 'Error fetching response.' }]);
      }
    } catch (_error) {
      setMessages(prev => [...prev, { sender: 'bot', text: 'Network error.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="ml-[300px] flex flex-col h-screen">
      <div className="p-4 border-b bg-white">
        <h1 className="text-2xl font-semibold text-gray-800">AI Chat Assistant</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-white">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <ChatMessage 
              key={index} 
              message={msg} 
              isTyping={isTyping && index === messages.length - 1 && msg.sender === 'bot'}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-t bg-white p-4">
        <div className="flex items-center gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows="1"
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="p-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;