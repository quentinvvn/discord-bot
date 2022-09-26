const { channel } = require('diagnostics_channel')
const { Client, Intents } = require('discord.js');

const roleClaim = require('./utils/role-claim');

const Discord = require('discord.js'),
    client = new Discord.Client({
        fetchAllMembers: true,
        intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
        partials: ['MESSAGE', 'REACTION']
    }),
    config = require('./config.json'),
    humanizeDuration = require('humanize-duration'),
    fs = require('fs'),
    cooldown = new Set()

client.login(config.token)
client.commands = new Discord.Collection()
client.db = require('./db.json')
 
fs.readdir('./commands', (err, files) => {
    if (err) throw err
    files.forEach(file => {
        if (!file.endsWith('.js')) return
        const command = require(`./commands/${file}`)
        client.commands.set(command.name, command)
    })
})

client.on('message', message => {
    // Suggestion
    if(message.author.bot) return;
    if(message.channel.id === '1015960974433452083') {
        message.delete().then(() => {
            message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('Sondage de ' + message.author.tag)
                    .setDescription(message.content)
                    .setColor('#B5B7B6')
            ).then(async msg => {
                await msg.react('✅');
                await msg.react('❌');
            });
        });
        return;
    }

    if (message.type !== 'DEFAULT' || message.author.bot) return

    const args = message.content.trim().split(/ +/g)
    const commandName = args.shift().toLowerCase()
    if (!commandName.startsWith(config.prefix)) return;
    const command = client.commands.get(commandName.slice(config.prefix.length))
    if (!command) return
    if (command.guildOnly && !message.guild) return message.channel.send('Cette commande ne peut être utilisée que dans un serveur.')
    command.run(message, args, client)
})

client.on('guildMemberAdd', member => {
    member.guild.channels.cache.get(config.greeting.channel).send( new Discord.MessageEmbed()
        .setAuthor(`Bienvenue ! ${member.user.tag}`, member.user.displayAvatarURL())
        .setDescription(`${member} Bienvenue sur Quentin VVN. J'espère que tu passeras un bon moment ! \n Aller, maintenant passons au <#1015957233873461318> pour que tu puisses être du bon côté ! \nN'oublies pas de selectionner tes <#1015957006412156988> !\n Et surtout, n'hésites pas à te présenter à tout le monde pour un peu d'intéraction ! 💖`)
        .setThumbnail(member.user.displayAvatarURL())
        .setColor('#ff810d'))
    member.roles.add(config.greeting.role)
})


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setStatus('online');
    client.user.setActivity("?help | quentin-vivien.fr");
    /*client.user.setActivity(`une love party avec bichette`, {type: "COMPETING"});*/
    roleClaim(client);
 });

client.on('channelCreate', channel => {
    if (!channel.guild) return
    const muteRole = channel.guild.roles.cache.find(role => role.name === 'Muted')
    if (!muteRole) return
    channel.createOverwrite(muteRole, {
        SEND_MESSAGES: false,
        CONNECT: false,
        ADD_REACTIONS: false
    })
})

client.on('rateLimit', data => {
    console.log('Rate Limit Triggered:', data);
})

client.on('error', data => {
    console.log('error Triggered:', data);
})

const test = "x";