import { ButtonInteraction } from "discord.js";
import { CommandGroup } from "..";
import { swarmAttack } from "./swarmAttack";
import { swarmDamage } from "./swarmDamage";

export const button: CommandGroup<ButtonInteraction> = {
  swarmAttack,
  swarmDamage,
};
