import { bold, inlineCode, italic, ModalSubmitInteraction } from "discord.js";
import { forceEphemeral } from "../../config";
import { swarm, swarmTypeAbbrToDisplay, swarmTypes } from "../../rolls/swarm";

export const swarmAttack = {
  execute: async (interaction: ModalSubmitInteraction) => {
    const swarmNumber = Number(
      interaction.fields.getTextInputValue("swarmNumber")
    );

    if (isNaN(swarmNumber) || swarmNumber < 2 || swarmNumber > 10) {
      await interaction.reply({
        content: "Swarm Number must be a number between 2 and 10",
        ephemeral: forceEphemeral || true,
      });
      return;
    }

    const swarmSize = interaction.fields.getTextInputValue("swarmSize");
    if (!["t", "s", "m", "l", "h"].includes(swarmSize.toLowerCase())) {
      await interaction.reply({
        content: "Swarm Size must be one of t, s, m, l, h",
        ephemeral: forceEphemeral || true,
      });
      return;
    }

    const swarmType = swarmTypeAbbrToDisplay[swarmSize.toLowerCase()];
    const rolls = swarm[swarmType].attack(swarmNumber);

    await interaction.reply({
      content: [
        `${bold("Swarm Attack Roll")}`,
        `${italic(`${swarmNumber} ${swarmType} creature(s)`)}`,
        ``,
        `${inlineCode(`${rolls.sortedResults.join("  ")}`)}`,
        ``,
        `${bold("Roll")}:  ${rolls.roll} (x${swarmNumber})`,
      ].join("\n"),
      ephemeral: forceEphemeral || true,
    });
  },
};
