module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        let servers = await client.guilds.cache.size
        let servercount = await client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)
      
        const activities_list = [
          `Discord.js`,
          `| m%help | Legend dishu!`,
          `| support = https://dsc.gg/syne`,
          `| WATCHING ${servers} servers`,
          `| WATCHING  | ${servercount} Members | Invite Me Now`
        ];
      
      
      
        setInterval(() => {
          const index = Math.floor(Math.random() * (activities_list.length - 1) + 1)
          client.user.setActivity(activities_list[index], { type: 'STREAMING', url: "https://www.twitch.tv/flare_com"});
        }, 5000);
      
      
        client.user.setStatus('dnd');
          
        console.log(` Logged in as ${client.user.tag} `)
    }
}