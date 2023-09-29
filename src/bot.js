const { Telegraf } = require('telegraf');
// const fetch = require('node-fetch');
const axios = require('axios');

const bot = new Telegraf('6585083528:AAFGrBwhztXeHrgmomY8w8Gi365U5D6mF3c');

bot.start(async (ctx) => {
    const welcome = `⚈ <b>Selamat Datang</b> ⚈\n\n🔎 Notifikasi Dokumen PPIC\n\n➾ Untuk Mendapatkan informasi silahkan lakukan Verifikasi data terlebih dahulu\n\n➾  Gunakanlah Media Sosial dengan Bijak \n\n ➾ your ID : ${ctx.from.id}`;
    await ctx.replyWithHTML(`${welcome}`);
  
    // Verifikasi data atau tindakan pengguna di sini
    // Misalnya, Anda dapat meminta pengguna untuk memasukkan nama atau informasi lainnya.
  
    // Setelah verifikasi data, kirim notifikasi
    await sendNotification(ctx.from.id, 'Ini adalah notifikasi dari bot PPIC.');
});

async function sendNotification(userId, message) {
    try {
        await bot.telegram.sendMessage(userId, message);
    } catch (error) {
        console.error('Gagal mengirim notifikasi:', error);
    }
}

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));