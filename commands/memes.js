const Discord = require('discord.js');
const randomPuppy = require('random-puppy');

module.exports.run = async (client, message, Discord, prefix ) => {
 
randomPuppy('memes')
    .then(url => {
        const memeembed = new Discord.RichEmbed()
            .setTimestamp()
            .setImage(url)
            .setColor('RANDOM')
        message.channel.send(memeembed);
    })
}