const { Telegraf } = require('telegraf')
const bot = new Telegraf('6629597449:AAH8c_aBjFaTkakzy_IbXMC5JUvBX4wGwwc')
const axios = require('axios')

bot.command('start', ctx => {
    // ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, '📌 APPROVAL DOCUMENT\n📌 FRM-FSS-031\n📌 Nodoc: CFX/001/23/I/XXX', {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Approval', callback_data: 'Approval' }
                ],
                [
                    { text: 'Disapproval', callback_data: 'Disapproval' }
                ],
            ]
        }
    })
})

bot.action('Approval', ctx => {
    // ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, '✅ Done Thank you', {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Back to main menu', callback_data: 'menu' }
                ]
            ]
        }
    });
})

bot.launch()

// Enable graceful stop
// process.once('SIGINT', () => bot.stop('SIGINT'))
// process.once('SIGTERM', () => bot.stop('SIGTERM'))