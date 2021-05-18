module.exports = {
    name: "refund",
    aliases: [],
    permissions: [],
    description: "refund ticket aanmaken!",
    async execute(message, args, cmd, client, discord) {
      const channel = await message.guild.channels.create(`Refund Ticket: ${message.author.tag}`);
      
      channel.setParent("843931590069321748");
  
      channel.updateOverwrite(message.guild.id, {
        SEND_MESSAGE: false,
        VIEW_CHANNEL: false,
      });
      channel.updateOverwrite(message.author, {
        SEND_MESSAGE: true,
        VIEW_CHANNEL: true,
      });
  
      const reactionMessage = await channel.send("Er komt zo snel mogeljjk een staff lid aan om u te helpen!");
  
      try {
        await reactionMessage.react("🔒");
        await reactionMessage.react("⛔");
      } catch (err) {
        channel.send("Error, Met het verzenden van de emoji\'s, Neem contact op met een staff lid!");
        throw err;
      }
  
      const collector = reactionMessage.createReactionCollector(
        (reaction, user) => message.guild.members.cache.find((member) => member.id === user.id).hasPermission("ADMINISTRATOR"),
        { dispose: true }
      );
  
      collector.on("collect", (reaction, user) => {
        switch (reaction.emoji.name) {
          case "🔒":
            channel.updateOverwrite(message.author, { VIEW_CHANNEL: false });
            break;
          case "⛔":
            channel.send("Kanaal word in 5 Seconden verwijderd!");
            setTimeout(() => channel.delete(), 5000);
            break;
        }
      });
  
      message.channel
        .send(`Er komt zo snel mogeljjk een staff lid aan om u te helpen! ${channel}`)
        .then((msg) => {
          setTimeout(() => msg.delete(), 7000);
          setTimeout(() => message.delete(), 3000);
        })
        .catch((err) => {
          throw err;
        });
    },
  };