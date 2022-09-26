const Discord = require('discord.js');
const { MessageButton } = require ('discord-buttons');

module.exports = {
    run: async (client, message, args) => {
        const button1 = new MessageButton()
            .setStyle("gray")
            .setLabel("test")
            .setID("button1");

        message.channel.send("clic sur le bouton", button1);
    },
    name: "button"
}