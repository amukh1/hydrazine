# How To Run

Here is the list of the base files your bot has. Do not delete **any** files from the folder as it can break the bot.

- `./src/index.ts`. The Interperter of the bot.
- `./template/template.ts`. Instructions for the bot.
- `./module/formatConsole.ts`. Formats string(s) for `console.log()`
- `./module/formatMessage.ts`. Formats `message.content`
- `package.json`. NPM package information.

## How To Actually Run

You'll need a proper hosting to host your discord bot. The "Bot" is just an instance of Node.js so any Node.js hosting(preferably v16+) will do. 

### Run With `ts-node`

```
npm install ts-node --save-dev -g
ts-node .
```

### Run Normally

```
npm install --force --save-dev
npm run build
node .
```