import { ModalSubmitInteraction, bold, italic, inlineCode } from "discord.js";
import { forceEphemeral } from "../../config";
import { swarm, swarmTypeAbbrToDisplay } from "../../rolls/swarm";

export const swarmDamage = {
  execute: async (interaction: ModalSubmitInteraction) => {
    const swarmNumber = Number(
      interaction.fields.getTextInputValue("swarmNumber")
    );

    if (isNaN(swarmNumber) || swarmNumber < 1 || swarmNumber > 10) {
      await interaction.reply({
        content: "Swarm Number must be a number between 1 and 10",
        ephemeral: forceEphemeral || true,
      });
      return;
    }

    const swarmSize = interaction.fields.getTextInputValue("swarmSize");
    if (!["t", "s", "m", "l", "h"].includes(swarmSize)) {
      await interaction.reply({
        content: "Swarm Size must be one of t, s, m, l, h",
        ephemeral: forceEphemeral || true,
      });
      return;
    }

    const swarmType = swarmTypeAbbrToDisplay[swarmSize.toLowerCase()];
    const rolls = swarm[swarmType].damage(swarmNumber);

    await interaction.reply({
      content: [
        `${bold("Swarm Damage Roll")}`,
        `${italic(`${swarmNumber} ${swarmType} creature(s)`)}`,
        ``,
        `${inlineCode(`${rolls.sortedResults.join("  ")}`)}`,
        ``,
        `${bold("Roll")}:  ${rolls.roll} (x${swarmNumber})`,
        `${bold("Total")}: ${rolls.total}`,
      ].join("\n"),
      ephemeral: forceEphemeral || true,
    });
  },
};
