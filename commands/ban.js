const Discord = require("discord.js");

module.exports.run = async (bot, message, prefix) => {
 
message.react("✅");
  const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
 if(!args[0]) {
       const nickbot = new Discord.RichEmbed()
       .setTitle(`__Ban__: **d!ban <<@Name>>**`)
      
       return message.channel.send(nickbot).then(msg => msg.delete(8000));
    }
  
  if(!message.member.permissions.has("BAN_MEMBERS")) return message.channel.send("you don't have BAN_MEMBERS permissions to use this !");
	 let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	 if(!bUser) return message.channel.send("Can't find user!");
	 let bReason = args.join(" ").slice(22);
	 if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("No can do pal!");
	 if(bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("That person can't be kicked!");
	  
	 let banEmbed = new Discord.RichEmbed()
         .setColor('#FF0000')
	 .addField("Banned User", `${bUser} with ID ${bUser.id}`)
	 .addField("Banned By", `<@${message.author.id}>`)
	 .addField("Time", message.createdAt)
	 .addField("Reason", bReason);
	     
	 let incidentchannel = message.guild.channels.find(`name`, "dragonlogs");
	 if(!incidentchannel) return message.channel.send("Can't find #dragonlogs channel.pls make channel name #dragonlogs");	      
	 message.guild.member(bUser).ban(bReason);
	 incidentchannel.send(banEmbed);
	     	      
	  return;
  
}
  
  
  
  
  