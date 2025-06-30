import { ChatState } from '../types';

const STORAGE_KEY = 'chatbot_state';

// Fallback state when storage operations fail
const getFallbackState = (): ChatState => ({
  messages: [
    {
      id: Date.now().toString(),
      text: 'Hello! I am your school portal assistant. How can I help you?',
      isUser: false,
      timestamp: Date.now()
    }
  ],
  isMinimized: false,
  isVisible: false
});

export const saveChatState = async (state: ChatState): Promise<void> => {
  try {
    // Check if chrome.storage is available
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      await chrome.storage.local.set({ [STORAGE_KEY]: state }).catch(storageError => {
        console.error('Chrome storage error:', storageError);
        throw storageError;
      });
    } 
    // Fallback to localStorage if chrome.storage isn't available
    else if (typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (localStorageError) {
        console.error('LocalStorage error:', localStorageError);
        if (localStorageError instanceof DOMException && localStorageError.name === 'QuotaExceededError') {
          console.warn('Storage quota exceeded, attempting to clear old data');
          localStorage.removeItem(STORAGE_KEY);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } else {
          throw localStorageError;
        }
      }
    } else {
      console.warn('No storage mechanism available');
    }
  } catch (error) {
    console.error('Failed to save chat state:', error);
    // Continue execution even if save fails
  }
};

export const loadChatState = async (): Promise<ChatState> => {
  try {
    let loadedState: ChatState | null = null;
    
    // Try chrome.storage first
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      try {
        const result = await chrome.storage.local.get(STORAGE_KEY);
        loadedState = result[STORAGE_KEY];
      } catch (chromeError) {
        console.error('Chrome storage load error:', chromeError);
        throw chromeError;
      }
    } 
    // Fallback to localStorage
    else if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        loadedState = saved ? JSON.parse(saved) : null;
      } catch (parseError) {
        console.error('Error parsing stored chat state:', parseError);
        // Attempt to clear corrupted data
        localStorage.removeItem(STORAGE_KEY);
        throw parseError;
      }
    }

    return loadedState || getFallbackState();
  } catch (error) {
    console.error('Failed to load chat state:', error);
    return getFallbackState();
  }
};

export const clearChatState = async (): Promise<void> => {
  try {
    // Try chrome.storage first
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      await chrome.storage.local.remove(STORAGE_KEY);
    } 
    // Fallback to localStorage
    else if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (error) {
    console.error('Failed to clear chat state:', error);
    // Continue execution even if clear fails
  }
};