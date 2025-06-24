import React, { useState, useEffect, useRef } from 'react';
import { Message, ChatState } from '../types';
import { saveChatState, loadChatState } from '../utils/storage';
import { analyzeUserIntent, getHardcodedResponse } from '../utils/groqClient';

const ChatWidget: React.FC = () => {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isMinimized: false,
    isVisible: false
  });
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    loadInitialState();
    setupSpeechRecognition();
  }, []);

  useEffect(() => {
    if (chatState.messages.length > 0) {
      saveChatState(chatState);
    }
  }, [chatState]);

  useEffect(() => {
    scrollToBottom();
  }, [chatState.messages]);

  const loadInitialState = async () => {
    const state = await loadChatState();
    setChatState(state);
  };

  const setupSpeechRecognition = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognitionConstructor =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognitionConstructor();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addMessage = (text: string, isUser: boolean) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser,
      timestamp: Date.now()
    };
    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage]
    }));
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;
    const userMessage = inputText.trim();
    addMessage(userMessage, true);
    setInputText('');

    if (
      userMessage.toLowerCase().includes('yes') ||
      userMessage.toLowerCase() === 'y'
    ) {
      const lastBot = chatState.messages.filter(m => !m.isUser).pop();
      const urlMatch = lastBot?.text.match(/https:\/\/[^\s]+/);
      if (urlMatch) {
        window.open(urlMatch[0], '_blank');
        addMessage('Opening the page for you!', false);
        return;
      }
    }

    try {
      const intent = await analyzeUserIntent(userMessage);
      const response = await getHardcodedResponse(intent);
      const botResponse = `${response.steps.join('\n')}

You can access this at: ${response.url}

Would you like me to navigate you to this page directly?`;
      setTimeout(() => addMessage(botResponse, false), 500);
    } catch {
      setTimeout(
        () => addMessage('I apologize, but I encountered an error. Please try again.', false),
        500
      );
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      try {
        recognitionRef.current.start();
      } catch {
        setIsListening(false);
      }
    }
  };

  const toggleMinimize = () => {
    setChatState(prev => ({ ...prev, isMinimized: !prev.isMinimized }));
  };

  const closeChatbot = () => {
    setChatState(prev => ({ ...prev, isVisible: false }));
  };

  const openChatbot = () => {
    setChatState(prev => ({ ...prev, isVisible: true, isMinimized: false }));
  };

  if (!chatState.isVisible) {
    return (
      <div
        onClick={openChatbot}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '50px',
          height: '50px',
          backgroundColor: '#007bff',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 10000,
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          color: 'white',
          fontSize: '20px'
        }}
      >
        💬
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '300px',
        height: chatState.isMinimized ? '40px' : '400px',
        backgroundColor: 'white',
        border: '1px solid #ddd',
        borderRadius: '8px',
        zIndex: 10000,
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Arial, sans-serif'
      }}
    >
      <div
        style={{
          padding: '8px 12px',
          backgroundColor: '#007bff',
          color: 'white',
          borderRadius: '8px 8px 0 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '14px',
          fontWeight: 'bold'
        }}
      >
        <span>Chatbot</span>
        <div>
          <button
            onClick={toggleMinimize}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              marginRight: '8px',
              fontSize: '16px'
            }}
          >
            {chatState.isMinimized ? '□' : '_'}
          </button>
          <button
            onClick={closeChatbot}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            ×
          </button>
        </div>
      </div>

      {!chatState.isMinimized && (
        <>
          <div
            style={{
              flex: 1,
              padding: '10px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}
          >
            {chatState.messages.map(message => (
              <div
                key={message.id}
                style={{
                  alignSelf: message.isUser ? 'flex-end' : 'flex-start',
                  backgroundColor: message.isUser ? '#007bff' : '#f1f1f1',
                  color: message.isUser ? 'white' : 'black',
                  padding: '6px 10px',
                  borderRadius: '12px',
                  maxWidth: '80%',
                  fontSize: '12px',
                  whiteSpace: 'pre-line'
                }}
              >
                {message.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div
            style={{
              padding: '10px',
              borderTop: '1px solid #eee',
              display: 'flex',
              gap: '6px',
              alignItems: 'center'
            }}
          >
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              style={{
                flex: 1,
                padding: '6px 8px',
                border: '1px solid #ddd',
                borderRadius: '16px',
                outline: 'none',
                fontSize: '12px'
              }}
            />
            <button
              onClick={startListening}
              disabled={isListening}
              style={{
                background: isListening ? '#ff6b6b' : '#28a745',
                border: 'none',
                color: 'white',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              🎤
            </button>
            <button
              onClick={handleSendMessage}
              style={{
                background: '#007bff',
                border: 'none',
                color: 'white',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              ▶
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatWidget;