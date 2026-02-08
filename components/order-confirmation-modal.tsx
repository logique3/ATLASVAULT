'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Copy, MessageCircle, Download, X } from 'lucide-react';
import {
  formatWhatsAppOrderMessage,
  getWhatsAppLink,
  copyToClipboard,
  downloadAsText,
  type OrderDetails,
} from '@/lib/whatsapp-formatter';
import { toast } from 'sonner';

interface OrderConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderDetails: OrderDetails;
  onConfirm?: () => void;
}

export function OrderConfirmationModal({
  isOpen,
  onClose,
  orderDetails,
  onConfirm,
}: OrderConfirmationModalProps) {
  const [messageText, setMessageText] = useState(
    formatWhatsAppOrderMessage(orderDetails)
  );
  const [copied, setCopied] = useState(false);

  const handleCopyToClipboard = async () => {
    try {
      await copyToClipboard(messageText);
      setCopied(true);
      toast.success('Copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy to clipboard');
    }
  };

  const handleDownload = () => {
    downloadAsText(
      messageText,
      `order-${Date.now()}.txt`
    );
    toast.success('Order downloaded');
  };

  const handleSendWhatsApp = () => {
    const whatsappUrl = getWhatsAppLink(messageText);
    window.open(whatsappUrl, '_blank');
    onConfirm?.();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Confirm Your Order</DialogTitle>
          <DialogDescription>
            Review and send your order via WhatsApp
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Order Summary */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Service</p>
                  <p className="font-semibold text-foreground">
                    {orderDetails.serviceName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Unit Price</p>
                  <p className="font-semibold text-foreground">
                    {orderDetails.price.toFixed(2)} TND
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Quantity</p>
                  <p className="font-semibold text-foreground">
                    {orderDetails.quantity}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Price</p>
                  <p className="font-semibold text-primary text-lg">
                    {orderDetails.totalPrice.toFixed(2)} TND
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Message Preview */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              WhatsApp Message Preview
            </label>
            <Textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className="font-mono text-sm h-64"
              readOnly
            />
            <p className="text-xs text-muted-foreground mt-2">
              You can edit this message before sending to WhatsApp
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 flex-wrap">
            <Button
              onClick={handleCopyToClipboard}
              variant="outline"
              className="gap-2 bg-transparent flex-1 min-w-48"
            >
              <Copy className="w-4 h-4" />
              {copied ? 'Copied!' : 'Copy Message'}
            </Button>
            <Button
              onClick={handleDownload}
              variant="outline"
              className="gap-2 bg-transparent flex-1 min-w-48"
            >
              <Download className="w-4 h-4" />
              Download
            </Button>
          </div>

          {/* WhatsApp Send Button */}
          <Button
            onClick={handleSendWhatsApp}
            className="w-full bg-[#25D366] hover:bg-[#22c043] text-white gap-2"
            size="lg"
          >
            <MessageCircle className="w-5 h-5" />
            Send via WhatsApp
          </Button>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-900">
              After sending, our support team will confirm your order and payment method.
              You can choose to pay with D17, Flouci, or Card.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
