export interface OrderDetails {
  customerName: string;
  customerEmail: string;
  serviceName: string;
  serviceDescription: string;
  price: number;
  quantity: number;
  totalPrice: number;
  paymentMethods?: string[]; // D17, Flouci, Card
}

export function formatWhatsAppOrderMessage(order: OrderDetails): string {
  const message = `
*ATLASAVAULT ORDER REQUEST* 📦

*Customer Information*
━━━━━━━━━━━━━━━━━━━━━
Name: ${order.customerName}
Email: ${order.customerEmail}

*Service Details*
━━━━━━━━━━━━━━━━━━━━━
Service: ${order.serviceName}
Description: ${order.serviceDescription}
Unit Price: ${order.price.toFixed(2)} TND
Quantity: ${order.quantity}

*Order Summary*
━━━━━━━━━━━━━━━━━━━━━
Total Amount: *${order.totalPrice.toFixed(2)} TND*

*Payment Method*
━━━━━━━━━━━━━━━━━━━━━
Available methods:
• Dinars 17 (D17)
• Flouci
• Credit/Debit Card

*Next Steps*
━━━━━━━━━━━━━━━━━━━━━
1. Confirm this order
2. Choose your payment method
3. Complete payment
4. Receive service credentials immediately

We're here to help! Reply to confirm this order or ask any questions.

Thank you for choosing AtlasVault! 🙏
  `.trim();

  return message;
}

export function formatWhatsAppCartMessage(
  items: Array<{
    name: string;
    price: number;
    quantity: number;
  }>,
  customerName: string,
  customerEmail: string
): string {
  let itemsList = '';
  let total = 0;

  items.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    itemsList += `\n• ${item.name} x${item.quantity} = ${itemTotal.toFixed(2)} TND`;
  });

  const message = `
*ATLASAVAULT CART ORDER* 🛒

*Customer Information*
━━━━━━━━━━━━━━━━━━━━━
Name: ${customerName}
Email: ${customerEmail}

*Items Ordered*
━━━━━━━━━━━━━━━━━━━━━${itemsList}

*Order Summary*
━━━━━━━━━━━━━━━━━━━━━
Total Amount: *${total.toFixed(2)} TND*

*Payment Methods Available*
━━━━━━━━━━━━━━━━━━━━━
✓ Dinars 17 (D17)
✓ Flouci
✓ Credit/Debit Card

Please confirm this order to proceed.

Thank you! 🎉
  `.trim();

  return message;
}

export function formatWhatsAppSupportMessage(
  subject: string,
  message: string,
  userEmail: string
): string {
  const supportMessage = `
*ATLASAVAULT SUPPORT REQUEST* 💬

*Sender Information*
━━━━━━━━━━━━━━━━━━━━━
Email: ${userEmail}

*Subject*
━━━━━━━━━━━━━━━━━━━━━
${subject}

*Message*
━━━━━━━━━━━━━━━━━━━━━
${message}

We'll respond as soon as possible. Thank you for reaching out! 🙏
  `.trim();

  return supportMessage;
}

export function getWhatsAppLink(message: string, phoneNumber: string = '21695555555'): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}

export function downloadAsText(text: string, filename: string = 'order.txt'): void {
  const element = document.createElement('a');
  element.setAttribute(
    'href',
    'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
  );
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
