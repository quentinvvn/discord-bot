const {MessageEmbed} = require('discord.js')

module.exports = {
    run: message => {
        message.channel.send(new MessageEmbed()
            .setTitle(`GitHub`)
            .setDescription(`<:github:1019631290376519732> N'hésitez pas à consulter le GitHub pour accéder à différents codes réalisé par mes soins et pouvoir les réutiliser pour vos projets.\n\nhttps://github.com/quentinvvn \n\nTous les codes sont libres d'accès et vous pouvez les utiliser quand et où vous voulez.\n\nN'hésitez pas à me faire un don pour me soutenir : \nhttps://www.buymeacoffee.com/quentinvvn`)
            .setColor('#977849')
            /*.setDescription(`🤬 **Pas de spam ou d'auto-promotion (invitation de serveur, publicités, etc.)**\n sans l'autorisation d'un membre du staff. Cela inclut l'envoie de DM aux autres membres du serveur.\n\n🎉**Le seul contenu autorisé à être partagé ici est gratuit**.\nNe partagez pas de PDF, de livres, ni de contenu payant.\n\n✨**Traitez tout le monde avec respect**. Absolument aucun harcèlement, le sexisme, le racisme ou les discours haineux ne sont pas tolérés.\n\n❌**Pas de contenu NSFW ou obscène**.Cela inclut le texte, des images 
            ou des liens présentant de la nudité, du sexe, de la violence dure ou tout autre contenu graphiquement dérangeant.\n\n🧨Si vous voyez quelque chose contre les règles ou quelque chose qui vous met en danger, informez le personnel. **Nous voulons que ce serveur soit un espace accueillant !**\n\n♥️ Veuillez **utiliser les canaux pour l'usage auquel ils sont destinés**.\n\n📢 **Écoutez et suivez toutes les instructions données** par les membres du personnel.`)
            .setColor('#977849')
            .setAuthor('ala89 **bonjour**', 'https://cdn.discordapp.com/attachments/718476721418141728/719563110154764298/logo.png', 'https://google.fr')
            .setImage(member.user.displayAvatarURL())
            .setThumbnail('https://cdn.discordapp.com/attachments/718476721418141728/719563110154764298/logo.png')
            .setFooter('Mon bot perso **bonjour**', 'https://cdn.discordapp.com/attachments/718476721418141728/719563110154764298/logo.png')
            .setTimestamp()
            .setURL('https://google.fr')*/)
    },
    name: 'embed'
}