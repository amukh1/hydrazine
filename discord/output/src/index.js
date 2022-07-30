"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const template_1 = __importDefault(require("../template/template"));
const formatMessage_1 = __importDefault(require("../module/formatMessage"));
const actBaseActions_1 = __importDefault(require("../module/actBaseActions"));
const discord_js_1 = require("discord.js");
const envs = Object.keys((template_1.default === null || template_1.default === void 0 ? void 0 : template_1.default.$ENV) || {});
const client = new discord_js_1.Client({ intents: [discord_js_1.GatewayIntentBits.Guilds] });
for (let i = 0; i < template_1.default.$cinfo.$onInitListeners.length; i++) {
    const listener = template_1.default.$cinfo.$onInitListeners[i];
    const actions = listener.$actions;
    switch (listener.$type) {
        case 'process': {
            for (let j = 0; j < actions.length; j++) {
                const action = actions[j];
                (0, actBaseActions_1.default)(action);
            }
            break;
        }
        case 'on_client_ready': {
            client.on('ready', () => {
                actions.forEach((action) => {
                    (0, actBaseActions_1.default)(action);
                });
            });
            break;
        }
    }
}
for (let i = 0; i < envs.length; i++) {
    const env = envs[i];
    const value = template_1.default === null || template_1.default === void 0 ? void 0 : template_1.default.$ENV[env];
    process.env[env] = value;
}
for (let i = 0; i < template_1.default.$cinfo.$listeners.length; i++) {
    const event = template_1.default.$cinfo.$listeners[i];
    const checkpoints = event.$checkpoints;
    switch (event.$type) {
        case 'text_command':
            client.on('messageCreate', (message) => __awaiter(void 0, void 0, void 0, function* () {
                for (let i = 0; i < checkpoints.length; i++) {
                    const checkpoint = checkpoints[i];
                    const conditions = checkpoint.$conditions;
                    const equals = Object.keys(conditions.$equals);
                    const cleanMsg = (0, formatMessage_1.default)(message.content, {
                        $MSGCONTENT: message.content,
                        $MSGID: message.id,
                        $MESSAGEAUTHOR: message.author.username,
                        $MSGUSERID: message.author.id,
                        $MSGUSERDISCRIM: message.author.discriminator,
                        $MSGUSERAVATAR: message.author.avatarURL,
                        $MSGUSERMENTION: message.author.toString(),
                        $MSGUSERMENTIONID: message.author.id,
                    });
                }
            }));
    }
}
client.login('token').then((token) => {
    var _a;
    const PRESENCE = (_a = template_1.default.$GLOBAL) === null || _a === void 0 ? void 0 : _a.$PRESENCE;
    client.user.setActivity(PRESENCE);
    client.user.setPresence({
        status: 'online',
    });
});
