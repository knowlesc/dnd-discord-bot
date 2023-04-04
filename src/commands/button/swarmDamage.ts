import {
  ActionRowBuilder,
  ButtonInteraction,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";

export const swarmDamage = {
  execute: async (interaction: ButtonInteraction) => {
    const modal = new ModalBuilder()
      .setCustomId("swarmDamage")
      .setTitle("Swarm Damage Rolls");

    modal.addComponents(
      new ActionRowBuilder<TextInputBuilder>().addComponents(
        new TextInputBuilder()
          .setCustomId("swarmNumber")
          .setLabel("Swarm Number (1-10)")
          .setStyle(TextInputStyle.Short)
          .setMaxLength(2)
      ),
      new ActionRowBuilder<TextInputBuilder>().addComponents(
        new TextInputBuilder()
          .setCustomId("swarmSize")
          .setLabel("Size (t, s, m, l, h)")
          .setStyle(TextInputStyle.Short)
          .setMaxLength(1)
      )
    );

    await interaction.showModal(modal);
  },
};
