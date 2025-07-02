import React from 'react'; // <-- This is still needed for some setups!
import { createRoot } from 'react-dom/client';
import ChatWidget from './ChatWidget';
import '../global.css';

// Create container for the widget
const container = document.createElement('div');
container.id = 'chatbot-extension-root';
document.body.appendChild(container);

// Render the widget
const root = createRoot(container);
root.render(<ChatWidget />);