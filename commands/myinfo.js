exports.run = (client, message, Discord, prefix) => {
  
  var roles = message.member.roles.map(role => role.name).join(`, `);
  var status = message.author.presence.status.toString();
  if(status=="dnd"){status="Do not Disturd"}else if(status=="online"){status="Online"}else if(status=="idle"){status="Away/Idle"}else{status="Offline"}//This string of code is for determining what your status is set to in Discord.
  var embed = new Discord.RichEmbed()
.setTitle(`${message.author.username}'s info`)
.setThumbnail(message.author.avatarURL)
.addField("Discord Tag", message.author.tag)
.addField("Roles", roles)
.addField("Status", status )
.addField("ID", message.author.id)
.setColor("RANDOM")
return message.channel.send(embed);
}