const Discord = require('discord.js');

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"]});
const fs = require('fs');

const prefix = '!';

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Bot is klaar voor gebruik!')

});

client.on('message', message => {

    if(!message.content.startsWith(prefix) || message.author.bot) return;
    
    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase();
    

    if(command === 'ticket'){
        client.commands.get('ticket').execute(message, args, Discord);
    }

    if(command === 'refund'){
        client.commands.get('refund').execute(message, args, Discord);
    }

    if(command === 'unban'){
        client.commands.get('unban').execute(message, args, Discord);
    }

});



client.login(process.env.token);