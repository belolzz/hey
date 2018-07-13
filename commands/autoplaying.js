exports.run = (client, message, Discord, prefix) => {
  message.delete(30000)
  message.react("✅")
  var embed = new Discord.RichEmbed()
 .setTitle("**Hey auto playing worked**") //This is the title of the embed.
  .setAuthor(`AutoPlaying Gamer 🎮`, message.author.avatarURL)
 
 .addField("Here are some ex:", "`++++++++ `") //This is basically a pair of a title with content below it. The format of how it is made is how I show it to be.
 .addField("Minecraft","`Playing Minecraft`")
 .addField('__The Bot has 9 roles playing__', '`•Minecaft`')
 .addField("`•PLAYERUNKNOWN'S BATTLEGROUNDS`","`•Counter-Strike Global Offensive`")
 .addField("`•Grand Theft Auto V`", "`•Fortnite`")
 .addField("`•Rules Of Survival`","`•DOTA 2`")
 .addField("`•osu!`","More then update soon")
 .setColor("RANDOM") //This code selects a random colour for the embed.
 .setTimestamp() //This sets the timestamp.
 .setFooter(`Requested by : ${message.author.tag} `) //This sets the footer of the embed to text of your choice.
 
 return message.channel.send(embed);
 }
