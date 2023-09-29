const { Telegraf } = require('telegraf');
const axios = require('axios');
require('dotenv').config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new Telegraf(token, { polling: true });

bot.start(async (ctx) => {
    const welcome = `🔗 Selamat Datang 🔗\n\n`+
                    `🏟 Informasi PPIC\n\n`+
                    `📌 Untuk Mendapatkan informasi silahkan melakukan Verifikasi\n\n`+
                    `📲 Gunakanlah Media Sosial dengan Bijak \n\n`+
                    `🔑 your ID : ${ctx.chat.id}`;

    await ctx.telegram.sendMessage(ctx.chat.id, welcome, {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "Verifikasi Data", callback_data: 'verify_data' }
                ]
            ]
        }
    })
});

bot.action('verify_data', async (ctx) => {
    const clientInfo = await fetchClientInfo(ctx.from.id);
    
    if (clientInfo) {
        const { phoneNumber, chatId, name } = clientInfo;

        const message = `📱 Nomor Handphone: ${phoneNumber}\n\n` +
                        `👤 Nama Klien: ${name}\n\n` +
                        `💬 Chat ID: ${chatId}\n\n` +
                        `➾ Your ID: ${ctx.from.id}`;
        await sendNoficication(chatId, message, { parse_mode: "HTML" });
    }
});

async function sendNoficication(chatId, message, options) {
    try {
        await bot.telegram.sendMessage(chatId, message, options);
    } catch (error) {
        console.error('Gagal mengirim notifikasi:',  error);   
    }
}


async function fetchClientInfo(userId) {
    const clientInfo = {
        phoneNumber: '+6282289687844',
        chatId: userId,
        name: "Nanda Tritona"
    }

    return clientInfo;
}

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));