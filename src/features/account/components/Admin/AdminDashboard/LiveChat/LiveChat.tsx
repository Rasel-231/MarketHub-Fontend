"use client";

import {
  useDeleteContactMessagesMutation,
  useGetAllContactMessagesQuery,
  useSupportReplyMutation,
} from "@/store/api/contactMessageApi/messageApi";
import { IContact } from "@/types/types";
import {
  Send,
  Search,
  MoreVertical,
  Menu,
  X,
  MessageSquare,
  Mail,
  Clock,
  User,
} from "lucide-react";
import { useState, useMemo, ChangeEvent, FormEvent } from "react";
import { toast } from "react-toastify";

const AdminChatDashboard = () => {
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [replyText, setReplyText] = useState<string>("");

  const { data: response, isLoading } =
    useGetAllContactMessagesQuery(undefined);
  const [supportReply, { isLoading: isSending }] = useSupportReplyMutation();
  const [deleteContactMessages] =
    useDeleteContactMessagesMutation();

  const messages: IContact[] = useMemo(() => {
    const allData = (response?.data as IContact[]) || [];
    return allData.filter((msg: IContact) => !msg.isSupport);
  }, [response]);

  const filteredMessages = useMemo(() => {
    return messages.filter(
      (msg: IContact) =>
        msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.email.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [messages, searchQuery]);

  const activeMessage = useMemo(
    () => messages.find((m: IContact) => m.id === activeChatId),
    [messages, activeChatId],
  );



  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeMessage) return;

    try {
      const payload = {
        name: activeMessage.name,
        email: activeMessage.email,
        message: replyText,
        contactNumber: activeMessage.contactNumber,
      };

      await supportReply(payload).unwrap();
      toast.success(`Reply sent to ${activeMessage.email}`);
      setReplyText("");
      await deleteContactMessages(activeMessage.id).unwrap();
    } catch {
      toast.error("Failed to send reply.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="flex flex-col items-center gap-3 font-bold text-emerald-600 animate-pulse uppercase tracking-tighter">
          Loading Inbox...
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[100dvh] w-full bg-white dark:bg-gray-950 overflow-hidden font-nunito">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Customer List */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[320px] bg-white dark:bg-gray-900 border-r dark:border-gray-800 flex flex-col transition-transform md:relative md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-5 border-b dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="text-emerald-600" size={22} />
            <h2 className="text-xl font-black dark:text-white uppercase">
              Inbox
            </h2>
          </div>
          <button className="md:hidden" onClick={() => setIsSidebarOpen(false)}>
            <X size={20} className="dark:text-white" />
          </button>
        </div>

        <div className="p-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearchQuery(e.target.value)
              }
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 rounded-xl outline-none text-sm dark:text-white border dark:border-gray-700 focus:border-emerald-500 transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pb-4">
          {filteredMessages.map((sms: IContact) => (
            <div
              key={sms.id}
              onClick={() => {
                setActiveChatId(sms.id);
                setIsSidebarOpen(false);
              }}
              className={`p-4 mx-2 my-1 flex justify-between items-center gap-3 cursor-pointer rounded-2xl transition-all group ${activeChatId === sms.id ? "bg-emerald-600 text-white shadow-lg" : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"}`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`p-2 rounded-full shrink-0 ${activeChatId === sms.id ? "bg-white/20" : "bg-emerald-100 dark:bg-emerald-900/30"}`}
                >
                  <User
                    size={18}
                    className={
                      activeChatId === sms.id
                        ? "text-white"
                        : "text-emerald-600"
                    }
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-sm truncate">{sms.name}</h4>
                  <p className="text-[11px] truncate opacity-70">
                    {sms.message}
                  </p>
                </div>
              </div>

             
            </div>
          ))}
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-950 min-w-0">
        <header className="h-16 bg-white dark:bg-gray-900 border-b dark:border-gray-800 flex items-center justify-between px-6 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 dark:text-white"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            {activeMessage && (
              <div className="flex items-center gap-3 animate-in fade-in slide-in-from-left-2">
                <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold shadow-sm">
                  {activeMessage.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-sm dark:text-white leading-none">
                    {activeMessage.name}
                  </h3>
                </div>
              </div>
            )}
          </div>
          <MoreVertical size={20} className="text-gray-400 cursor-pointer" />
        </header>

        <section className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          {activeMessage ? (
            <div className="max-w-[90%] md:max-w-[75%] animate-in fade-in slide-in-from-bottom-2">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl rounded-bl-none shadow-sm border dark:border-gray-800">
                <p className="text-sm md:text-base dark:text-gray-200 font-medium leading-relaxed">
                  {activeMessage.message}
                </p>
                <div className="mt-4 pt-4 border-t dark:border-gray-800 flex flex-wrap gap-4 text-[11px] text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <Mail size={12} /> {activeMessage.email}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={12} />
                    {activeMessage?.createdAt
                      ? `${activeMessage.createdAt.slice(0, 10)} : ${new Date(activeMessage.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
                      : "Just Now"}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-30 select-none">
              <MessageSquare size={80} strokeWidth={1.5} />
              <p className="mt-4 font-black uppercase tracking-[0.2em] text-lg">
                Select a conversation
              </p>
            </div>
          )}
        </section>

        <footer className="p-4 md:p-6 bg-white dark:bg-gray-900 border-t dark:border-gray-800">
          <form
            onSubmit={handleSendMessage}
            className="max-w-5xl mx-auto flex items-center gap-3 bg-gray-50 dark:bg-gray-800 p-2 rounded-2xl border dark:border-gray-700 focus-within:ring-2 ring-emerald-500/20 transition-all"
          >
            <textarea
              placeholder={
                activeChatId ? "Write your reply..." : "Select a chat first..."
              }
              disabled={!activeChatId || isSending}
              value={replyText}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setReplyText(e.target.value)
              }
              className="flex-1 bg-transparent outline-none text-sm px-4 py-2 dark:text-white resize-none max-h-32"
              rows={1}
            />
            <button
              type="submit"
              disabled={!activeChatId || !replyText.trim() || isSending}
              className="p-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 disabled:opacity-30 shadow-lg active:scale-95 transition-all"
            >
              {isSending ? (
                <div className="h-5 w-5 animate-spin border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <Send size={20} />
              )}
            </button>
          </form>
        </footer>
      </main>
    </div>
  );
};

export default AdminChatDashboard;
