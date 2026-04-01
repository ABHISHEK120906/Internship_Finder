const axios = require('axios');
const nodemailer = require('nodemailer');
require('dotenv').config();

class TrackerService {
  static async sendWhatsApp(message) {
    try {
      const url = `https://api.callmebot.com/whatsapp.php?phone=${process.env.WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}&apikey=${process.env.CALLMEBOT_APIKEY}`;
      await axios.get(url);
    } catch (error) {
      console.error('❌ WhatsApp Notification Failed:', error.message);
    }
  }

  static async sendTelegram(message) {
    try {
      const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
      await axios.post(url, {
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown'
      });
    } catch (error) {
      console.error('❌ Telegram Notification Failed:', error.message);
    }
  }

  static async sendDiscord(payload) {
    try {
      const colors = {
        'Page Visit': 65280,
        'Click': 16776960,
        'Form Submit': 255,
        'File Download': 16711680,
        'Exit Intent': 16777215
      };

      const embed = {
        title: `🚨 ${payload.action} Alert!`,
        color: colors[payload.action] || 3447003,
        timestamp: new Date().toISOString(),
        fields: [
          { name: '📄 Page', value: payload.page || 'Unknown', inline: true },
          { name: '📍 Location', value: payload.location || 'Unknown', inline: true },
          { name: '📱 Device', value: payload.device || 'Desktop', inline: true },
          { name: '🌐 IP', value: payload.ip || 'Hidden', inline: true },
          { name: '🔗 From', value: payload.referrer || 'Direct', inline: false },
          { name: '⏱️ Session', value: payload.timeOnPage || '0s', inline: true }
        ]
      };

      await axios.post(process.env.DISCORD_WEBHOOK_URL, { embeds: [embed] });
    } catch (error) {
      console.error('❌ Discord Notification Failed:', error.message);
    }
  }

  static async sendEmail(payload) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD
        }
      });

      const mailOptions = {
        from: process.env.GMAIL_USER,
        to: process.env.GMAIL_USER,
        subject: `🚨 [${payload.action}] on Your Website — ${new Date().toLocaleTimeString()}`,
        html: `
          <h3>Visitor Activity Details</h3>
          <table border="1" cellpadding="10" style="border-collapse: collapse;">
            <tr style="background-color: #f2f2f2;"><th>Action</th><td>${payload.action}</td></tr>
            <tr><th>Page</th><td>${payload.page}</td></tr>
            <tr><th>Location</th><td>${payload.location}</td></tr>
            <tr><th>IP Address</th><td>${payload.ip}</td></tr>
            <tr><th>Device</th><td>${payload.device}</td></tr>
            <tr><th>Session Time</th><td>${payload.timeOnPage}</td></tr>
            <tr><th>Referrer</th><td>${payload.referrer}</td></tr>
          </table>
        `
      };

      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('❌ Email Notification Failed:', error.message);
    }
  }

  static async dispatchAll(payload) {
    const message = `🚨 *Visitor Alert - ${payload.action}*\n📄 *Page:* ${payload.page}\n📍 *Loc:* ${payload.location}\n📱 *Dev:* ${payload.device}\n⏱️ *Time:* ${payload.timeOnPage}`;
    
    // Fire all notifications in parallel (Settled so one failure doesn't block others)
    await Promise.allSettled([
      this.sendWhatsApp(message.replace(/\*/g, '')), // No bold for WhatsApp
      this.sendTelegram(message),
      this.sendDiscord(payload),
      this.sendEmail(payload)
    ]);
  }
}

module.exports = TrackerService;
