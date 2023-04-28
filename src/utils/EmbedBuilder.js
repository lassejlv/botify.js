const { EmbedBuilder } = require("discord.js");

class MessageEmbed {
  constructor() {
    this.embed = new EmbedBuilder();
  }

  setTitle(title) {
    this.embed.setTitle(title);
    return this;
  }

  setDescription(description) {
    this.embed.setDescription(description);
    return this;
  }

  setAuthor(name, icon, url) {
    this.embed.setAuthor(name, icon, url);
    return this;
  }

  setThumbnail(url) {
    this.embed.setThumbnail(url);
    return this;
  }

  setImage(url) {
    this.embed.setImage(url);
    return this;
  }

  setFooter(text, icon) {
    this.embed.setFooter(text, icon);
    return this;
  }

  setTimestamp(timestamp) {
    this.embed.setTimestamp(timestamp);
    return this;
  }

  addField(name, value, inline) {
    this.embed.addField(name, value, inline);
    return this;
  }

  setColor(color) {
    this.embed.setColor(color);
    return this;
  }

  build() {
    return this.embed;
  }
}

module.exports = {
  MessageEmbed,
};
