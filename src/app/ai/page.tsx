import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Chat",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AIPage() {
  return (
    <div className="fixed inset-0 h-screen w-screen">
      <iframe
        src="https://www.chatbase.co/chatbot-iframe/3UUGCMBjUv6eGg4EykDq1"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allow="microphone"
        title="Chatbase AI Chatbot"
      />
    </div>
  );
}
