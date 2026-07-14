import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Send, Loader2, Phone, PhoneOff, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Vapi from '@vapi-ai/web';

/**
 * ============================================================================
 * STANDALONE MAYA VOICE & CHAT ASSISTANT TEMPLATE
 * ============================================================================
 * This is a self-contained, production-ready React component that integrates
 * Vapi.ai WebRTC voice calls and standard REST text chats in one premium widget.
 * 
 * Dependencies:
 *   npm install @vapi-ai/web lucide-react framer-motion
 * 
 * Configuration checklist:
 *   1. Replace VAPI_PUBLIC_KEY with your key.
 *   2. Replace VAPI_ASSISTANT_ID with your assistant ID.
 *   3. Replace TEXT_CHAT_BACKEND_URL with your LLM chatbot API endpoint.
 *   4. Replace WEB3FORMS_ACCESS_KEY with your lead email delivery key.
 * ============================================================================
 */

const VAPI_PUBLIC_KEY = 'bf915efc-f8e3-4a2a-95c0-73982d4680b1';
const VAPI_ASSISTANT_ID = '5de5f832-1fec-42c7-b22d-ebecde275958';
const TEXT_CHAT_BACKEND_URL = 'https://vector-ai-backend-pxzk.onrender.com/api/chat';
const WEB3FORMS_ACCESS_KEY = 'd316d7e7-6a74-486d-a7f6-f87fed68732d'; // Sends leads to vector.ai09@gmail.com

const MayaVoiceAssistantTemplate = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatMode, setChatMode] = useState(null); // null = Welcome Screen, 'text' = Text Chat, 'voice' = Voice call
  const [messages, setMessages] = useState([
    { role: 'ai', content: "Hi there! I am Maya, your AI assistant. How can I help you today?" }
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
      const VapiClass = Vapi.default || Vapi;
      vapiRef.current = new VapiClass(VAPI_PUBLIC_KEY);

      // Event: Voice call starts successfully
      vapiRef.current.on('call-start', () => {
        setIsCallActive(true);
        setIsConnecting(false);
        setMessages(prev => [...prev, { role: 'ai', content: '🎙️ Voice call started. Maya is now speaking with you!' }]);
      });

      // Event: Voice call ends
      vapiRef.current.on('call-end', () => {
        setIsCallActive(false);
        setIsConnecting(false);
        setChatMode(null); // Reset to welcome screen
        setMessages(prev => [...prev, { role: 'ai', content: '🔴 Voice call ended. You can continue via text here.' }]);
      });

      // Event: Vapi connections error (mic blocked, invalid keys, etc.)
      vapiRef.current.on('error', (err) => {
        console.error('Vapi Connection Error:', err);
        setIsCallActive(false);
        setIsConnecting(false);
        setChatMode(null);
        const errMsg = err?.message || (typeof err === 'string' ? err : '') || 'Microphone/Network issue';
        setMessages(prev => [...prev, { 
          role: 'ai', 
          content: `⚠️ Vapi Error: ${errMsg}. Please check if your public key, assistant ID, and microphone permissions are correct.` 
        }]);
      });

      // Event: Handles function calling (custom client-side tools)
      vapiRef.current.on('message', (message) => {
        if (message.type === 'tool-calls') {
          const toolCall = message.toolCalls?.[0];
          if (!toolCall) return;

          // Tool 1: navigate
          if (toolCall.function.name === 'navigate') {
            try {
              const args = JSON.parse(toolCall.function.arguments);
              const targetPath = args.path ? args.path.toLowerCase().trim() : '/';
              
              // Frontend Redirect Action (Decoupled from react-router for portability)
              if (targetPath.startsWith('/')) {
                window.location.hash = targetPath; // Fallback hash routing or window navigation
              } else {
                window.location.href = targetPath;
              }

              // Return execution output to Vapi
              vapiRef.current.send({
                type: 'tool-output',
                toolCallId: toolCall.id,
                output: JSON.stringify({ success: true, message: `Successfully redirected user to ${targetPath}` })
              });
            } catch (err) {
              console.error('Error executing navigate tool:', err);
            }
          }

          // Tool 2: submitContactForm
          if (toolCall.function.name === 'submitContactForm') {
            try {
              const args = JSON.parse(toolCall.function.arguments);
              const { name, email, phone, message: clientMsg } = args;

              // Send lead details directly to your inbox via Web3Forms
              const formData = new FormData();
              formData.append("access_key", WEB3FORMS_ACCESS_KEY);
              formData.append("name", name || "Voice Lead");
              formData.append("email", email || "voice@vectorai.in");
              formData.append("phone", phone || "");
              formData.append("message", `[SUBMITTED VIA MAYA VOICE ASSISTANT]\n\nRequirement: ${clientMsg || "Not specified"}`);

              fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
              })
              .then(res => res.json())
              .then(data => console.log("Form submission success:", data))
              .catch(err => console.error("Web3Forms submission failed:", err));

              // Respond to Vapi
              vapiRef.current.send({
                type: 'tool-output',
                toolCallId: toolCall.id,
                output: JSON.stringify({ success: true, message: `Details submitted successfully for ${name}` })
              });
            } catch (err) {
              console.error('Error executing submitContactForm tool:', err);
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
      // Connect directly using assistant ID (without client overrides to prevent Vapi validation disconnect crashes)
      await vapiRef.current.start(VAPI_ASSISTANT_ID);
    } catch (err) {
      console.error('Failed to start voice agent:', err);
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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
      const response = await fetch(TEXT_CHAT_BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] })
      });

      const data = await response.json();
      if (response.ok) {
        const replyText = data.reply || data;
        setMessages(prev => [...prev, { role: 'ai', content: replyText }]);
      } else {
        throw new Error('API request failed');
      }
    } catch (err) {
      console.error('Text chat error:', err);
      setMessages(prev => [...prev, { role: 'ai', content: '⚠️ Sorry, I had trouble connecting to the chat server. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-[100] font-sans">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <div 
          onClick={() => setIsOpen(true)}
          className="relative w-[65px] h-[65px] rounded-full p-0.5 bg-gradient-to-tr from-[#0054D2] to-[#FF1744] shadow-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-all duration-300"
        >
          <div className="w-full h-full rounded-full bg-[#0B0F19] flex items-center justify-center overflow-hidden">
            <span className="text-white text-xs font-black tracking-widest uppercase">MAYA</span>
          </div>
          <span className="absolute bottom-1 right-1 w-4 h-4 bg-[#00E676] border-2 border-[#0B0F19] rounded-full"></span>
        </div>
      )}

      {/* Chat / Call Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="w-[320px] sm:w-[360px] h-[520px] bg-[#FAF8F5] rounded-[28px] shadow-2xl overflow-hidden flex flex-col border border-[#E5DFD5]"
          >
            {/* Header */}
            <div className="bg-[#FFFFFF] p-4 flex items-center justify-between shrink-0 border-b border-[#E5DFD5] relative">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-[#0054D2] to-[#FF1744]" />
              
              <div className="flex items-center gap-2">
                {chatMode !== null && (
                  <button 
                    onClick={() => { endCall(); setChatMode(null); }}
                    className="mr-1 w-8 h-8 rounded-full bg-[#F5F2EB] flex items-center justify-center hover:bg-[#EAE5DC] text-gray-800 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                )}
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <span className="text-[#2C2720] font-extrabold text-[15px] leading-none">Maya Assistant</span>
                    <span className="bg-[#E8F0FE] text-[#0054D2] text-[8px] font-black px-1 py-0.5 rounded-md">LIVE</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {chatMode === 'text' && (
                  <button
                    onClick={() => { setChatMode('voice'); startCall(); }}
                    className="w-8 h-8 rounded-full flex items-center justify-center bg-[#F5F2EB] hover:bg-[#EAE5DC] text-gray-800 shadow-sm"
                  >
                    <Phone className="w-4 h-4" />
                  </button>
                )}
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#F5F2EB] flex items-center justify-center hover:bg-[#EAE5DC]"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content Body */}
            {chatMode === null ? (
              /* Welcome Screen */
              <div className="flex-1 flex flex-col justify-between p-6 text-center text-[#2C2720]">
                <div className="flex-1 flex flex-col items-center justify-center space-y-6">
                  <div className="relative">
                    <div className="absolute -inset-3 bg-[#0054D2]/10 rounded-full blur-xl animate-pulse" />
                    <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-[#0054D2] to-[#FF1744] flex items-center justify-center text-white font-black text-xl">
                      M
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-[#2C2720] font-black text-2xl tracking-tight">Interactive Maya</h3>
                    <p className="text-gray-600 text-xs px-2 leading-relaxed font-medium">
                      Select a communication channel to begin testing or presentation:
                    </p>
                  </div>
                  
                  <div className="w-full space-y-3">
                    <button
                      onClick={() => { setChatMode('voice'); startCall(); }}
                      className="w-full p-4 rounded-2xl bg-gradient-to-r from-[#0054D2] to-[#00A2FF] text-left flex items-center justify-between hover:scale-[1.01] transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-white" />
                        <div>
                          <h4 className="font-extrabold text-sm text-white">Voice Call Session</h4>
                          <p className="text-white/80 text-[10px]">Speak directly to test WebRTC audio</p>
                        </div>
                      </div>
                    </button>
                    
                    <button
                      onClick={() => setChatMode('text')}
                      className="w-full p-4 rounded-2xl bg-[#FFFFFF] border border-[#E5DFD5] text-left flex items-center justify-between hover:bg-[#F5F2EB] hover:scale-[1.01] transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <Send className="w-4 h-4 text-gray-700" />
                        <div>
                          <h4 className="font-extrabold text-sm text-[#2C2720]">Chit-Chat (Text Mode)</h4>
                          <p className="text-gray-500 text-[10px]">Type queries to test LLM knowledge</p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
                <div className="text-gray-400 text-[9px] font-black tracking-widest pt-4">
                  POWERED BY VAPI & VECTOR.AI
                </div>
              </div>
            ) : chatMode === 'voice' || isCallActive ? (
              /* Voice Call Screen */
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6">
                <div className="relative">
                  <div className="absolute -inset-4 bg-[#0054D2]/15 rounded-full blur-xl animate-ping" />
                  <div className="relative w-20 h-20 rounded-full bg-[#0B0F19] border-2 border-[#0054D2] flex items-center justify-center text-white font-extrabold">
                    {isConnecting ? "Connecting" : "Listening"}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-[#2C2720] font-black text-lg">
                    {isConnecting ? "Connecting to Vapi Server..." : "Maya is online"}
                  </h3>
                  <p className="text-gray-500 text-xs px-4">
                    {isConnecting ? "Please allow microphone permissions if prompted." : "Speak naturally, Maya will respond. Click below to end."}
                  </p>
                </div>

                {!isConnecting && (
                  <div className="flex items-center gap-1 h-8 z-10">
                    {[...Array(6)].map((_, i) => (
                      <motion.span
                        key={i}
                        animate={{ height: [8, 32, 8] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1, ease: 'easeInOut' }}
                        className={`w-1 rounded-full ${i % 2 === 0 ? 'bg-[#0054D2]' : 'bg-[#FF1744]'}`}
                      />
                    ))}
                  </div>
                )}
                
                <button 
                  onClick={endCall}
                  className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-full font-bold text-sm shadow-md"
                >
                  End Voice Session
                </button>
              </div>
            ) : (
              /* Standard Chat Bubble View */
              <div className="flex-1 overflow-y-auto p-4 bg-[#F5F2EB] space-y-4 flex flex-col">
                <div className="flex-1 space-y-4">
                  {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-3 rounded-2xl text-[14px] leading-relaxed ${msg.role === 'user' ? 'bg-[#0054D2] text-white rounded-tr-sm' : 'bg-white text-gray-900 border border-[#E5DFD5] rounded-tl-sm'}`}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-[#E5DFD5] rounded-2xl rounded-tl-sm p-4 flex items-center gap-2">
                        <Loader2 className="w-4 h-4 text-[#0054D2] animate-spin" />
                        <span className="text-[13px] text-gray-500">Maya is typing...</span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
                
                {/* Text Input Footer inside chat */}
                <form onSubmit={handleSend} className="relative flex items-center pt-2">
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..." 
                    className="w-full bg-white border border-[#E5DFD5] text-gray-900 text-[14px] rounded-full pl-5 pr-12 py-3 focus:outline-none"
                  />
                  <button 
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="absolute right-1 w-10 h-10 bg-[#0B0F19] text-white rounded-full flex items-center justify-center"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MayaVoiceAssistantTemplate;
