import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Send, Loader2 } from "lucide-react"; // Matching your icon set

const Contact = () => {
  const [senderName, setSenderName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMessage = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .post(
        "http://localhost:4000/api/v1/message/send",
        { senderName, subject, message },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        setSenderName("");
        setSubject("");
        setMessage("");
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setLoading(false);
      });
  };

  return (
    <section className="min-h-screen py-20 px-6 sm:px-10 lg:px-24 bg-[#050B1E] mt-25" >
      <div className="max-w-4xl mx-auto">
        
        {/* SECTION HEADING */}
        <div className="relative mb-16 flex flex-col items-center">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter text-center uppercase opacity-5 select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
            REACH OUT
          </h1>
          <h2 className="relative z-10 text-3xl sm:text-5xl font-bold tracking-[10px] text-white uppercase">
            Contact <span className="text-emerald-400">Me</span>
          </h2>
          <div className="w-16 h-1.5 bg-emerald-400 mt-4 rounded-full shadow-[0_0_15px_rgba(52,211,153,0.5)]"></div>
        </div>

        {/* CONTACT FORM CARD */}
        <div className="bg-[#0B132E]/50 border border-slate-800 p-8 sm:p-12 rounded-3xl backdrop-blur-md shadow-2xl">
          <form onSubmit={handleMessage} className="flex flex-col gap-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Name Field */}
              <div className="flex flex-col gap-3">
                <Label className="text-slate-300 ml-1 text-sm font-medium tracking-wide">Your Name</Label>
                <Input
                  className="bg-[#050B1E]/50 border-slate-700 focus:border-emerald-400/50 h-12 rounded-xl text-white transition-all placeholder:text-slate-600"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="John Doe"
                  required
                />
              </div>

              {/* Subject Field */}
              <div className="flex flex-col gap-3">
                <Label className="text-slate-300 ml-1 text-sm font-medium tracking-wide">Subject</Label>
                <Input
                  className="bg-[#050B1E]/50 border-slate-700 focus:border-emerald-400/50 h-12 rounded-xl text-white transition-all placeholder:text-slate-600"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Project Inquiry"
                  required
                />
              </div>
            </div>

            {/* Message Field */}
            <div className="flex flex-col gap-3">
              <Label className="text-slate-300 ml-1 text-sm font-medium tracking-wide">Message</Label>
              <textarea
                className="flex w-full bg-[#050B1E]/50 border border-slate-700 focus:border-emerald-400/50 min-h-[150px] p-4 rounded-xl text-white transition-all placeholder:text-slate-600 outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can I help you?"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center sm:justify-end mt-4">
              {!loading ? (
                <Button 
                  type="submit"
                  className="w-full sm:w-auto px-10 py-6 bg-white text-black hover:bg-emerald-400 hover:text-white rounded-full font-bold transition-all duration-300 flex items-center gap-2 group shadow-lg"
                >
                  Send Message
                  <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>
              ) : (
                <Button 
                  disabled 
                  className="w-full sm:w-auto px-10 py-6 bg-slate-800 text-slate-400 rounded-full flex items-center gap-2 cursor-not-allowed"
                >
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </Button>
              )}
            </div>
          </form>
        </div>

        {/* BOTTOM TEXT */}
        <p className="text-center text-slate-500 mt-12 text-sm tracking-widest uppercase opacity-50">
          Typically responds within 24 hours
        </p>
      </div>
    </section>
  );
};

export default Contact;