import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Send, Loader2, Phone, PhoneOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Vapi from '@vapi-ai/web';

const ChatWidget = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Hi there! I am Maya, Vector.Ai\'s AI assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Vapi Voice Call State
  const vapiRef = useRef(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  // Initialize Vapi SDK
  useEffect(() => {
    try {
      // Vapi Public Key: bf915efc-f8e3-4a2a-95c0-73982d4680b1
      vapiRef.current = new Vapi('bf915efc-f8e3-4a2a-95c0-73982d4680b1');

      vapiRef.current.on('call-start', () => {
        setIsCallActive(true);
        setIsConnecting(false);
        // Append a system message in chat history for transparency
        setMessages(prev => [...prev, { role: 'ai', content: '🎙️ Voice call started. Maya is now speaking with you!' }]);
      });

      vapiRef.current.on('call-end', () => {
        setIsCallActive(false);
        setIsConnecting(false);
        setMessages(prev => [...prev, { role: 'ai', content: '🔴 Voice call ended. You can continue via text here.' }]);
      });

      vapiRef.current.on('error', (err) => {
        console.error('Vapi Connection Error:', err);
        setIsCallActive(false);
        setIsConnecting(false);
        setMessages(prev => [...prev, { role: 'ai', content: '⚠️ Connection error. Please make sure your microphone is connected.' }]);
      });
    } catch (err) {
      console.error('Failed to initialize Vapi SDK:', err);
    }

    return () => {
      if (vapiRef.current) {
        try {
          vapiRef.current.stop();
        } catch (stopErr) {
          // Ignore stop errors on unmount
        }
      }
    };
  }, []);

  const startCall = async () => {
    if (!vapiRef.current) return;
    setIsConnecting(true);
    try {
      // Vapi Assistant ID: 5de5f832-1fec-42c7-b22d-ebecde275958
      await vapiRef.current.start('5de5f832-1fec-42c7-b22d-ebecde275958');
    } catch (err) {
      console.error('Failed to start Vapi voice agent:', err);
      setIsConnecting(false);
    }
  };

  const endCall = () => {
    if (vapiRef.current) {
      vapiRef.current.stop();
    }
    setIsCallActive(false);
    setIsConnecting(false);
  };

  // Handle navigation events from Maya
  useEffect(() => {
    const handleMayaAction = (e) => {
      const { type, path } = e.detail;
      if (type === 'NAVIGATE' && path) {
        navigate(path);
      }
    };
    window.addEventListener('maya-action', handleMayaAction);
    return () => window.removeEventListener('maya-action', handleMayaAction);
  }, [navigate]);

  const avatarUrl = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('https://vector-ai-backend-pxzk.onrender.com/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] })
      });

      const data = await response.json();

      if (response.ok) {
        let replyText = data.reply;
        let actionObj = data.action;

        if (typeof replyText === 'undefined') {
          replyText = data.reply || data;
        }

        setMessages(prev => [...prev, { role: 'ai', content: replyText }]);

        // Dispatch action command to window listeners (Contact Form, Router navigate)
        if (actionObj) {
          window.dispatchEvent(new CustomEvent('maya-action', { detail: actionObj }));
        }
      } else {
        setMessages(prev => [...prev, { role: 'ai', content: 'Sorry, I am having trouble connecting to my brain right now.' }]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'ai', content: 'Network error. Please try again later.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-[100]">
      {/* Floating Button */}
      {!isOpen && (
        <div 
          onClick={() => setIsOpen(true)}
          className="relative w-[60px] h-[60px] rounded-full p-1 bg-white shadow-xl flex items-center justify-center cursor-pointer hover:scale-105 transition-transform animate-float"
        >
          <img 
            src={avatarUrl} 
            alt="Maya - AI Assistant" 
            className="w-full h-full rounded-full object-cover"
          />
          <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-[#00E676] border-2 border-white rounded-full"></span>
        </div>
      )}

      {/* Chat Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-[320px] sm:w-[360px] h-[500px] bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col"
          >
            
            {/* Header */}
            <div className="bg-[#0B0F19] p-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <img 
                  src={avatarUrl} 
                  alt="Maya" 
                  className="w-10 h-10 rounded-full object-cover border border-white/20"
                />
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold text-[15px] leading-tight">Maya</span>
                    <span className="bg-[#E8F0FE] text-[#0054D2] text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">AI</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00E676]"></span>
                    <span className="text-gray-300 text-[12px] font-medium">Online</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Voice Call / Phone Toggle Button */}
                <button
                  onClick={isCallActive ? endCall : startCall}
                  disabled={isConnecting}
                  title={isCallActive ? "End Voice Call" : "Start Voice Call"}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    isCallActive
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : isConnecting
                        ? 'bg-amber-500 text-white animate-pulse'
                        : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  {isCallActive ? (
                    <PhoneOff className="w-4 h-4 text-white" />
                  ) : isConnecting ? (
                    <Loader2 className="w-4 h-4 text-white animate-spin" />
                  ) : (
                    <Phone className="w-4 h-4 text-white" />
                  )}
                </button>

                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <ChevronDown className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Chat / Voice Area */}
            {isCallActive ? (
              <div className="flex-1 flex flex-col items-center justify-center bg-[#0B0F19] p-6 text-center space-y-6">
                <div className="relative">
                  <motion.div 
                    animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -inset-4 bg-[#0054D2]/40 rounded-full blur-xl"
                  />
                  <img 
                    src={avatarUrl} 
                    alt="Maya Voice Agent" 
                    className="relative w-24 h-24 rounded-full object-cover border-2 border-[#0054D2] shadow-2xl z-10"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-white font-bold text-lg">Maya is Listening...</h3>
                  <p className="text-gray-400 text-xs px-4">Start speaking naturally. Maya will answer in real-time. You can interrupt her at any time!</p>
                </div>
                
                {/* Voice Wave Animation */}
                <div className="flex items-center gap-1.5 h-8">
                  {[...Array(5)].map((_, i) => (
                    <motion.span
                      key={i}
                      animate={{ height: [8, 32, 8] }}
                      transition={{ 
                        duration: 0.6, 
                        repeat: Infinity, 
                        delay: i * 0.12,
                        ease: "easeInOut"
                      }}
                      className="w-1.5 bg-[#00E676] rounded-full"
                    />
                  ))}
                </div>
                
                <button 
                  onClick={endCall}
                  className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-full font-bold text-sm transition-colors shadow-lg shadow-red-500/25"
                >
                  End Voice Session
                </button>
              </div>
            ) : (
              /* Standard Chat Area */
              <div className="flex-1 overflow-y-auto p-4 bg-[#F8F9FA] space-y-4">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div 
                      className={`max-w-[80%] p-3 rounded-2xl text-[14px] leading-relaxed ${
                        msg.role === 'user' 
                          ? 'bg-[#0054D2] text-white rounded-tr-sm' 
                          : 'bg-white border border-gray-100 shadow-sm text-[#0B0F19] rounded-tl-sm'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-tl-sm p-4 flex items-center gap-2">
                      <Loader2 className="w-4 h-4 text-[#0054D2] animate-spin" />
                      <span className="text-[13px] text-gray-500 font-medium">Maya is typing...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}

            {/* Input Area (Only visible when call is not active) */}
            {!isCallActive && (
              <div className="p-4 bg-white border-t border-gray-100 shrink-0">
                <form onSubmit={handleSend} className="relative flex items-center">
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..." 
                    className="w-full bg-[#F8F9FA] border border-gray-200 text-[#0B0F19] text-[14px] rounded-full pl-5 pr-12 py-3.5 focus:outline-none focus:border-[#0054D2] transition-colors"
                  />
                  <button 
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="absolute right-1.5 w-10 h-10 bg-[#0B0F19] text-white rounded-full flex items-center justify-center hover:bg-black disabled:opacity-50 transition-colors"
                  >
                    <Send className="w-4 h-4 ml-0.5" />
                  </button>
                </form>
                <div className="text-center mt-3 text-gray-400 text-[10px] font-medium">
                  Powered by <span className="text-gray-600 font-bold">Vector.Ai IT Solution</span>
                </div>
              </div>
            )}

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatWidget;
