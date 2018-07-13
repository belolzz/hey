exports.run = (client, message, Discord, prefix) => {
 var embed = new Discord.RichEmbed()
 .setTitle("Help Menu") //This is the title of the embed.
 .setAuthor(`${prefix}command 📄`, message.author.avatarURL)
 .addField("__General__", "`time,ping,avatar,luckynumber,randomcolor,roll,createinvite,quiz,plus`") //This is basically a pair of a title with content below it. The format of how it is made is how I show it to be.
 .addField("__Info__","`serverinfo,myinfo,botinfo,discordid,myname,username,online`")
 .addField('__Mods__', '`embed,say,clear,emojilist,ban,kick,autoplaying,addrole,removerole,rolecolor,nickbot,invitelist`')
 .addField("__Image__","`cat,dog,bunny,floof,coin,magik,gif,pizza`")
 .addField("__Fun__", "`meme,memes,pat,bond,slap,status,hug,read,dadjoke,chucknorris,ascii,playdough`")
 .addField("__NSFW channel__","`pornhub,hentai,gifsex,amateur,giffuck,boobs,4k,pawg,dick,penis,pussy,asian,ass,bbw,cosplay,dicpic,public,uniform,milf`")
 .addField("__Developer__","`sw,sp,sl,sa,dm,leaveserver,guild`")
 .addField("__**more information**__", "• Server Support: ╚» [click here](https://discord.gg/kNyJRV5) «╝ ")
 .addField("• Invite bot ", "╚» [click here](https://discordapp.com/oauth2/authorize?client_id=450933100021809171&scope=bot&permissions=2117598463) «╝(^_^)")

 .setColor("RANDOM") //This code selects a random colour for the embed.
 .setTimestamp() //This sets the timestamp.
 .setFooter(`Requested by :${message.author.tag} `) //This sets the footer of the embed to text of your choice.
 
 return message.channel.send(embed);
 }
                