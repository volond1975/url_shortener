const ngrok = require('./get_public_url');
//const KeboardGenerator = require('./keboardGenerator');
//https://www.npmjs.com/package/ngrok
//npm install ngrok - g
//ngrok http 8080
const gasURL = 'https://script.google.com/macros/s/AKfycbxwMy_C_fPwYcwPHmHm83iesUB1RBB35iTEO5H7r92Jybxshc9C_2YmpBpIgl_DuDhwvw/exec'
const axios = require('axios');

console.log(axios.isCancel('something'));

const ViberBot = require('viber-bot').Bot;
const winston = require('winston');
const toYAML = require('winston-console-formatter');
const BotEvents = require('viber-bot').Events;
const TextMessage = require('viber-bot').Message.Text;
const UrlMessage = require('viber-bot').Message.Url;
const ContactMessage = require('viber-bot').Message.Contact;
const PictureMessage = require('viber-bot').Message.Picture;
const VideoMessage = require('viber-bot').Message.Video;
const LocationMessage = require('viber-bot').Message.Location;
const StickerMessage = require('viber-bot').Message.Sticker;
const RichMediaMessage = require('viber-bot').Message.RichMedia;
const KeyboardMessage = require('viber-bot').Message.Keyboard;

//https://www.8host.com/blog/logirovanie-prilozheniya-node-js-s-pomoshhyu-winston/
function createLogger() {
    const logger = new winston.Logger({
        level: "debug" // We recommend using the debug level for development
    });

    logger.add(winston.transports.Console, toYAML.config());
    return logger;
}
const logger = createLogger();

function say(response, message) {
    response.send(new TextMessage(message));
}


// Creating the bot with access token, name and avatar
const bot = new ViberBot(logger, {
    authToken: "5028f82533e7e1c7-822f6a46188df99a-bd6120df9519d64d",
    name: "telegram_me",
    avatar: "https://cs1.livemaster.ru/storage/c9/7d/4e5b751b69da9f1f487d7a7658qo--materialy-dlya-tvorchestva-master-klass-mishka-klubnichka.jpg"
});
// Perfect! Now here's the key part:


var keyboardObject = {
    Type: 'keyboard',
    DefaultHeight: false,
    min_api_version: 3,
    Buttons: [{
        Columns: '6',
        Rows: '1',
        BgColor: '#FFFFFF',
        ActionType: 'share-phone',
        ActionBody: 'reply',
        Text: '<font color=#FFFFFF><b>Вслед за кораблем</b></font>',
        TextVAlign: 'middle',
        TextHAlign: 'center',
        TextSize: 'large'
    }]
}

var KEYBOARD_JSON = {
    Type: 'keyboard',
    DefaultHeight: false,
    Buttons: [{
            Columns: '6',
            Rows: '1',
            BgColor: '#FFFFFF',
            ActionType: 'reply',
            ActionBody: 'Мова солов\'їна',
            Text: '<font color=#FFFFFF><b>Мова солов\'їна</b></font>',
            TextVAlign: 'middle',
            TextHAlign: 'center',
            TextSize: 'large'
        },
        {
            Columns: '6',
            Rows: '1',
            BgColor: '#FFFFFF',
            ActionType: 'reply',
            ActionBody: 'Вслед за кораблем',
            Text: '<font color=#FFFFFF><b>Вслед за кораблем</b></font>',
            TextVAlign: 'middle',
            TextHAlign: 'center',
            TextSize: 'large'
        }
    ]
}

const message = new TextMessage("new text", null, null, null, null, 3);

bot.onConversationStarted((userProfile, isSubscribed, context) => {
    console.log("onConversationStarted")
    console.log(userProfile)
        /*
    Request data: {"event":"conversation_started","timestamp":1669718262846,"chat_hostname":"SN-193_","message_token":5778326890086572728,"type":"open","user":{"id":"JSSHhZUuswNZpUVSn9Y6gg==","name":"\u0412\u043B\u0430\u0434\u0438\u043C\u0438\u0440","avatar":"https://media-direct.cdn.viber.com/download_photo?dlid=tdH_m8fh5zMl-ChQeNkK42BO2Jvx48Db3lFRl3-wZs4DsKXzWZgcCqmY_WEZaY3LbmVUipqMm6cRxLaWLAfMK2uW_KV-1HxvxZ2qQYUsn65w67vxvPQ9HNfTujMon13wITIpIg&fltp=jpg&imsz=0000","language":"uk-UA","country":"UA","api_version":10},"subscribed":false}[39m
onConversationStarted

    */
        // console.log(JSON.stringify(userProfile))
    var message = {}
    var response = { userProfile }
    var type = "onConversationStarted"
    var response = { userProfile, isSubscribed, context }
    var viber = { response, message, type }

    const res = axios.post(gasURL, viber);
    //say(response, `Hi there ${response.userProfile.name}. onConversationStarted Ваш ID ${response.userProfile.id}`);
    //bot.sendMessage(userProfile, message)
});



bot.onSubscribe(response => {
    //  say(response, `Hi there ${response.userProfile.name}. I am ${bot.name}! BotEvents.SUBSCRIBED! Ваш ID ${response.userProfile.id}`)
    //  var viber = { response: { userProfile, replyType, silent, chatId } }
    console.log('onSubscribe')
    console.log(response)
    var type = "onSubscribe"
        //console.log(response.user)
        //say(response, `Hi there ${response.userProfile.name}. BotEvents.MESSAGE_RECEIVED! Ваш ID ${response.userProfile.id}`);
    var message = {}
    var viber = { response, message, type }
    const res = axios.post(gasURL, viber);

});

bot.onUnsubscribe(userId => {
    console.log('onUnsubscribe')
    console.log(userId)
        // say(response, `I am ${bot.name}! BotEvents.UNSUBSCRIBED! Ваш ID ${userId}`)
    var message = {}
    var userProfile = {}
    userProfile.id = userId
    var type = "onUnsubscribe"
    var viber = { response: { userProfile }, message, type }
        //console.log('Set the new webhook to"', publicUrl);

    const res = axios.post(gasURL, viber);
});

//conversation_started
bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
    // Echo's back the message to the client. Your bot logic should sit here.
    say(response, `Hi there ${response.userProfile.name}. BotEvents.MESSAGE_RECEIVED! Ваш ID ${response.userProfile.id}`);
    var { userProfile, replyType, silent, chatId } = response
    var viber = { response: { userProfile, replyType, silent, chatId }, message, type: "message" }
    const res = axios.post(gasURL, viber);
    //console.log('Set the new webhook to"', publicUrl);

    // const resm = axios.post(gasURL, message);
});
/*
//conversation_started
bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
    // Echo's back the message to the client. Your bot logic should sit here.
    say(response, `Hi there ${response.userProfile.name}. BotEvents.MESSAGE_RECEIVED! Ваш ID ${response.userProfile.id}`);
    var { userProfile, replyType, silent, chatId } = response
    var viber = { response: { userProfile, replyType, silent, chatId }, message, type: "message" }
    const res = axios.post(gasURL, viber);
    //console.log('Set the new webhook to"', publicUrl);

    // const resm = axios.post(gasURL, message);
});
*/
function createKeyboard(values) {

    var keyboardGenerator = new KeyboardGenerator();
    for (var i = 0; i < values.length; i++) {
        var keyboardValue = values[i];
        keyboardGenerator.addElement(keyboardValue, (gShouldUseRandomColors ? undefined : gDefaultKeyboardColor));
    }

    return keyboardGenerator.build();
}

const SAMPLE_KEYBOARD = {
    "Type": "keyboard",
    "Revision": 1,
    "Buttons": [{
        "Columns": 3,
        "Rows": 2,
        "BgColor": "#e6f5ff",
        "BgMedia": "http://www.jqueryscript.net/images/Simplest-Responsive-jQuery-Image-Lightbox-Plugin-simple-lightbox.jpg",
        "BgMediaType": "picture",
        "BgLoop": true,
        "ActionType": "reply",
        "ActionBody": "Yes"
    }]
};
/*
const message = new KeyboardMessage(SAMPLE_KEYBOARD);

bot.onTextMessage(/\/start/, (message, response) => {
    say(response, "Нам необходим Ваш номер телефона.");
    say(response, message)
});
*/
const http = require('http');
const port = process.env.PORT || 8080;
return ngrok.getPublicUrl().then(publicUrl => {
    console.log('Set the new webhook to"', publicUrl);

    var data = { publicUrl }

    http.createServer(bot.middleware()).listen(port, () => bot.setWebhook(publicUrl));

    const res = axios.post(gasURL, data);
    // "Hello, World!"
    res.data;

}).catch(error => {
    console.log('Can not connect to ngrok server. Is it running?');
    console.error(error);
});