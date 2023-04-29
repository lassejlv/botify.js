const { Partials, Client, GatewayIntentBits } = require("discord.js");

class BotifyClient extends Client {
  constructor(options) {
    super(options);
    this.prefix = options.prefix;
    this.token = options.token;
    this.intents = Array.isArray(options.intents) ? options.intents : [];
    this.partials = options.partials;
    this.userPresence = options.userPresence;
    this.settings = options.settings || {
      logOptions: false,
    };
  }

  // Start client
  start() {
    // Check for options
    if (!this.prefix) throw new Error("No prefix provided");
    if (!this.token) throw new Error("No token provided");

    // Handle intents
    this.intents.forEach((intent) => {
      this.options.intents.push(GatewayIntentBits[intent]);
    });

    // Handle partials
    if (this.partials.length) {
      this.options.partials.push(Partials[this.partials]);
    }

    //  Handle Settings
    if (this.settings.logOptions) {
      console.log("Options:");
      console.log({
        prefix: this.prefix,
        token: this.token,
        intents: this.options.intents,
        partials: this.partials,
        userPresence: this.userPresence,
        shardCount: this.options.shardCount,
        api: this.options.rest.api,
        apiVersion: this.options.rest.version,
        libary: {
          discordjs: {
            version: require("../package.json").dependencies["discord.js"],
          },

          botifyjs: {
            version: require("../package.json").version,
          },

          nodejs: {
            version: process.version,
          },
        },
      });
    }

    // Login to Discord
    this.login(this.token);
  }

  // Events
  event(event) {
    // Check for event name
    switch (event.name) {
      case "buttonClick": {
        this.on("interactionCreate", (interaction) => {
          if (interaction.isButton()) {
            event.run(this, interaction);
          }
        });

        break;
      }

      case "selectMenuSubmit": {
        this.on("interactionCreate", (interaction) => {
          if (interaction.isSelectMenu()) {
            event.run(this, interaction);
          }
        });
      }

      default: {
        this.on(event.name, event.run.bind(null, this));
      }
    }
  }

  // Commands with prefix
  command(command) {
    this.on("messageCreate", (message) => {
      if (message.content.startsWith(this.prefix + command.name)) {
        command.run(message);
      }
    });
  }

  // Commands without prefix
  slashCommand(command) {
    this.on("interactionCreate", (interaction) => {
      if (interaction.isCommand()) {
        if (interaction.commandName === command.name) {
          command.run(interaction);
        }
      }
    });
  }
}

module.exports = {
  BotifyClient,
};
