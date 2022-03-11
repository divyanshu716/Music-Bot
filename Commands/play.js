const { player } = require("../index");

module.exports = {
    name: "play",
    aliases: ['play', 'p'],
    async execute(message, args, client) {
        let channel = message.member.voice;
        if(!channel) return message.reply(">>> \`:x: please join a voice channel first\`")

        let query = args.join(" ");
        if(!query) return message.reply(">>> `Please provide me song name or link`");

        let queue = player.createQueue(message.guild.id, {
            metadata: {
                channel: message.member.voice.id,
            }
    });
        try {
            if (!queue.connection) await queue.connect(channel);

        } catch (err) {
            console.log(err)
            queue.destroy();
           // return await message.channel.send({content: ' Could not join your voice channel', ephemeral: true})
        }
        const track = await player.search(query, {
            requestedBy: message.author
        }).then(r => r.tracks[0]);
        queue.play(track);
            message.channel.send({ content: `Loading Track ** ${track.title}**!`})
        

        
    }
}