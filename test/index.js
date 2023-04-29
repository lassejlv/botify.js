require("dotenv").config();
const { MessageEmbed, BotifyClient, RowBuilder } = require("../src/index");

const myClient = new BotifyClient({
  token: process.env.TOKEN,
  prefix: "!",
  intents: [
    "GuildMessages",
    "Guilds",
    "MessageContent",
    "GuildMessageReactions",
    "GuildMembers",
  ],
  partials: ["Message"],
  userPresence: {
    status: "dnd",
    activities: [{ name: "made with botify.js, build on discord.js" }],
  },
  settings: {
    logOptions: true,
  },
});

myClient.event({
  name: "ready",
  run: (client) => {
    console.log(`Logged in as ${client.user.tag}!`);

    client.user.setPresence(myClient.userPresence);
  },
});

myClient.event({
  name: "messageReactionAdd",
  run: (client, reaction, user) => {
    if (user.bot) return;

    if (reaction.emoji.name === "👍") {
      reaction.message.channel.send({
        content: `${user.tag} reacted with 👍`,
      });
    }
  },
});

myClient.event({
  name: "buttonClick",
  run: (client, interaction) => {
    if (interaction.customId === "log") {
      interaction.reply({
        content: "Check the console!",
        ephemeral: true,
      });

      console.log("Someone clicked the button!");
    }
  },
});

myClient.command({
  name: "button",
  run: (message) => {
    message.reply({
      content: "Take a look at the button below!",
      ephemeral: true,
      components: [
        new RowBuilder()
          .addButton({
            label: "Click me to see a message in the console",
            style: "Secondary",
            id: "log",
            disabled: true,
          })
          .build(),
      ],
    });
  },
});

myClient.command({
  name: "selectMenu",
  run: (message) => {
    message.reply({
      content: "Whoaa it was easy to make this select menu!",
      ephemeral: true,
      components: [
        new RowBuilder()
          .addSelectMenu({
            id: "selectMenu",
            placeholder: "Select a value",
            options: [
              {
                label: "Option 1",
                value: "option1",
              },

              {
                label: "Option 2",
                value: "option2",
              },
            ],
          })
          .build(),
      ],
    });
  },
});

myClient.command({
  name: "react-to-my-message",
  run: (message) => {
    message
      .reply({
        content: "React to this message!",
        ephemeral: true,
      })
      .then((msg) => {
        msg.react("👍");
        msg.react("👎");
      });
  },
});

myClient.start();
