import React, { useState, useEffect } from 'react';
import adminService from '../../services/adminService';
import { ToastNotification, ConfirmModal } from '../../components/admin/AdminModals';
import { Mail, Check, Trash2, Clock, CheckCircle } from 'lucide-react';

export const MessagesInboxPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [activeMessage, setActiveMessage] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null, sender: '' });

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await adminService.getMessages();
      setMessages(res.data || []);
      if (res.data?.length > 0 && !activeMessage) {
        setActiveMessage(res.data[0]);
      }
    } catch (err) {
      setToast({ type: 'error', message: err.message || 'Failed to load messages.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleToggleRead = async (id) => {
    try {
      const res = await adminService.toggleMessageRead(id);
      setMessages((prev) =>
        prev.map((m) => (m._id === id ? { ...m, isRead: res.data.isRead } : m))
      );
      if (activeMessage?._id === id) {
        setActiveMessage((prev) => ({ ...prev, isRead: res.data.isRead }));
      }
    } catch (err) {
      setToast({ type: 'error', message: 'Failed to update read status.' });
    }
  };

  const handleDelete = async () => {
    try {
      await adminService.deleteMessage(deleteModal.id);
      setToast({ type: 'success', message: 'Message deleted successfully.' });
      setMessages((prev) => prev.filter((m) => m._id !== deleteModal.id));
      if (activeMessage?._id === deleteModal.id) {
        setActiveMessage(null);
      }
    } catch (err) {
      setToast({ type: 'error', message: 'Failed to delete message.' });
    } finally {
      setDeleteModal({ isOpen: false, id: null, sender: '' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Recruiter & Client Inquiries</h2>
          <p className="text-sm text-slate-400">
            Messages received through the public portfolio contact form.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[500px]">
        {/* Messages List Column */}
        <div className="lg:col-span-5 bg-navy-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-800 bg-navy-950/40 text-xs font-mono text-slate-400 flex items-center justify-between">
            <span>Inbox ({messages.length})</span>
            <span>{messages.filter((m) => !m.isRead).length} Unread</span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60">
            {loading ? (
              <div className="p-8 text-center text-xs font-mono text-slate-500">Loading inbox...</div>
            ) : messages.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                No inquiries received yet.
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg._id}
                  onClick={() => {
                    setActiveMessage(msg);
                    if (!msg.isRead) {
                      handleToggleRead(msg._id);
                    }
                  }}
                  className={`p-4 cursor-pointer transition-colors text-left ${
                    activeMessage?._id === msg._id
                      ? 'bg-electric-cyan/10 border-l-2 border-electric-cyan'
                      : 'hover:bg-white/[0.02]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span
                      className={`text-sm font-semibold truncate ${
                        !msg.isRead ? 'text-white' : 'text-slate-300'
                      }`}
                    >
                      {msg.name}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 shrink-0">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 truncate font-mono">{msg.subject || 'General Inquiry'}</p>
                  <p className="text-xs text-slate-500 truncate mt-1">{msg.message}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Message Viewer Column */}
        <div className="lg:col-span-7 bg-navy-900 border border-slate-800 rounded-xl p-6 flex flex-col">
          {activeMessage ? (
            <div className="flex-1 flex flex-col space-y-4">
              <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">{activeMessage.subject || 'General Inquiry'}</h3>
                  <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-slate-400">
                    <span>
                      From: <strong className="text-white">{activeMessage.name}</strong>
                    </span>
                    <span>
                      Email:{' '}
                      <a
                        href={`mailto:${activeMessage.email}`}
                        className="text-electric-cyan hover:underline"
                      >
                        {activeMessage.email}
                      </a>
                    </span>
                    <span>Received: {new Date(activeMessage.createdAt).toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleRead(activeMessage._id)}
                    className="p-1.5 text-xs font-mono rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    title={activeMessage.isRead ? 'Mark as Unread' : 'Mark as Read'}
                  >
                    {activeMessage.isRead ? 'Mark Unread' : 'Mark Read'}
                  </button>
                  <button
                    onClick={() =>
                      setDeleteModal({
                        isOpen: true,
                        id: activeMessage._id,
                        sender: activeMessage.name,
                      })
                    }
                    className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded transition-colors"
                    title="Delete Message"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Message Content */}
              <div className="flex-1 bg-navy-950/60 border border-slate-800 rounded-xl p-5 overflow-y-auto">
                <p className="text-sm text-slate-200 whitespace-pre-wrap leading-relaxed">
                  {activeMessage.message}
                </p>
              </div>

              {/* Quick Reply Button */}
              <div className="pt-2">
                <a
                  href={`mailto:${activeMessage.email}?subject=Re: ${encodeURIComponent(
                    activeMessage.subject || 'Portfolio Inquiry'
                  )}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-electric-cyan text-navy-950 font-semibold text-xs tracking-wide shadow-glow-cyan hover:bg-electric-blue hover:text-white transition-all"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Reply via Email Client</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-500 text-xs">
              <Mail className="w-8 h-8 text-slate-700 mb-2" />
              <span>Select an inquiry from the inbox to read details.</span>
            </div>
          )}
        </div>
      </div>

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title="Delete Message?"
        message={`Delete inquiry from ${deleteModal.sender}?`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteModal({ isOpen: false, id: null, sender: '' })}
      />

      {toast && (
        <ToastNotification
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default MessagesInboxPage;
