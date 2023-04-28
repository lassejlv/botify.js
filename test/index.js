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
  ],
  partials: ["Message"],
  userPresence: {
    status: "dnd",
    activities: [{ name: "made with botify.js, build on discord.js" }],
  },
  settings: {
    logOptions: false,
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
            style: "Success",
            id: "log",
          })
          .build(),
      ],
    });
  },
});

myClient.start();
