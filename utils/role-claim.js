const { Client, MessageReaction, DiscordAPIError } = require('discord.js');
const firstMessage = require('./first-message');

const emojis = {
    html: "⌈ ★ ⌋ HTML",
    css: "⌈ ★ ⌋ CSS",
    javascript: "⌈ ★ ⌋ JavaScript",
    nodejs: "⌈ ★ ⌋ NodeJS",
    react: "⌈ ★ ⌋ React",
    php: "⌈ ★ ⌋ PHP",
    python: "⌈ ★ ⌋ Python",
    ruby: "⌈ ★ ⌋ Ruby",
    java: "⌈ ★ ⌋ Java",
    mysql: "⌈ ★ ⌋ MySQL",
    docker: "⌈ ★ ⌋ Docker",
    aws: "⌈ ★ ⌋ AWS"
}

/**
 * 
 * @param {MessageReaction} reaction 
 * @param {*} user 
 * @param {*} add 
 */
const handleReaction = (reaction, user, add) => {
    const emoji = reaction.emoji.name;
    const { guild } = reaction.message;

    const roleName = emojis[emoji];

    if (!roleName) {
        return;
    }

    const role = guild.roles.cache.find(role => role.name === roleName);

    if (!role) {
        return;
    }

    const member = guild.members.cache.find(member => member.id === user.id);

    if (add) {
        member.roles.add(role);
    } else {
        member.roles.remove(role);
    }
}

/**
 * 
 * @param {Client} client 
 */
module.exports = (client) => {
    const channel = client.channels.cache.find((channel) => channel.id == '1015957006412156988');
    const getEmoji = emojiName => client.emojis.cache.find((emoji) => emoji.name === emojiName);

    const reactions = [];

    let message = "Choisissez vos Armes 🔫\nVous pouvez cliquer sur les réactions ci-dessous pour vous ajouter ou supprimer des rôles. Ces rôles sont destinés à vous permettre de rester informé sur les sujets qui vous intéressent.\n\n";

    for (const key in emojis) {
        const emoji = getEmoji(key);
        if (emoji) {
            reactions.push(emoji);
            const role = emojis[key];
            message += `${emoji} : ${role}\n`;
        }
    }

    firstMessage(channel, message, reactions);

    client.on('messageReactionAdd', (reaction, user) => {
        if (reaction.message.channel.id === channel.id) {
            handleReaction(reaction, user, true);
        }
    });

    client.on('messageReactionRemove', (reaction, user) => {
        if (reaction.message.channel.id === channel.id) {
            handleReaction(reaction, user, false);
        }
    });
}