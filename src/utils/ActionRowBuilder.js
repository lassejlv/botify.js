const { ActionRowBuilder, ButtonStyle, ButtonBuilder } = require("discord.js");

class RowBuilder {
  constructor() {
    this.row = new ActionRowBuilder();
  }

  addButton(options) {
    const button = new ButtonBuilder()
      .setCustomId(`${options.id}`)
      .setLabel(`${options.label}`)
      .setStyle(`${ButtonStyle[options.style]}`);

    this.row.addComponents(button);
    return this;
  }

  build() {
    return this.row;
  }
}

module.exports = {
  RowBuilder,
};
