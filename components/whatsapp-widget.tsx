'use client';

import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const quickMessages = [
  { label: 'Product Question', message: 'Hi, I have a question about a product.' },
  { label: 'Order Support', message: 'Hi, I need help with my order.' },
  { label: 'Technical Help', message: 'Hi, I need technical support.' },
  { label: 'Payment Issue', message: 'Hi, I have a payment problem.' },
];

export function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);

  const sendWhatsAppMessage = (message: string) => {
    const phoneNumber = '21695555555'; // Tunisian WhatsApp number
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce"
          title="Chat with us on WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-40 w-96 max-w-[calc(100vw-24px)] bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#25D366] to-[#20BA5A] px-6 py-4 flex items-center justify-between">
            <div>
              <h3 className="text-white font-semibold text-lg">AtlasVault Support</h3>
              <p className="text-green-100 text-sm">Usually replies within minutes</p>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                setSelectedMessage(null);
              }}
              className="text-white hover:bg-white/20 p-1 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Content */}
          <div className="p-4 bg-gray-50 min-h-64 flex flex-col">
            {!selectedMessage ? (
              <>
                <p className="text-sm text-foreground mb-4 font-medium">
                  How can we help you today?
                </p>
                <div className="flex flex-col gap-2">
                  {quickMessages.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => setSelectedMessage(item.message)}
                      className="text-left px-3 py-2 bg-white border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-sm text-foreground font-medium"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <p className="text-sm text-muted-foreground mb-4">
                  Your message will be sent to WhatsApp:
                </p>
                <div className="bg-white border border-border rounded-lg p-3 mb-4 text-sm text-foreground break-words">
                  {selectedMessage}
                </div>
                <div className="flex gap-2 mt-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedMessage(null)}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-[#25D366] hover:bg-[#20BA5A] text-white"
                    onClick={() => sendWhatsAppMessage(selectedMessage)}
                  >
                    Send Message
                  </Button>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="bg-white border-t border-border px-4 py-3 text-xs text-muted-foreground text-center">
            Powered by WhatsApp
          </div>
        </div>
      )}
    </>
  );
}
