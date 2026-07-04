"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Loader2, Plus, Trash2, Send } from "lucide-react";

export default function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const supabase = createClient();

  const fetchAnnouncements = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("announcements_ambassador")
      .select("*")
      .order("created_at", { ascending: false });

    setAnnouncements(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;
    
    setActionLoading(true);
    const { error } = await supabase
      .from("announcements_ambassador")
      .insert({ title, content });
      
    if (!error) {
      setTitle("");
      setContent("");
      fetchAnnouncements();
    } else {
      alert("Error posting announcement: " + error.message);
    }
    setActionLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this announcement?")) return;
    
    const { error } = await supabase
      .from("announcements_ambassador")
      .delete()
      .eq("id", id);
      
    if (!error) {
      setAnnouncements(prev => prev.filter(a => a.id !== id));
    } else {
      alert("Error deleting announcement: " + error.message);
    }
  };

  return (
    <main className="p-4 sm:p-6 md:p-8 max-w-7xl w-full font-semibold uppercase tracking-widest text-black dark:text-white">
      <div className="mb-10">
        <h1 className="text-xl sm:text-2xl mb-2 text-black dark:text-white tracking-tight">
          Manage Announcements
        </h1>
        <p className="text-[10px] sm:text-xs normal-case font-medium opacity-60 max-w-xl leading-relaxed">
          Broadcast messages to all ambassadors directly to their dashboard.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Create Form */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-[#1A1A1A] border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-sm">
            <h2 className="text-lg mb-6 flex items-center gap-2">
              <Plus size={18} className="text-[#5E0ED7]" />
              New Post
            </h2>
            
            <form onSubmit={handlePost} className="flex flex-col gap-4">
              <div>
                <label className="text-[10px] opacity-60 block mb-2">Title</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Townhall Meeting Tomorrow"
                  className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm normal-case outline-none focus:border-[#5E0ED7] transition-colors"
                  required
                />
              </div>
              
              <div>
                <label className="text-[10px] opacity-60 block mb-2">Message</label>
                <textarea 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Type your message here..."
                  className="w-full h-32 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm normal-case outline-none focus:border-[#5E0ED7] transition-colors resize-none"
                  required
                />
              </div>

              <button 
                type="submit"
                disabled={actionLoading}
                className="mt-2 w-full bg-[#5E0ED7] text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-[#4a0ba8] transition-colors disabled:opacity-50"
              >
                {actionLoading ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />}
                Publish Announcement
              </button>
            </form>
          </div>
        </div>

        {/* Existing Announcements */}
        <div className="lg:col-span-2">
          {loading ? (
            <div className="py-20 flex justify-center text-[#5E0ED7]">
              <Loader2 className="animate-spin" size={32} />
            </div>
          ) : announcements.length === 0 ? (
            <div className="bg-white dark:bg-[#1A1A1A] border border-slate-200 dark:border-white/10 rounded-3xl p-10 flex flex-col items-center justify-center text-center">
              <div className="text-[#5E0ED7] opacity-50 mb-4">
                <Send size={48} />
              </div>
              <h3 className="text-lg">No Announcements</h3>
              <p className="text-xs normal-case font-medium opacity-60 mt-2 max-w-sm">
                You haven't posted any announcements yet. Create one using the form.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="bg-white dark:bg-[#1A1A1A] border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row gap-6 items-start transition-colors hover:border-[#5E0ED7]/30">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-base tracking-tight text-[#5E0ED7]">{announcement.title}</h3>
                      {!announcement.active && (
                        <span className="text-[9px] bg-red-500/10 text-red-500 px-2 py-1 rounded-md">Draft</span>
                      )}
                    </div>
                    <div className="text-[9px] opacity-40 mb-4">
                      {new Date(announcement.created_at).toLocaleString()}
                    </div>
                    <p className="text-sm normal-case font-medium opacity-80 whitespace-pre-wrap break-words leading-relaxed">
                      {announcement.content}
                    </p>
                  </div>
                  
                  <button 
                    onClick={() => handleDelete(announcement.id)}
                    className="shrink-0 p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500/20 transition-colors"
                    title="Delete Announcement"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
