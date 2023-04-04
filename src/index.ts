import {
  Interaction,
  CommandInteraction,
  Client,
  Events,
  GatewayIntentBits,
  ModalSubmitInteraction,
} from "discord.js";
import { Command, CommandGroup, commands, CommandTypes } from "./commands";

import dotenv from "dotenv";
import { forceEphemeral } from "./config";

dotenv.config();

const token = process.env.DISCORD_TOKEN;

if (!token) throw new Error("No token provided");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(token);

const getCommandOrThrow = <T extends CommandTypes>(
  commandName: string,
  commands: CommandGroup<T>
) => {
  const command = commands[commandName];

  if (!command) {
    throw new Error(`No command matching ${commandName} was found.`);
  }

  return command;
};

const executeCommand = async <T extends CommandTypes>(
  command: Command<T>,
  interaction: T
) => {
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    const response = {
      content: "There was an error while executing this command!",
      ephemeral: forceEphemeral || true,
    };
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(response);
    } else {
      await interaction.reply(response);
    }
  }
};

client.on(Events.InteractionCreate, async (interaction) => {
  try {
    if (interaction.isButton()) {
      const command = getCommandOrThrow(interaction.customId, commands.button);
      await executeCommand(command, interaction);
    } else if (interaction.isChatInputCommand()) {
      const command = getCommandOrThrow(
        interaction.commandName,
        commands.slash
      );

      await executeCommand(command, interaction);
    } else if (interaction.isModalSubmit()) {
      const command = getCommandOrThrow(interaction.customId, commands.modal);
      await executeCommand(command, interaction);
    } else {
      console.error("No handler for", interaction);
    }
  } catch (e) {
    console.error(e);
  }
});
