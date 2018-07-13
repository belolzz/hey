exports.run = (client, message, Discord, prefix) => {
  message.delete(5000);
  var embed = new Discord.RichEmbed()
  .setColor(`RANDOM`)
  .addField("Ping 📍" ,`Pong! Time took: ${Date.now() - message.createdTimestamp} ms`)
  .setTimestamp()
  .setFooter(`Requested by ${message.author.tag}`);
  
  return message.channel.send(embed).then(msg => msg.delete(10000));

};