import { MessageCircle } from "lucide-react";

export default function WhatsAppChat() {
  const phoneNumber = "923008034037"; // Apna WhatsApp number yahan likhein
  const message = "Hi Shoaib! I visited your portfolio and would like to discuss a project.";

  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappURL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with me on WhatsApp"
      title="Chat on WhatsApp"
      className="fixed bottom-3 right-6 z-[100] flex h-14 w-14 items-center justify-center rounded-full border border-[#c5ff4a]/40 bg-[#c5ff4a] text-black shadow-[0_8px_30px_rgba(197,255,74,0.25)] transition-all duration-300 hover:scale-110 hover:shadow-[0_8px_35px_rgba(197,255,74,0.45)] sm:bottom-8 sm:right-8"
    >
      <MessageCircle size={27} strokeWidth={2.2} />

      <span className="absolute right-full mr-3 whitespace-nowrap rounded-lg border border-white/10 bg-[#111] px-3 py-2 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-300 hover:opacity-100">
        Chat with me
      </span>

      <span className="absolute right-0 top-0 h-3 w-3 rounded-full border-2 border-[#080808] bg-green-500" />
    </a>
  );
}
