import { useState } from "react";
import { toast } from "sonner";
import { Send, Bot } from "lucide-react";
import { motion } from "framer-motion";

// ✅ MathCaptcha Component
const MathCaptcha = ({ onVerify }) => {
  const [num1] = useState(Math.floor(Math.random() * 10) + 1);
  const [num2] = useState(Math.floor(Math.random() * 10) + 1);
  const [answer, setAnswer] = useState("");
  const correctAnswer = num1 + num2;

  const checkAnswer = (val) => {
    setAnswer(val);
    if (parseInt(val) === correctAnswer) {
      toast.success("Captcha Verified ✅");
      onVerify(true);
    } else {
      onVerify(false);
    }
  };

  return (
    <div className="mt-4">
      <label className="font-semibold">Security Check</label>
      <div className="flex items-center gap-2 mt-2">
        <span className="px-3 py-2 bg-slate-900 text-white rounded">{num1} + {num2} =</span>
        <input
          type="number"
          value={answer}
          onChange={(e) => checkAnswer(e.target.value)}
          className="p-2 border bg-slate-900 text-white rounded w-20"
          placeholder="?"
        />
      </div>
      {answer && parseInt(answer) !== correctAnswer && (
        <p className="text-sm text-red-500 mt-1">Incorrect answer</p>
      )}
    </div>
  );
};

// ✅ Chatbot Component
const Chatbot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your AI assistant. How can I help you?", bot: true }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages(prev => [
      ...prev,
      { text: input, bot: false },
      { text: "Thanks for your message! 🚀", bot: true }
    ]);
    setInput("");
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-4 right-4 w-80 h-96 bg-white border shadow-lg rounded flex flex-col z-50"
    >
      <div className="flex justify-between items-center p-3 bg-blue-600 text-white rounded-t">
        <div className="flex items-center gap-2">
          <Bot size={18} /> Chatbot
        </div>
        <button onClick={onClose} className="text-white text-lg">✕</button>
      </div>
      <div className="flex-1 p-3 overflow-y-auto space-y-2">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-2 rounded max-w-[75%] ${m.bot ? "bg-gray-100 text-gray-800 self-start" : "bg-blue-500 text-white self-end"}`}
          >
            {m.text}
          </div>
        ))}
      </div>
      <div className="p-2 border-t flex gap-2">
        <input
          className="flex-1 p-2 border rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} className="bg-blue-600 text-white px-3 rounded">
          <Send size={16} />
        </button>
      </div>
    </motion.div>
  );
};

// ✅ ContactSection Component
const ContactSection = ({ isDark }) => {
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isCaptchaVerified) {
      toast.error("Please complete the security verification first! 🛡️");
      return;
    }

    try {
      const response = await fetch("https://formspree.io/f/xblabqed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          captcha_verified: true,
          timestamp: new Date().toISOString()
        }),
      });

      if (response.ok) {
        toast.success("Message sent successfully! We'll get back to you within 24 hours. 🚀");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setIsCaptchaVerified(false);
      } else {
        throw new Error("Formspree failed");
      }
    } catch (error) {
      const subject = encodeURIComponent(formData.subject);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      window.location.href = `mailto:teamforzentix@gmail.com?subject=${subject}&body=${body}`;
      toast.success("Opening email client... Message details have been pre-filled!");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsCaptchaVerified(false);
    }
  };

  return (
    <section
      id="contact"
      className={`py-20 backdrop-blur-md ${
        isDark
          ? "bg-gradient-to-br from-gray-900/80 via-black/70 to-gray-900/80 text-white"
          : "bg-gradient-to-br from-blue-50/80 via-white/70 to-purple-50/80 text-gray-900"
      }`}
    >
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-6">Contact Us</h2>
        <form
          onSubmit={handleSubmit}
          className={`grid gap-4 p-6 rounded-xl shadow-lg backdrop-blur-md ${
            isDark
              ? "bg-gradient-to-br from-gray-900/60 via-black/50 to-gray-900/60 text-white"
              : "bg-gradient-to-br from-blue-50/80 via-white/70 to-purple-50/80 text-gray-900"
          }`}
        >
          <input name="name" value={formData.name} onChange={handleChange} type="text" placeholder="Your Name" className="p-3 border rounded" required />
          <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Your Email" className="p-3 border rounded" required />
          <input name="subject" value={formData.subject} onChange={handleChange} type="text" placeholder="Subject" className="p-3 border rounded" required />
          <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your Message" className="p-3 border rounded h-32" required />
          <MathCaptcha onVerify={setIsCaptchaVerified} />
          <button type="submit" className="bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition">
            Send Message
          </button>
        </form>

        <div className="text-center mt-6">
          <button
            onClick={() => setIsChatbotOpen(true)}
            className="underline text-blue-600 hover:text-blue-800 transition"
          >
            💬 Need help? Chat with us
          </button>
        </div>
      </div>
      <Chatbot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
    </section>
  );
};

export default ContactSection;
