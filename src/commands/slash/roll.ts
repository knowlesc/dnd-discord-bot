import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  CommandInteraction,
  SlashCommandBuilder,
} from "discord.js";
import { forceEphemeral } from "../../config";

export const roll = {
  data: new SlashCommandBuilder().setName("roll").setDescription("Roll"),
  execute: async (interaction: CommandInteraction) => {
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId("swarmAttack")
        .setLabel("Swarm Attack")
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId("swarmDamage")
        .setLabel("Swarm Damage")
        .setStyle(ButtonStyle.Danger)
    );

    await interaction.reply({
      ephemeral: forceEphemeral || true,
      content: "Rolls",
      components: [row],
    });
  },
};
