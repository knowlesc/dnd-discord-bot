import {
  CommandInteraction,
  ModalSubmitInteraction,
  ButtonInteraction,
} from "discord.js";
import { modal } from "./modal";
import { slash } from "./slash";
import { button } from "./button";

export type CommandTypes =
  | CommandInteraction
  | ModalSubmitInteraction
  | ButtonInteraction;

export type CommandGroup<T extends CommandTypes = CommandInteraction> = Record<
  string,
  Command<T>
>;

export type Command<T extends CommandTypes = CommandInteraction> = {
  execute: (interaction: T) => Promise<void>;
};

export const commands = {
  modal,
  slash,
  button,
};
