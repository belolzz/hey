const Discord = require("discord.js");

exports.run = (client, message, Discord, prefix) => {
  const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
 if(!args[0]) {
       const clear = new Discord.RichEmbed()
       .setTitle(`__Clear__: **d!clear <number>**`)
      
       return message.channel.send(clear).then(msg => msg.delete(8000));
    }

if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("you don't have permssion MANAGE_MESSAGE to use this !");
        if(!args[0]) return message.channel.send(`${prefix}clear [limit to clear]`);
        message.channel.bulkDelete(args[0]).then(() => {
       message.channel.send(`message has been clear **${args[0]}** .`).then(msg => msg.delete(2000));
    });
}