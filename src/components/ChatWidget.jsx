import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Send, Loader2, Phone, PhoneOff, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Vapi from '@vapi-ai/web';

const ChatWidget = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [chatMode, setChatMode] = useState(null); // null = Welcome Screen, 'text' = Text Chat, 'voice' = Voice session
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
      const VapiClass = Vapi.default || Vapi;
      vapiRef.current = new VapiClass('bf915efc-f8e3-4a2a-95c0-73982d4680b1');

      vapiRef.current.on('call-start', () => {
        setIsCallActive(true);
        setIsConnecting(false);
        setMessages(prev => [...prev, { role: 'ai', content: '🎙️ Voice call started. Maya is now speaking with you!' }]);
      });

      vapiRef.current.on('call-end', () => {
        setIsCallActive(false);
        setIsConnecting(false);
        setChatMode(null); // Reset back to welcome screen when call ends
        setMessages(prev => [...prev, { role: 'ai', content: '🔴 Voice call ended. You can continue via text here.' }]);
      });

      vapiRef.current.on('error', (err) => {
        console.error('Vapi Connection Error:', err);
        setIsCallActive(false);
        setIsConnecting(false);
        setChatMode(null);
        setMessages(prev => [...prev, { role: 'ai', content: '⚠️ Connection error. Please make sure your microphone is connected.' }]);
      });

      // Handle real-time client-side navigation tool calls from Vapi
      vapiRef.current.on('message', (message) => {
        if (message.type === 'tool-calls') {
          const toolCall = message.toolCalls?.[0];
          if (toolCall && toolCall.function.name === 'navigate') {
            try {
              const args = JSON.parse(toolCall.function.arguments);
              if (args.path) {
                // Dispatch route change to the frontend navigation system
                window.dispatchEvent(new CustomEvent('maya-action', {
                  detail: { type: 'NAVIGATE', path: args.path }
                }));
                
                // Return success output to the voice model
                vapiRef.current.send({
                  type: 'tool-output',
                  toolCallId: toolCall.id,
                  output: JSON.stringify({ success: true, message: `Successfully navigated to ${args.path}` })
                });
              }
            } catch (err) {
              console.error('Error executing Vapi client tool:', err);
            }
          }
        }
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
      // Inject client-side tool overrides directly to guarantee instant WebRTC event dispatching
      await vapiRef.current.start('5de5f832-1fec-42c7-b22d-ebecde275958', {
        tools: [
          {
            type: "function",
            function: {
              name: "navigate",
              description: "Navigate the website to a specific page or section requested by the user.",
              parameters: {
                type: "object",
                properties: {
                  path: {
                    type: "string",
                    description: "The target website path. Options: '/pricing', '/contact', '/services', '/projects', '/team', '/'"
                  }
                },
                required: ["path"]
              }
            }
          }
        ]
      });
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
    setChatMode(null);
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

  // Premium, High-Resolution smiling corporate Indian headshot
  const avatarUrl = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80";

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
      {/* Floating Button with Premium Gradient Border and Shadow */}
      {!isOpen && (
        <div 
          onClick={() => setIsOpen(true)}
          className="relative w-[65px] h-[65px] rounded-full p-0.5 bg-gradient-to-tr from-[#0054D2] to-[#FF1744] shadow-[0_8px_30px_rgb(0,84,210,0.3)] flex items-center justify-center cursor-pointer hover:scale-105 hover:rotate-2 transition-all duration-300"
        >
          <div className="w-full h-full rounded-full bg-[#0B0F19] p-0.5 flex items-center justify-center overflow-hidden">
            <img 
              src={avatarUrl} 
              alt="Maya - AI Assistant" 
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <span className="absolute bottom-1 right-1 w-4 h-4 bg-[#00E676] border-2 border-[#0B0F19] rounded-full shadow-lg"></span>
        </div>
      )}

      {/* Chat Popup with Brand Blue shadow glow */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-[320px] sm:w-[360px] h-[520px] bg-[#FAF8F5] rounded-[28px] shadow-[0_20px_50px_rgba(202,191,173,0.32)] overflow-hidden flex flex-col border border-[#E5DFD5]"
          >
            
            {/* Header */}
            <div className="bg-[#FFFFFF] p-4 flex items-center justify-between shrink-0 border-b border-[#E5DFD5] relative overflow-hidden">
              {/* Subtle ambient light bar in header */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#0054D2] to-[#FF1744]" />
              
              <div className="flex items-center gap-2 z-10">
                {/* Back button to return to selection screen */}
                {chatMode !== null && (
                  <button 
                    onClick={() => {
                      endCall();
                      setChatMode(null);
                    }}
                    title="Go Back to Menu"
                    className="mr-1 w-8 h-8 rounded-full bg-[#F5F2EB] flex items-center justify-center hover:bg-[#EAE5DC] text-gray-800 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                )}
                <img 
                  src={avatarUrl} 
                  alt="Maya" 
                  className="w-8 h-8 rounded-full object-cover border border-[#E5DFD5] shadow-inner"
                />
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <span className="text-[#2C2720] font-extrabold text-[15px] leading-tight tracking-tight">Maya</span>
                    <span className="bg-[#E8F0FE] text-[#0054D2] text-[8px] font-black px-1 py-0.5 rounded-md uppercase tracking-wider">AI</span>
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="w-1 h-1 rounded-full bg-[#00E676] animate-pulse"></span>
                    <span className="text-gray-500 text-[11px] font-medium">Online</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 z-10">
                {/* Voice Call / Phone Toggle Button (Only visible in text mode) */}
                {chatMode === 'text' && (
                  <button
                    onClick={() => {
                      setChatMode('voice');
                      startCall();
                    }}
                    disabled={isConnecting}
                    title="Switch to Voice Call"
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-colors bg-[#F5F2EB] hover:bg-[#EAE5DC] text-gray-800 shadow-sm"
                  >
                    <Phone className="w-4 h-4 text-gray-800" />
                  </button>
                )}

                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#F5F2EB] flex items-center justify-center hover:bg-[#EAE5DC] text-gray-800 transition-colors"
                >
                  <ChevronDown className="w-4 h-4 text-gray-800" />
                </button>
              </div>
            </div>

            {/* Chat / Voice / Welcome Area */}
            {chatMode === null ? (
              <div className="flex-1 flex flex-col justify-between p-6 bg-[#FAF8F5] text-center text-[#2C2720] relative overflow-hidden">
                {/* Dynamic Ambient Blur Glows (Softened for cream layout) */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF1744]/6 rounded-full blur-[45px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#0054D2]/10 rounded-full blur-[45px] pointer-events-none" />

                <div className="flex-1 flex flex-col items-center justify-center space-y-6 z-10">
                  {/* Avatar with pulsing glow */}
                  <div className="relative">
                    <motion.div 
                      animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute -inset-3 bg-[#0054D2]/15 rounded-full blur-xl"
                    />
                    <img 
                      src={avatarUrl} 
                      alt="Maya Avatar" 
                      className="relative w-20 h-20 rounded-full object-cover border-2 border-[#E5DFD5] shadow-2xl"
                    />
                    <span className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-[#00E676] border-2 border-[#FAF8F5] rounded-full shadow-lg"></span>
                  </div>
                  
                  {/* Greeting */}
                  <div className="space-y-2">
                    <h3 className="text-[#2C2720] font-black text-2xl tracking-tight leading-none">Meet Maya</h3>
                    <p className="text-gray-600 text-xs px-2 leading-relaxed font-medium">
                      Vector.Ai's smart representative. Select a mode to start conversation:
                    </p>
                  </div>
                  
                  {/* Selection Options */}
                  <div className="w-full space-y-3 pt-3">
                    {/* Option 1: Voice Session (Electric Blue Gradient Card) */}
                    <button
                      onClick={() => {
                        setChatMode('voice');
                        startCall();
                      }}
                      className="w-full p-4 rounded-2xl bg-gradient-to-r from-[#0054D2] via-[#0066FF] to-[#00A2FF] text-left flex items-center justify-between hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_8px_25px_rgba(0,84,210,0.35)] transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0 shadow-inner">
                          <Phone className="w-4 h-4 text-white animate-pulse" />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-sm text-white tracking-tight">Voice Session (Call)</h4>
                          <p className="text-white/80 text-[10px] mt-0.5 font-medium">Bol kar Maya se direct baat kijiye</p>
                        </div>
                      </div>
                      <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white font-extrabold text-[10px] tracking-wide shadow-sm group-hover:bg-white/30 transition-colors">GO</span>
                    </button>
                    
                    {/* Option 2: Chit-Chat Text (Cream Card with Red highlight on hover) */}
                    <button
                      onClick={() => setChatMode('text')}
                      className="w-full p-4 rounded-2xl bg-[#FFFFFF] border border-[#E5DFD5] text-left flex items-center justify-between hover:bg-[#F5F2EB] hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_8px_25px_rgba(0,84,210,0.06)] transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#F5F2EB] flex items-center justify-center shrink-0 shadow-inner group-hover:bg-[#EAE5DC]">
                          <Send className="w-4 h-4 text-gray-700" />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-sm text-[#2C2720] tracking-tight">Chit-Chat (Text)</h4>
                          <p className="text-gray-500 text-[10px] mt-0.5 font-medium">Type karke chat ke zariye baat kijiye</p>
                        </div>
                      </div>
                      <span className="w-6 h-6 rounded-full bg-[#F5F2EB] flex items-center justify-center text-gray-700 font-extrabold text-[10px] tracking-wide shadow-sm group-hover:bg-[#EAE5DC] transition-colors">GO</span>
                    </button>
                  </div>
                </div>

                <div className="text-gray-400 text-[9px] font-black tracking-widest select-none pt-4 z-10">
                  POWERED BY VECTOR.AI IT SOLUTION
                </div>
              </div>
            ) : chatMode === 'voice' || isCallActive ? (
              /* Voice Calling Screen with Red/Blue glowing overlay */
              <div className="flex-1 flex flex-col items-center justify-center bg-[#FAF8F5] p-6 text-center space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF1744]/6 rounded-full blur-[45px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#0054D2]/10 rounded-full blur-[45px] pointer-events-none" />

                <div className="relative z-10">
                  <motion.div 
                    animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -inset-4 bg-[#0054D2]/15 rounded-full blur-xl"
                  />
                  <img 
                    src={avatarUrl} 
                    alt="Maya Voice Agent" 
                    className="relative w-20 h-20 rounded-full object-cover border-2 border-[#0054D2] shadow-2xl z-10"
                  />
                </div>
                <div className="space-y-2 z-10">
                  <h3 className="text-[#2C2720] font-black text-lg tracking-tight">
                    {isConnecting ? "Connecting Call..." : "Maya is Listening..."}
                  </h3>
                  <p className="text-gray-500 text-xs px-4 leading-relaxed font-medium">
                    {isConnecting 
                      ? "Launching secure speech channel. Please wait." 
                      : "Start speaking naturally. Maya will answer. You can interrupt her anytime!"}
                  </p>
                </div>
                
                {/* Voice Wave Animation with Alternating Red & Blue Bars */}
                {!isConnecting && (
                  <div className="flex items-center gap-1 h-8 z-10">
                    {[...Array(6)].map((_, i) => (
                      <motion.span
                        key={i}
                        animate={{ height: [8, 32, 8] }}
                        transition={{ 
                          duration: 0.6, 
                          repeat: Infinity, 
                          delay: i * 0.1,
                          ease: "easeInOut"
                        }}
                        className={`w-1 rounded-full ${i % 2 === 0 ? 'bg-[#00A2FF]' : 'bg-[#FF1744]'}`}
                      />
                    ))}
                  </div>
                )}

                {isConnecting && (
                  <div className="flex items-center justify-center h-8 z-10">
                    <Loader2 className="w-6 h-6 text-[#0054D2] animate-spin" />
                  </div>
                )}
                
                <button 
                  onClick={endCall}
                  className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white rounded-full font-bold text-sm transition-all shadow-lg shadow-red-500/25 z-10 hover:scale-102 active:scale-98"
                >
                  End Voice Session
                </button>
              </div>
            ) : (
              /* Standard Chat Area with High-Fidelity message bubbles (in cream palette) */
              <div className="flex-1 overflow-y-auto p-4 bg-[#F5F2EB] space-y-4">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div 
                      className={`max-w-[80%] p-3 rounded-2xl text-[14px] leading-relaxed font-medium ${
                        msg.role === 'user' 
                          ? 'bg-gradient-to-r from-[#0054D2] to-[#0084FF] text-white rounded-tr-sm shadow-sm' 
                          : 'bg-white border border-[#E5DFD5] shadow-sm text-gray-900 rounded-tl-sm'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-[#E5DFD5] shadow-sm rounded-2xl rounded-tl-sm p-4 flex items-center gap-2">
                      <Loader2 className="w-4 h-4 text-[#0054D2] animate-spin" />
                      <span className="text-[13px] text-gray-500 font-medium">Maya is typing...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}

            {/* Input Area (Only visible when text chat mode is active) */}
            {chatMode === 'text' && (
              <div className="p-4 bg-white border-t border-[#E5DFD5] shrink-0">
                <form onSubmit={handleSend} className="relative flex items-center">
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..." 
                    className="w-full bg-[#F5F2EC] border border-[#E5DFD5] text-gray-900 text-[14px] rounded-full pl-5 pr-12 py-3.5 focus:outline-none focus:border-[#0054D2] transition-colors font-medium"
                  />
                  <button 
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="absolute right-1 w-10 h-10 bg-[#0B0F19] text-white rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-[#0054D2] hover:to-[#0084FF] disabled:opacity-50 transition-all duration-300"
                  >
                    <Send className="w-4 h-4 ml-0.5" />
                  </button>
                </form>
                <div className="text-center mt-3 text-gray-400 text-[10px] font-bold">
                  Powered by <span className="text-gray-500 font-black">Vector.Ai IT Solution</span>
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
