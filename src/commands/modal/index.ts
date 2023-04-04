import { ModalSubmitInteraction } from "discord.js";
import { CommandGroup } from "..";
import { swarmAttack } from "./swarmAttack";
import { swarmDamage } from "./swarmDamage";

export const modal: CommandGroup<ModalSubmitInteraction> = {
  swarmAttack,
  swarmDamage,
};
