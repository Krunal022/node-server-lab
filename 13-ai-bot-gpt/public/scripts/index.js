// DOM elements
const homeContent = document.getElementById("homeContent");
const conversationContent = document.getElementById(
    "conversationContent"
);
const homeInput = document.getElementById("homeInput");
const conversationInput = document.getElementById("conversationInput");
const homeSendBtn = document.getElementById("homeSendBtn");
const conversationSendBtn = document.getElementById(
    "conversationSendBtn"
);
const backBtn = document.getElementById("backBtn");
const messagesContainer = document.getElementById("messagesContainer");

// State
let isInConversation = false;
let messages = [];

// Dummy AI responses
const dummyResponses = [
    "I'd be happy to help you create that! Let me break it down into steps...",
    "That's a great idea! Here's how we can approach this project...",
    "I can definitely help you build that. Let me start by creating the basic structure...",
    "Excellent project choice! Let me generate the code for you...",
    "I'll create a beautiful and functional solution for you. Here's what I'm building...",
    "That sounds like an interesting challenge! Let me craft the perfect solution...",
    "I'm excited to help you build this! Let me start coding right away...",
    "Perfect! I'll create something amazing for you. Here's the implementation...",
    "I love this idea! Let me build it step by step...",
    "This is going to be fantastic! Let me create the code structure...",
];

// Switch to conversation mode
function switchToConversation() {
    homeContent.style.display = "none";
    conversationContent.style.display = "flex";
    isInConversation = true;

    // Focus on conversation input
    setTimeout(() => {
        conversationInput.focus();
    }, 100);
}

// Switch back to home
function switchToHome() {
    conversationContent.style.display = "none";
    homeContent.style.display = "block";
    isInConversation = false;

    // Clear home input
    homeInput.value = "";

    // Focus on home input
    setTimeout(() => {
        homeInput.focus();
    }, 100);
}

// Add message to conversation
function addMessage(content, isUser = false) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${isUser ? "user" : "ai"}`;

    const avatar = document.createElement("div");
    avatar.className = `message-avatar ${isUser ? "user" : "ai"}`;
    avatar.textContent = isUser ? "U" : "AI";

    const messageContent = document.createElement("div");
    messageContent.className = "message-content";
    messageContent.textContent = content;

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(messageContent);

    messagesContainer.appendChild(messageDiv);

    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Add to messages array
    messages.push({ content, isUser, timestamp: Date.now() });
}

// Show AI typing indicator
function showAITyping() {
    const typingDiv = document.createElement("div");
    typingDiv.className = "ai-typing";
    typingDiv.id = "aiTyping";

    const typingText = document.createElement("span");
    typingText.textContent = "Thinking...";

    const typingDots = document.createElement("div");
    typingDots.className = "typing-dots";

    for (let i = 0; i < 3; i++) {
        const dot = document.createElement("div");
        dot.className = "typing-dot";
        typingDots.appendChild(dot);
    }

    typingDiv.appendChild(typingText);
    typingDiv.appendChild(typingDots);

    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Hide AI typing indicator
function hideAITyping() {
    const typingDiv = document.getElementById("aiTyping");
    if (typingDiv) {
        typingDiv.remove();
    }
}

// Simulate AI response
function simulateAIResponse() {
    showAITyping();

    // Random delay between 1-3 seconds
    const delay = 1000 + Math.random() * 2000;

    setTimeout(() => {
        hideAITyping();

        // Get random response
        const randomResponse =
            dummyResponses[Math.floor(Math.random() * dummyResponses.length)];
        addMessage(randomResponse, false);
    }, delay);
}

// Send message
function sendMessage() {
    const input = isInConversation ? conversationInput : homeInput;
    const message = input.value.trim();

    if (!message) return;

    // If on home page, switch to conversation
    if (!isInConversation) {
        switchToConversation();
    }

    // Add user message
    addMessage(message, true);

    // Clear input
    input.value = "";

    // Simulate AI response
    simulateAIResponse();
}

// Event listeners
homeInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        sendMessage();
    }
});

conversationInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        sendMessage();
    }
});

homeSendBtn.addEventListener("click", sendMessage);
conversationSendBtn.addEventListener("click", sendMessage);
backBtn.addEventListener("click", switchToHome);

// Focus management
homeInput.addEventListener("focus", () => {
    if (!isInConversation) {
        homeInput.placeholder = "Type your message and press Enter...";
    }
});

homeInput.addEventListener("blur", () => {
    if (!isInConversation) {
        homeInput.placeholder = "Let’s talk… ";
    }
});

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    homeInput.focus();
});
