const Discord = require('discord.js');
const nekoclient = require('nekos.life');
const neko = new nekoclient();

exports.run = async (hanz, message, args) => {

    var target = args[0]
    var pat = await neko.getSFWPat();
{  url : ' https://cdn.nekos.life/hug/hug10050.gif ' }  
    const embed = new Discord.RichEmbed()
    message.channel.send("**Ummm**")
        .then(m => m.edit({
            embed
        }))
};


 exports.help = {
   name : "neko"
 }