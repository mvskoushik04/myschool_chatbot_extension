import React, { useState, useEffect, useRef } from 'react';
import { Message, ChatState } from '../types';
import { saveChatState, loadChatState, clearChatState } from '../utils/storage';
import { analyzeUserIntent, getHardcodedResponse } from '../utils/groqClient';

<style>{`@keyframes floatIn { from { transform: translateY(20px); opacity: 0.5; } to { transform: translateY(0); opacity: 1; } }`}</style>

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
  const [pendingUrl, setPendingUrl] = useState<string | null>(null);
  const [showOptions, setShowOptions] = useState(false);

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

    try {
      const intent = await analyzeUserIntent(userMessage);
      const response = await getHardcodedResponse(intent);
      const botResponse = `${response.steps.join('\n')}`;
      setTimeout(() => {
        addMessage(botResponse, false);
        if (response.url) {
          setPendingUrl(response.url);
          setShowOptions(true);
        } else {
          setPendingUrl(null);
          setShowOptions(false);
        }
      }, 500);
    } catch {
      setTimeout(
        () => addMessage('I apologize, but I encountered an error. Please try again.', false),
        500
      );
      setPendingUrl(null);
      setShowOptions(false);
    }
  };

  const handleOption = (option: 'yes' | 'no') => {
    if (option === 'yes' && pendingUrl) {
      window.open(pendingUrl, '_blank');
    }
    setShowOptions(false);
    setPendingUrl(null);
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

  const closeChatbot = async () => {
    await clearChatState();
    setChatState(prev => ({ ...prev, isVisible: false, messages: [] }));
  };

  const openChatbot = async () => {
    await loadInitialState();
    setChatState(prev => ({ ...prev, isVisible: true, isMinimized: false }));
  };

  if (!chatState.isVisible) {
    return (
      <div
        onClick={() => openChatbot()}
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
          fontSize: '25px'
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
              fontSize: '20px'
            }}
          >
            {chatState.isMinimized ? '□' : '-'}
          </button>
          <button
            onClick={closeChatbot}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              fontSize: '18px'
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
              gap: '8px',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            <style>
              {`
                div[style*="overflow-y: auto"]::-webkit-scrollbar {
                  display: none;
                }
              `}
            </style>
            {chatState.messages.map((message, idx) => {
              // Detect if this is a bot message with steps (lines starting with •)
              const isBotSteps =
                !message.isUser &&
                message.text.split('\n').every(line => line.trim().startsWith('•'));
              return (
                <div
                  key={message.id}
                  style={{
                    display: 'flex',
                    flexDirection: message.isUser ? 'row-reverse' : 'row',
                    alignItems: 'flex-end',
                  }}
                >
                  {/* Icon */}
                  <span style={{ margin: '0 6px', display: 'flex', alignItems: 'center' }}>
                    {message.isUser ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" fill="#409eff"/><rect x="6" y="14" width="12" height="6" rx="3" fill="#409eff"/></svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#f1c40f"/><rect x="9" y="16" width="6" height="2" rx="1" fill="#fff"/></svg>
                    )}
                  </span>
                  <div
                    style={{
                      alignSelf: message.isUser ? 'flex-end' : 'flex-start',
                      backgroundColor: message.isUser ? '#007bff' : '#f1f1f1',
                      color: message.isUser ? 'white' : 'black',
                      padding: '10px 16px',
                      borderRadius: message.isUser ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                      maxWidth: '80%',
                      fontSize: '13px',
                      whiteSpace: 'pre-line',
                      marginBottom: (!message.isUser && showOptions && idx === chatState.messages.length - 1 && pendingUrl && message.text !== 'Hello ! I am your school portal assistant , How can I help you ?') ? 8 : 0,
                      animation: 'floatIn 0.25s cubic-bezier(0.4,0,0.2,1)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.10)',
                      border: message.isUser ? '1.5px solid #007bff' : '1.5px solid #e0e0e0',
                      position: 'relative',
                      transition: 'box-shadow 0.2s',
                    }}
                  >
                    {isBotSteps ? (
                      <ul style={{
                        paddingLeft: 18,
                        margin: 0,
                        listStyle: 'disc',
                        color: '#2d3a4a',
                        fontSize: 13,
                        lineHeight: 1.7,
                        fontWeight: 500
                      }}>
                        {message.text.split('\n').map((step, i) => (
                          <li key={i} style={{ marginBottom: 4 }}>{step.replace(/^•\s*/, '')}</li>
                        ))}
                      </ul>
                    ) : (
                      message.text
                    )}
                    {!message.isUser && showOptions && idx === chatState.messages.length - 1 && pendingUrl && message.text !== 'Hello ! I am your school portal assistant , How can I help you ?' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 10, alignItems: 'flex-end' }}>
                        <span style={{ color: '#222', fontSize: 13, fontWeight: 500, marginBottom: 2 }}>Should I navigate you to the page?</span>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button
                            onClick={() => handleOption('yes')}
                            style={{
                              background: '#007bff',
                              color: 'white',
                              border: 'none',
                              borderRadius: '16px',
                              padding: '4px 16px',
                              fontSize: '13px',
                              cursor: 'pointer',
                              fontWeight: 500,
                              boxShadow: '0 1px 4px rgba(0,0,0,0.07)'
                            }}
                          >
                            Yes
                          </button>
                          <button
                            onClick={() => handleOption('no')}
                            style={{
                              background: '#f1f1f1',
                              color: '#333',
                              border: '1px solid #ddd',
                              borderRadius: '16px',
                              padding: '4px 16px',
                              fontSize: '13px',
                              cursor: 'pointer',
                              fontWeight: 500
                            }}
                          >
                            No
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
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
                fontSize: '13px'
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
                fontSize: '13px'
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
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
            
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatWidget;