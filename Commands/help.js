module.exports = {
    name: "help",
    aliases: ['help', 'h'],
    async execute(message, args, client) {
        message.channel.send("testing")
    }
}