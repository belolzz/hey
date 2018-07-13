const Fortnite = require('fortnite');
const stats = new Fortnite("aff6929e-6efc-468d-9058-daba0491d714");
const Discord = require('discord.js');
const client = new Discord.Client();
const botconfig = require("./botconfig.json");
const superagent = require("superagent");
const send = require("quick.hook");
const encode = require('strict-uri-encode');
const snekfetch = require('snekfetch');
const fs = require("fs");
const economy = require('discord-eco');
const talkedRecently = new Set();
const xp = require("./xp.json");
const token = require("./botconfig.json");
let queue = {};

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity('++help', { type: 'WATCHING' })
  });
  
client.on("message", message => {
  
  let args = message.content.split(" ").slice(1);
  let name = args.join(' ');
  if (message.content.startsWith(botconfig.prefix + "createHook")) {
    message.channel.createWebhook(`${name}`)
      .then(webhook => webhook.edit(`${name}`)
        .then(wb => message.author.send(`**Here is You Webhook** : https://canary.discordapp.com/api/webhooks/${wb.id}/${wb.token}`))
        .catch(console.error))
      .catch(console.error);
    message.channel.send(`<:BOT:445430903808983050> **${message.author.tag}** Has Create Hook **${name}** From Channel !`).then(msg => msg.delete(99999));
    message.delete(5000)
  }
});

  client.on("guildCreate", async guild => {
    const invite = await guild.channels.first().createInvite({
      maxAge: 0
    });
    console.log(`Bot Has Invite To New Guild Â» ${guild.name} with invite: https://discord.gg/${invite.code}`)
  });
  
client.on("guildMemberAdd", function(member) {
    let role = member.guild.roles.find("name", "PLAYER");
    member.addRole(role).catch(console.error);
});

  client.on("message", async message => {
    //  if (talkedRecently.has(message.author.id)) {
  //      message.channel.send("**Wait 30 Second Before Getting Typing This Again.** - " + message.author).then(msg => msg.delete(4500));
  //  } else {
    if(message.author.bot) return;
    const args = message.content.slice(botconfig.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();  


    if(command === "say") {
       message.channel.send(args.join(" "));
       message.delete();
    }   

   if(command == "annsay") {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("you don't have permssion MANAGE_MESSAGE to use this !");
    if(args[0] == "help"){
    message.reply("```Create #annoucements first and do k!chatembed on the channel you want message sand to #annoucements```");
    return;
  }
    let chatchannel = message.guild.channels.find(`name`, "annoucements");
    if(!chatchannel) return message.channel.send("you need create channel #annoucements to chat !");
    message.delete().catch(O_o=>{});
    chatchannel.send(args.join(" "));

   }

   if(command == "chatsay") {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("you don't have permssion MANAGE_MESSAGE to use this !");
    if(args[0] == "help"){
    message.reply("```Create #chat first and do k!chatembed on the channel you want message sand to #chat```");
    return;
  }
    let chatchannel = message.guild.channels.find(`name`, "chat");
    if(!chatchannel) return message.channel.send("you need create channel #chat to chat !");
    message.delete().catch(O_o=>{});
    chatchannel.send(args.join(" "));

   }

 if(command === "join") {
  return new Promise((resolve, reject) => {
const voiceChannel = message.member.voiceChannel;
if (!voiceChannel || voiceChannel.type !== 'voice') return message.reply('I couldn\'t connect to your voice channel...');
voiceChannel.join().then(connection => resolve(connection)).catch(err => reject(err));
});
}

  if(command === "leave") {
    if (!['356510829920780289',].includes(message.author.id)) return message.reply('**You cant do that, only the bot developer can!**');
    message.channel.send('**Leaving..** ')
    message.guild.leave();
  };

  if(command === "level") {
  message.delete(500);
  const member = message.mentions.members.first() || message.guild.members.get(args[0]);
  let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

  if(!user){
  if(!xp[message.author.id]){
   xp[message.author.id] = {
     xp: 0,
     level: 1
  };
}


  let curxp = xp[message.author.id].xp;
  let curlvl = xp[message.author.id].level;
  let nxtLvlXp = curlvl * 100;
  let difference = nxtLvlXp - curxp;

  let lvlEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setColor("RANDOM")
  .addField("Level", curlvl, true)
  .addField("XP", curxp, true)
  .setThumbnail(message.author.avatarURL)
  .setFooter(`${difference} XP till level up`, message.author.displayAvatarURL);

  return message.channel.send(lvlEmbed);
  message.delete(500);
}

let target = message.mentions.users.first();

if(!xp[user.id]){
  xp[user.id] = {
    xp: 0,
    level: 1
 };
}

 let ucurxp = xp[user.id].xp;
 let ucurlvl = xp[user.id].level;
 let unxtLvlXp = ucurlvl * 100;
 let udifference = unxtLvlXp - ucurxp;

 let ulvlEmbed = new Discord.RichEmbed()
 .setAuthor(member.user.username)
 .setColor("RANDOM")
 .addField("Level", ucurlvl, true)
 .addField("XP", ucurxp, true)
 .setThumbnail(message.author.avatarURL)
 .setFooter(`${udifference} XP till level up`, target.displayAvatarURL);

 return message.channel.send(ulvlEmbed);
 message.delete(500);

}


  if(command === "xp") {
  message.delete(500);
  const member = message.mentions.members.first() || message.guild.members.get(args[0]);
  let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

  if(!user){
  if(!xp[message.author.id]){
   xp[message.author.id] = {
     xp: 0,
     level: 1
  };
}


  let curxp = xp[message.author.id].xp;
  let curlvl = xp[message.author.id].level;
  let nxtLvlXp = curlvl * 100;
  let difference = nxtLvlXp - curxp;

  let lvlEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setColor("RANDOM")
  .addField("Level", curlvl, true)
  .addField("XP", curxp, true)
  .setThumbnail(message.author.avatarURL)
  .setFooter(`${difference} XP till level up 🎉`, message.author.displayAvatarURL);

  return message.channel.send(lvlEmbed);
  message.delete(500);
}

let target = message.mentions.users.first();

if(!xp[user.id]){
  xp[user.id] = {
    xp: 0,
    level: 1
 };
}


 let ucurxp = xp[user.id].xp;
 let ucurlvl = xp[user.id].level;
 let unxtLvlXp = ucurlvl * 100;
 let udifference = unxtLvlXp - ucurxp;

 let ulvlEmbed = new Discord.RichEmbed()
 .setAuthor(member.user.username)
 .setColor("RANDOM")
 .addField("Level", ucurlvl, true)
 .addField("XP", ucurxp, true)
 .setThumbnail(message.author.avatarURL)
 .setFooter(`${udifference} XP till level up`, target.displayAvatarURL);

 return message.channel.send(ulvlEmbed);
 message.delete(500);


}

  if(command === "servconnect") {
  message.delete()
  const sc = new Discord.RichEmbed()
  .setAuthor(`${message.guild.name} Connect :`)
  .addField("FaceBook Group :", "[CLICK HERE](https://m.me/join/AbbccJ_t_9tfdaxn)", true)
  .addField("Discord Group :", "[CLICK HERE](https://discord.gg/7mS9GEY)", true)
  .setThumbnail(message.author.avatarURL)

    const pollTitle = await message.channel.send(sc);
      await pollTitle.react(`444878652090613763`);
      await pollTitle.react(`444873045488697375`);
      await pollTitle.react(`444873046776348679`);
      await pollTitle.react(`444873175747133471`);
      await pollTitle.react(`444873284622745610`);
    const filter = (reaction) => reaction.emoji.name === '444878652090613763';
    const collector = pollTitle.createReactionCollector(filter, { time: 1500 });
    const filter1 = (reaction) => reaction.emoji.name === '444873045488697375';
    const collector1 = pollTitle.createReactionCollector(filter1, { time: 1500 });
    const filter3 = (reaction) => reaction.emoji.name === '444873046776348679';
    const collector3 = pollTitle.createReactionCollector(filter3, { time: 1500 });
    const filter4 = (reaction) => reaction.emoji.name === '444873175747133471';
    const collector4 = pollTitle.createReactionCollector(filter4, { time: 1500 });
    const filter5 = (reaction) => reaction.emoji.name === '444873284622745610';
    const collector5 = pollTitle.createReactionCollector(filter5, { time: 1500 });
   
}

  if (command === "ign") {
  message.delete();
    if(args[0] == "help"){
  const help = new Discord.RichEmbed()
  .setDescription(`**${botconfig.prefix}ign** [**IGN-PUBG**]  [**IGN-FORTNITE**]  [**IGN-CSGO**]  [**IGN-GTAV**]  [**IGN-DOTA2**]  [**NAME-STEAMG**]\n\nExample : ${botconfig.prefix}ign pubg fortnite csgo gtav dota2 steamacc`)
  .setColor('RANDOM')
  message.channel.send(help).then(msg => msg.delete(11000));
    return;
  }
  let pubg = args[0];
  let fortnite = args[1];
  let csgo = args[2];
  let gtav = args[3];
  let dota = args[4];
  let steam = args[5];

  const ign = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setAuthor(`${message.author.tag} - IGN :`, message.author.avatarURL)
  .setThumbnail(message.author.avatarURL)
  .addField("<:pubg:445459131931820044> PUBG IGN :", pubg, true)
  .addField("<:fortnite:445468274029887488> FORTNITE IGN :", fortnite, true)
  .addField("<:csgo:445457715574079509> CS-GO IGN :", csgo, true)
  .addField("<:gtav:445457716534575115> GTA V IGN :", gtav, true)
  .addField("<:dota:445457915285864458> DOTA 2 IGN :", dota, true)
  .addField("<:steam:445457979224096779> STEAM NAME :", steam, true)
  .setFooter("@ = [SPAEC] ")
  .setTimestamp()
    const pollTitle = await message.channel.send(ign);
      await pollTitle.react(`445459131931820044`);
      await pollTitle.react(`445468274029887488`);
      await pollTitle.react(`445457715574079509`);
      await pollTitle.react(`445457716534575115`);
      await pollTitle.react(`445457915285864458`);
      await pollTitle.react(`445457979224096779`);
    const filter = (reaction) => reaction.emoji.name === '445459131931820044';
    const collector = pollTitle.createReactionCollector(filter, { time: 1500 });

    const filter1 = (reaction) => reaction.emoji.name === '445468274029887488';
    const collector1 = pollTitle.createReactionCollector(filter1, { time: 1500 });

    const filter2 = (reaction) => reaction.emoji.name === '445457715574079509';
    const collector2 = pollTitle.createReactionCollector(filter2, { time: 1500 });

    const filter3 = (reaction) => reaction.emoji.name === '445457716534575115';
    const collector3 = pollTitle.createReactionCollector(filter3, { time: 1500 });

    const filter4 = (reaction) => reaction.emoji.name === '445457915285864458';
    const collector4 = pollTitle.createReactionCollector(filter4, { time: 1500 });

    const filter5 = (reaction) => reaction.emoji.name === '445457979224096779';
    const collector5 = pollTitle.createReactionCollector(filter5, { time: 1500 });
   
}

  if(command === "lewd") {
    let {body} = await superagent
    .get(`https://nekos.life/api/lewd/neko`);
    if (!message.channel.nsfw) return message.reply("You can use this command only on nsfw channels!");
  
    let hentaiEmbed = new Discord.RichEmbed()
    .setColor("#f4cccc")
    .setTitle("Why does someone put a command like this?")
    .setImage(body.neko)
    .setFooter("Bot Version: 0.0.2");

    message.channel.send(hentaiEmbed);

}
 
  if(command === "get") {
  let [title, contents] = args.join(" ").split("|");
  if(!contents) {
    [title, contents] = ["Achievement Get :", title];
  }
  let rnd = Math.floor((Math.random() * 39) + 1);
  if(args.join(" ").toLowerCase().includes("burn")) rnd = 38;
  if(args.join(" ").toLowerCase().includes("cookie")) rnd = 21;
  if(args.join(" ").toLowerCase().includes("cake")) rnd = 10;

  if(title.length > 22 || contents.length > 22) return message.edit("Max Length: 22 Characters. Soz.").then(message.delete.bind(message), 2000);
  const url = `https://www.minecraftskinstealer.com/achievement/a.php?i=${rnd}&h=${encodeURIComponent(title)}&t=${encodeURIComponent(contents)}`;
  snekfetch.get(url)
   .then(r=>message.channel.send("", {files:[{attachment: r.body}]}));
  message.delete(5000);
  message.react("445426199892590602");

}
      if(command === "ping") {
      const newemb = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle(`<:pepe:444483883480907776> Pong | ${Date.now() - message.createdTimestamp} ms`)
      message.channel.send({embed: newemb})
  }
  
    if(command === "setwatching") {
     if (message.author.id !== ('356510829920780289')) return message.channel.send("**You Can\'t Change Watching BOT | TaMoToJiáµ›áµ‰Ê³á¶¦á¶ á¶¦áµ‰áµˆ#5881**");
     const status = args.join(' ');
     if (status.length === 0) {
       const embed = new Discord.RichEmbed()
         .setColor('RANDOM')
         .setDescription(`${botconfig.prefix}setwatching [status]!`);
       message.channel.send({ embed });
       message.delete(500)
  }
  
    else if (status.length !== 0) {
    client.user.setActivity(`${status}`, {  type: "WATCHING"});
    const embed = new Discord.RichEmbed()
      .setColor("#7289DA")
      .setDescription(`${message.author.tag} You Sucessfully Changed Watching » **${status}** !`);
    message.channel.send({ embed });
    message.delete(5000);
  }};
    
    if(command === "clear") {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("you don't have permssion MANAGE_MESSAGE to use this !");
        if(!args[0]) return message.channel.send(`${botconfig.prefix}clear [limit to clear]`);
        message.channel.bulkDelete(args[0]).then(() => {
       message.channel.send(`message has been clear **${args[0]}** .`).then(msg => msg.delete(2000));
    });
}
    
    if (command === "serverinfo") {
      let online = message.guild.members.filter(member => member.user.presence.status !== 'offline');
      let day = message.guild.createdAt.getDate()
      let month = 1 + message.guild.createdAt.getMonth()
      let year = message.guild.createdAt.getFullYear()
       let sicon = message.guild.iconURL;
       let serverembed = new Discord.RichEmbed()
       .setAuthor(message.guild.name, sicon)
       .setFooter(`Server Created : Day:${day} | Month:${month} | Year:${year}`)
       .setColor('RANDOM')
       .setThumbnail(sicon)
       .addField("ServerName", message.guild.name, true)
       .addField("OWNER", message.guild.owner.user.tag, true)
       .addField("Region", message.guild.region, true)
       .addField("Channels", message.guild.channels.size, true)
       .addField("MEMBER", message.guild.memberCount, true)
       .addField("Humans", message.guild.memberCount - message.guild.members.filter(m => m.user.bot).size, true)
       .addField("BOT", message.guild.members.filter(m => m.user.bot).size, true)
       .addField("Online", online.size, true)
       .setImage("https://cdn.discordapp.com/attachments/443665749656207360/445222446719827968/ServerInfo_-_Mirai.png")
       .addField("Created At", message.member.joinedAt, true)

       message.channel.send(serverembed);
    
    }


   if(command === "help") {
    const serverEmbed = new Discord.RichEmbed()
    .setAuthor(`${botconfig.prefix} commands`, message.author.avatarURL)
    .setColor('RANDOM')
    .addField("Moderation", "`clear` `say` `addrole` `removerole`")
    .addField("Info", "`serverinfo` `serverrule` `servconnect`")
    .addField("General", "`ping` `avatar` `emojilist` `get` ")
    .addField("Fun", "`Coming Soon`")
    .setFooter(`Requested by : ${message.author.tag}`);

    return message.channel.send(serverEmbed);
}

if(command === "serverrule") {
    const serverrule = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setImage('https://cdn.discordapp.com/attachments/443665749656207360/445215855534407690/ServerRules-Mirai.png')
    .setDescription("**ServerRule :**\n\n1. No Bullying\n2. No Spamming\n3. No Aggressive Fighting\n4. No Threats\n5. No Racist or Offensive or Degrading Content\n6. No Begging or Repeated Asking\n7. Any Sort of Abuse is Not Allowed\n8. Use Appropriate Channels\n9. No Punishment Evading\n10. No Links That Are Evasive\n11. Staff Decisions Are Final\n\nMore Check #server-rule")   
    const pollTitle = await message.channel.send(serverrule);
      await pollTitle.react(`444878652090613763`);
      await pollTitle.react(`444873045488697375`);
      await pollTitle.react(`444873046776348679`);
      await pollTitle.react(`444873175747133471`);
      await pollTitle.react(`444873284622745610`);
    const filter = (reaction) => reaction.emoji.name === '444878652090613763';
    const collector = pollTitle.createReactionCollector(filter, { time: 1500 });
    const filter1 = (reaction) => reaction.emoji.name === '444873045488697375';
    const collector1 = pollTitle.createReactionCollector(filter1, { time: 1500 });
    const filter3 = (reaction) => reaction.emoji.name === '444873046776348679';
    const collector3 = pollTitle.createReactionCollector(filter3, { time: 1500 });
    const filter4 = (reaction) => reaction.emoji.name === '444873175747133471';
    const collector4 = pollTitle.createReactionCollector(filter4, { time: 1500 });
    const filter5 = (reaction) => reaction.emoji.name === '444873284622745610';
    const collector5 = pollTitle.createReactionCollector(filter5, { time: 1500 });
    message.delete(800);
};

  if(command === "avatar") {
    let msg = await message.channel.send("Waitng avatar...");
    let mentionedUser = message.mentions.users.first() || message.author;

    let avatarEmbed = new Discord.RichEmbed()
    .setImage(mentionedUser.displayAvatarURL)
    .setColor(`RANDOM`)
    .setTitle(`Avatar`)
    .setDescription("[Avatar Link]("+mentionedUser.displayAvatarURL+")")
    .setFooter(`Requested by ${message.author.tag}`);
    message.channel.send(avatarEmbed)
    msg.delete();
}

   if(command === "emojilist") {
        const List = message.guild.emojis.map(e => e.toString()).join(" ");
        let sicon = message.guild.iconURL;
        const EmojiList = new Discord.RichEmbed() 
            .setTitle('➠ Server Emoji\'s List') 
            .setColor('RANDOM')
            .setAuthor(message.guild.name, sicon)
            .setDescription(List) 
            .setTimestamp() 
            .setFooter(message.guild.name) 
        message.channel.send(EmojiList); 
        message.react("📥");
  }

  if(command === "addrole") {
  if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("**You don't have premmsions to do that!**");
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!args[0]) return message.channel.send('**Mention a user, and type a role to give to the user.** `ium addrole <user> <role>`')
  if(!rMember) return message.channel.send("**User not found.** `PREFIX addrole <user> <role>`");
  let role = args.join(" ").slice(22);
  if(!role) return message.channel.send("**Specify a role!** `PREFIX addrole <user> <role>`");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.channel.send("**Role not found.** `PREFIX addrole <user> <role>`");

  if(rMember.roles.has(gRole.id)) return message.channel.send("This user already has that role.");
  await(rMember.addRole(gRole.id));

  message.channel.send(`**${rMember}** has the role **${gRole.name}** now!`)
  message.delete(800);
}
  
  if(command === "removerole") {
  if(!message.member.hasPermissions("MANAGE_ROLES")) return message.reply("You do not have permission to do that!");
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.reply("User not found.");
  let role = args.join(" ").slice(22);
  if(!role) return message.reply("Specify a role!");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.reply("Role not found.");

  if(!rMember.roles.has(gRole.id)) return message.reply("This user doesn't have that role.");
  await(rMember.removeRole(gRole.id));

  await message.channel.send(`**${rMember} deos not have the role, ${gRole.name} anymore!**`)
  message.delete(800);

}

  //     talkedRecently.add(message.author.id);
   //     setTimeout(() => {
   //       // Removes the user from the set after a minute
   //       talkedRecently.delete(message.author.id);
   //     }, 80000);
  //  }

  });
  
  client.login(process.env.TOKEN);
