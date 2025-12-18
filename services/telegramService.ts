
import { OrderData } from '../types';

/**
 * Sends order details and screenshot to the Telegram Bot.
 */
export const sendOrderToTelegram = async (order: OrderData): Promise<boolean> => {
  // Replace these with your real Bot Token and Chat ID.
  // Tip: You can get CHAT_ID by messaging @userinfobot on Telegram.
  const BOT_TOKEN = '7611728277:AAFs7WdC_S9Wv7_tF7q7E_U_v_S7S_v7S_v'; 
  const CHAT_ID = '123456789'; 
  
  const message = `
🌟 **TK GAME SHOP - NEW ORDER** 🌟
━━━━━━━━━━━━━━━━━━━━
🎮 **Game:** Mobile Legends (MLBB)
💎 **Package:** ${order.package}
━━━━━━━━━━━━━━━━━━━━
👤 **Player Details:**
🆔 **MLBB ID:** \`${order.mlbbId}\`
🌐 **Server ID:** \`${order.serverId}\`
━━━━━━━━━━━━━━━━━━━━
⏰ **Order Time:** ${order.timestamp}
━━━━━━━━━━━━━━━━━━━━
✅ *Please verify screenshot below.*
`;

  try {
    const formData = new FormData();
    formData.append('chat_id', CHAT_ID);
    formData.append('caption', message);
    formData.append('parse_mode', 'Markdown');
    if (order.screenshot) {
      formData.append('photo', order.screenshot);
    } else {
      // Fallback to sendMessage if no photo
      const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: 'Markdown'
        })
      });
      return response.ok;
    }

    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Telegram API Error Response:', errorText);
      throw new Error('Failed to send telegram message');
    }

    return true;
  } catch (error) {
    console.error('Telegram Service Error:', error);
    // Even if it fails, we might want to return true for UI purposes if testing without real keys
    // but for production, this should be real error handling.
    return false;
  }
};
