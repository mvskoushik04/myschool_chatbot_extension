import { ChatState, Message } from '../types';

const STORAGE_KEY = 'chatbot_state';

export const saveChatState = async (state: ChatState): Promise<void> => {
  try {
    await chrome.storage.local.set({ [STORAGE_KEY]: state });
  } catch (error) {
    console.error('Failed to save chat state:', error);
  }
};

export const loadChatState = async (): Promise<ChatState> => {
  try {
    const result = await chrome.storage.local.get(STORAGE_KEY);
    return result[STORAGE_KEY] || {
      messages: [
        {
          id: '1',
          text: 'Hello! I am your school portal assistant , How can I help you ?',
          isUser: false,
          timestamp: Date.now()
        }
      ],
      isMinimized: false,
      isVisible: false
    };
  } catch (error) {
    console.error('Failed to load chat state:', error);
    return {
      messages: [],
      isMinimized: false,
      isVisible: false
    };
  }
};