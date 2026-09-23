'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, X, Minimize2, Circle, Bot, User, CheckCheck } from 'lucide-react';

export default function FloatingWidgets() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'agent',
      name: 'Sarah - DIGITALXTRADE Support',
      text: 'Hello! 👋 Welcome to DIGITALXTRADE. How can we assist your trading or account today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    setIsTyping(true);

    // Simulated intelligent live support agent response
    setTimeout(() => {
      let replyText = "Thank you for reaching out! A live customer support representative is reviewing your inquiry. Please feel free to register or log into your portal for priority processing.";

      const lower = text.toLowerCase();
      if (lower.includes('deposit') || lower.includes('fund') || lower.includes('minimum')) {
        replyText = "The minimum deposit on DIGITALXTRADE is $100. We accept Bitcoin (BTC), USDT (TRC20/ERC20), Credit/Debit Cards, and Bank Wire. All deposits carry 0% platform fees.";
      } else if (lower.includes('withdraw')) {
        replyText = "Withdrawals are processed within 1-2 hours (guaranteed within 24h). The minimum withdrawal threshold is $10 with 0% withdrawal fees.";
      } else if (lower.includes('account') || lower.includes('register') || lower.includes('sign up')) {
        replyText = "Opening an account is 100% free and takes less than 2 minutes! Click 'OPEN ACCOUNT' at the top of the page to get started.";
      } else if (lower.includes('login')) {
        replyText = "You can log into your trading account portal by clicking 'LOGIN' in the navigation bar.";
      }

      const agentMsg = {
        id: Date.now() + 1,
        sender: 'agent',
        name: 'Sarah - DIGITALXTRADE Support',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, agentMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <>
      {/* FLOATING WHATSAPP BUTTON (BOTTOM-LEFT) */}
      <div className="fixed bottom-5 left-5 z-40 flex items-center gap-2">
        <a
          href="https://wa.me/?text=Hello%20DIGITALXTRADE%20Support"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 bg-[#25d366] hover:bg-[#20ba5a] text-white p-2.5 pr-4 rounded-full shadow-lg transition-all hover:scale-105"
        >
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">
            💬
          </div>
          <span className="text-xs font-bold tracking-wide">Message us</span>
        </a>
      </div>

      {/* FLOATING LIVE CHAT BUTTON (BOTTOM-RIGHT) */}
      <div className="fixed bottom-5 right-5 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2.5 bg-[#0085d0] hover:bg-[#0072ce] text-white px-5 py-3 rounded-full shadow-2xl transition-all hover:scale-105 border-2 border-white/20"
          >
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="font-extrabold text-sm tracking-wide">Chat</span>
            <MessageSquare className="w-5 h-5 fill-white shrink-0" />
          </button>
        )}

        {/* INTERACTIVE LIVE CHAT BOX MODAL */}
        {isOpen && (
          <div className="w-[340px] sm:w-[380px] h-[480px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
            {/* CHAT HEADER */}
            <div className="bg-[#00529b] text-white px-4 py-3.5 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white font-bold text-sm">
                    <Bot className="w-5 h-5" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#00529b] rounded-full" />
                </div>
                <div>
                  <h4 className="text-sm font-bold leading-tight">DIGITALXTRADE Live Support</h4>
                  <span className="text-[10px] text-emerald-300 font-medium">Online • Responds instantly</span>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white p-1 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* MESSAGES CONTAINER */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  {msg.sender === 'agent' && (
                    <span className="text-[10px] text-slate-400 font-medium mb-1 ml-1">{msg.name}</span>
                  )}
                  <div
                    className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-[#0085d0] text-white rounded-tr-none'
                        : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-slate-400 mt-1 px-1">{msg.time}</span>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-xs text-slate-400 italic bg-white p-2.5 rounded-2xl border border-slate-200 w-fit">
                  <span className="w-1.5 h-1.5 bg-[#0085d0] rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-[#0085d0] rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-[#0085d0] rounded-full animate-bounce [animation-delay:0.4s]" />
                  <span>Support is typing...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* QUICK SUGGESTION CHIPS */}
            <div className="px-3 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto text-[11px] scrollbar-none">
              <button
                onClick={() => handleSendMessage('How do I open an account?')}
                className="whitespace-nowrap bg-slate-100 hover:bg-[#0085d0] hover:text-white px-2.5 py-1 rounded-full text-slate-600 transition-colors shrink-0"
              >
                How to open account?
              </button>
              <button
                onClick={() => handleSendMessage('What is the minimum deposit?')}
                className="whitespace-nowrap bg-slate-100 hover:bg-[#0085d0] hover:text-white px-2.5 py-1 rounded-full text-slate-600 transition-colors shrink-0"
              >
                Minimum deposit?
              </button>
              <button
                onClick={() => handleSendMessage('How long do withdrawals take?')}
                className="whitespace-nowrap bg-slate-100 hover:bg-[#0085d0] hover:text-white px-2.5 py-1 rounded-full text-slate-600 transition-colors shrink-0"
              >
                Withdrawal times?
              </button>
            </div>

            {/* INPUT FIELD & SEND BUTTON */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Type your message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 bg-slate-100 border border-slate-200 rounded-full px-4 py-2 text-xs focus:outline-none focus:border-[#0085d0] focus:bg-white transition-all text-slate-800"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="w-8 h-8 rounded-full bg-[#0085d0] hover:bg-[#0072ce] text-white flex items-center justify-center transition-colors disabled:opacity-40 shrink-0 shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
