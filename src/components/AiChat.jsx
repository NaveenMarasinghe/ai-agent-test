import React, { useEffect, useRef } from 'react';
import { Sparkles, User, Send } from 'lucide-react';

export default function AiChat({
  chatMessages,
  isAiTyping,
  chatInput,
  setChatInput,
  handleSendChat,
  handleQuickAction
}) {
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isAiTyping]);

  return (
    <div className="space-y-6 flex-1 flex flex-col justify-between overflow-hidden h-[calc(100vh-120px)]">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-500/30 animate-pulse">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">Aether AI Local Assistant</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Natural language engine for live system deployment tasks</p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
            MODEL: AETHER-O1
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-1 py-2 min-h-0">
        {chatMessages.map((msg, i) => (
          <div 
            key={i} 
            className={`flex gap-3 max-w-2xl ${
              msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
            }`}
          >
            <div className={`h-8 w-8 rounded-full shrink-0 flex items-center justify-center font-bold text-xs text-white shadow-sm ${
              msg.sender === 'user' 
                ? 'bg-gradient-to-tr from-indigo-500 to-indigo-600' 
                : 'bg-gradient-to-tr from-slate-800 to-slate-950'
            }`}>
              {msg.sender === 'user' ? <User className="h-4.5 w-4.5" /> : <Sparkles className="h-4.5 w-4.5 text-indigo-400" />}
            </div>

            <div className={`p-4 rounded-2xl text-xs leading-relaxed border shadow-sm ${
              msg.sender === 'user' 
                ? 'bg-indigo-600 text-white border-indigo-500' 
                : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-800'
            }`}>
              <div className="whitespace-pre-wrap">
                {msg.text.split('**').map((part, index) => 
                  index % 2 === 1 ? <strong key={index} className="font-bold text-indigo-500 dark:text-indigo-400">{part}</strong> : part
                )}
              </div>
              <span className="text-[9px] block text-right mt-2 text-slate-400 font-mono">{msg.timestamp}</span>
            </div>
          </div>
        ))}

        {isAiTyping && (
          <div className="flex gap-3 max-w-md">
            <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center">
              <Sparkles className="h-4.5 w-4.5 text-indigo-400 animate-spin" />
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 text-xs border border-slate-200 dark:border-slate-800 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
          </div>
        )}
        <div ref={chatEndRef}></div>
      </div>

      <div className="space-y-2 shrink-0">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Quick actions</p>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => handleQuickAction('Optimize current systems workflows')}
            className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-[11px] text-slate-600 dark:text-slate-300 hover:border-indigo-500/40 hover:text-indigo-500 transition-all font-mono"
          >
            ⚡ optimize workflows
          </button>
          <button 
            onClick={() => handleQuickAction('Create database backup snapshot')}
            className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-[11px] text-slate-600 dark:text-slate-300 hover:border-indigo-500/40 hover:text-indigo-500 transition-all font-mono"
          >
            💾 database backup
          </button>
          <button 
            onClick={() => handleQuickAction('Check node cluster infrastructure health')}
            className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-[11px] text-slate-600 dark:text-slate-300 hover:border-indigo-500/40 hover:text-indigo-500 transition-all font-mono"
          >
            🔍 cluster health
          </button>
        </div>
      </div>

      <form onSubmit={handleSendChat} className="flex items-center gap-3 bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg shrink-0">
        <input 
          type="text"
          placeholder="Ask Aether AI to optimize, backup, diagnose, or manage tasks..."
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          className="flex-1 text-xs px-4 py-3 bg-transparent text-slate-950 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
        />
        <button 
          type="submit"
          className="p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors shadow-md shadow-indigo-600/20 shrink-0"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}