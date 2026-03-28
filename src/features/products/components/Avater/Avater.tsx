"use client";

import { useState } from "react";
import { Send, X, Bot } from "lucide-react";
import { useSupportApiMutation } from "@/store/api/AssistantApi/Assistant";
import Image from "next/image";
import avater from "../../../../../public/Image/Assitant.webp"

const Assistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [supportApi, { isLoading }] = useSupportApiMutation();

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await supportApi({ prompt: message }).unwrap();
      setReply(res?.data?.reply || res?.reply);
      setMessage("")
    } catch {
      setReply("Sorry, I'm having trouble connecting right now.");
    }
  };

  return (
    <div className="fixed bottom-8 right-6 z-[9999]">
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[320px] bg-white rounded-xl shadow-2xl border border-pink-900 overflow-hidden">
          <div className="bg-pink-600 p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <p className="font-bold text-sm">MarketHub Assistant</p>
            </div>
            <button onClick={() => setIsOpen(false)}><X size={20} /></button>
          </div>

          <div className="h-[300px] p-4 bg-gray-50 overflow-y-auto text-sm">
            {message && <div className="bg-pink-600 text-white p-2 rounded-lg mb-2 ml-auto w-fit">{message}</div>}
            {isLoading ? <div className="text-gray-400 animate-pulse">Thinking...</div> : 
             reply && <div className="bg-white border p-2 rounded-lg w-fit shadow-sm">{reply}</div>}
          </div>

          <form onSubmit={handleSendMessage} className="p-3 border-t flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type message..."
              className="flex-1 bg-gray-100 rounded-lg px-4 py-2 outline-none text-sm"
            />
            <button type="submit" disabled={isLoading} className="bg-pink-600 text-white p-2 rounded-full">
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

    
        <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative bg-black w-14 h-14 rounded-full flex items-center justify-center ring-2 ring-pink-600 ring-offset-2 hover:ring-4 transition-all duration-300 active:scale-90"
      >
        <Image
          src={avater}
          alt="Assistant Avatar"
          width={100}
          height={100}
          priority
          className="rounded-full object-cover w-full h-full"
        />

        <span className="absolute top-0.5 right-0.5 h-3.5 w-3.5 bg-green-500 rounded-full border-2 border-white animate-pulse shadow-sm"></span>
      </button>
     </div>
    
  );
};

export default Assistant;