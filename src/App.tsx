import React, { useState, useEffect, useRef } from 'react'
import './App.css'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

interface ChatResponse {
  message: string
  error?: string
}

function App() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load chat history from storage
    loadChatHistory()
    
    // Add welcome message
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      text: "Hello! I'm your AI assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
    setMessages([welcomeMessage])
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const loadChatHistory = async () => {
    try {
      const result = await chrome.storage.local.get(['chatHistory'])
      if (result.chatHistory) {
        setMessages(result.chatHistory)
      }
    } catch (error) {
      console.error('Error loading chat history:', error)
    }
  }

  const saveChatHistory = async (newMessages: Message[]) => {
    try {
      await chrome.storage.local.set({ chatHistory: newMessages })
    } catch (error) {
      console.error('Error saving chat history:', error)
    }
  }

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInputValue('')
    setIsLoading(true)

    try {
      // Get current page context
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
      
      // Inject content script to get page context
      const pageContext = await chrome.scripting.executeScript({
        target: { tabId: tab.id! },
        func: () => {
          return {
            title: document.title,
            url: window.location.href,
            selectedText: window.getSelection()?.toString() || '',
            pageContent: document.body.innerText.substring(0, 1000) // First 1000 chars
          }
        }
      })

      // Simulate AI response (replace with actual API call)
      const botResponse = await generateBotResponse(inputValue, pageContext[0].result)
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse.message,
        sender: 'bot',
        timestamp: new Date()
      }

      const finalMessages = [...updatedMessages, botMessage]
      setMessages(finalMessages)
      saveChatHistory(finalMessages)
      
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I encountered an error. Please try again.",
        sender: 'bot',
        timestamp: new Date()
      }
      const finalMessages = [...updatedMessages, errorMessage]
      setMessages(finalMessages)
    } finally {
      setIsLoading(false)
    }
  }

  const generateBotResponse = async (userInput: string, pageContext: any): Promise<ChatResponse> => {
    // Replace this with your actual AI API call
    // Example with a mock response based on page context
    
    const responses = [
      `I can see you're on "${pageContext.title}". How can I help you with this page?`,
      `Based on the current page content, here's what I can help you with...`,
      `I understand you're asking about "${userInput}". Let me analyze the current page context.`,
      `From what I can see on this page (${pageContext.url}), here's my response...`
    ]
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return {
      message: responses[Math.floor(Math.random() * responses.length)]
    }
  }

  const clearChat = () => {
    setMessages([])
    chrome.storage.local.remove(['chatHistory'])
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h2>AI Assistant</h2>
        <button onClick={clearChat} className="clear-btn">Clear</button>
      </div>
      
      <div className="messages-container">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            <div className="message-content">
              {message.text}
            </div>
            <div className="message-time">
              {message.timestamp.toLocaleTimeString()}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message bot">
            <div className="message-content typing">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="input-container">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me anything about this page..."
          className="message-input"
          rows={2}
        />
        <button 
          onClick={sendMessage} 
          disabled={!inputValue.trim() || isLoading}
          className="send-btn"
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default App
