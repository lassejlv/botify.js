const {
  ActionRowBuilder,
  ButtonStyle,
  ButtonBuilder,
  StringSelectMenuBuilder,
} = require("discord.js");

class RowBuilder {
  constructor() {
    this.row = new ActionRowBuilder();
  }

  addButton(options) {
    const button = new ButtonBuilder()
      .setCustomId(`${options.id}`)
      .setLabel(`${options.label}`)
      .setStyle(`${ButtonStyle[options.style]}`)
      .setDisabled(options.disabled || false);

    this.row.addComponents(button);
    return this;
  }

  addSelectMenu(options) {
    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId(`${options.id}`)
      .setPlaceholder(`${options.placeholder}`)
      .setMinValues(options.minValues || 1)
      .setMaxValues(options.maxValues || 1)
      .addOptions(options.options)
      .setDisabled(options.disabled || false);

    this.row.addComponents(selectMenu);
    return this;
  }

  build() {
    return this.row;
  }
}

module.exports = {
  RowBuilder,
};
