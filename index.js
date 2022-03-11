const { Client, Intents } = require("discord.js");
const { Discord } = require('discord.js')
const  { Collection} = require("discord.js");
const { Player } = require('discord-player')
const { join } = require("path");
const fs = require('fs')
const config = require('./config.json');
const client = new Client({
    shards: 'auto',
    allowedMentions: ['user', 'roles'],
    restTimeOffset: 0,
    partials: ['CHANNEL', 'GUILD_MEMBER', 'MESSAGE', 'GUILD_SCHEDULED_EVENT', 'REACTION', 'USER'],
    intents: 32767

})

require("./handler/Events")(client);

const player = new Player(client, {
    leaveOnEnd: true,
    leaveOnStop: true,
    leaveOnEmpty: true,
    leaveOnEmptyCooldown: 5000,
    autoSelfDeaf: true,
    initialVolume: 80,
    bufferingTimeout: 3000

});

client.on("messageCreate", async (message) => {
    //commands system
module.exports = {client, player}
client.aliases = new Collection();
client.commands = new Collection();
const cooldowns = new Collection();
const talkedRecently = new Map();
const { join } = require('path')


const commands = fs.readdirSync(`./Commands`).filter(file => file.endsWith('.js'))
for(file of commands) {
  const commandName = file.split(".")[0]
const command = require(`./Commands/${commandName}`)
client.commands.set(commandName, command)

}           ``

// Command Handler
const commandFiles = fs.readdirSync(join(__dirname, "Commands")).filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(join(__dirname, "Commands", `${file}`));
  client.commands.set(command.name, command);
}


  


let prefix = config.prefix;
        if(!message.guild || message.author.bot) return;
        if(!message.content.startsWith(prefix));
    
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
      
        const command =
          client.commands.get(commandName) ||
          client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
      
        if (!command) return;
      
        if (!cooldowns.has(command.name)) {
          cooldowns.set(command.name, new Collection());
        
        }
      
        //if(!message.member.permissions.has(command.userPerm )) return message.channel.send(`you don't have permission to use this command MISSING PERMISSION: \`${command.userPerm || []}\``)
       // if(!message.guild.me.permissions.has(command.botPerm )) return message.channel.send(`i don't have permission to run this command MISSING PERMISSION: \`${command.botPerm || []}\``)
      
        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 1) * 1000;
      
        if (timestamps.has(message.author.id)) {
          const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
      
          if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(
              `Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`
            );
          }
        }
      
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
      
        try {
          command.execute(message, args, client);
        } catch (error) {
          console.error(error);
          message.reply("There was an error executing that command.").catch(console.error);
        }
})







client.login(config.token)