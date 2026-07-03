import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Hi there! I am Maya, Scallar\'s AI assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

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
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] })
      });

      const data = await response.json();

      if (response.ok) {
        setMessages(prev => [...prev, { role: 'ai', content: data.reply }]);
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
              
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <ChevronDown className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Chat Area */}
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

            {/* Input Area */}
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
                Powered by <span className="text-gray-600 font-bold">Scallar IT Solution</span>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatWidget;
