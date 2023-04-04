import { CommandInteraction } from "discord.js";
import { CommandGroup } from "..";
import { roll } from "./roll";

export const slash: CommandGroup<CommandInteraction> = {
  roll,
};
