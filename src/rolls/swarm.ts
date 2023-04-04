import { DiceRoll } from "@dice-roller/rpg-dice-roller";

export type swarmTypes = "tiny" | "small" | "medium" | "large" | "huge";

export const swarmTypeAbbrToDisplay: Record<string, swarmTypes> = {
  t: "tiny",
  s: "small",
  m: "medium",
  l: "large",
  h: "huge",
};

export const swarmTypeDisplayToAbbr: Record<swarmTypes, string> = {
  tiny: "t",
  small: "s",
  medium: "m",
  large: "l",
  huge: "h",
};

const swarmConfig: Record<
  swarmTypes,
  {
    attackModifier: string;
    damageDieType: string;
    damageDieBaseNumber: number;
    damageModifier: string;
  }
> = {
  tiny: {
    attackModifier: "+8",
    damageDieType: "d4",
    damageDieBaseNumber: 1,
    damageModifier: "+4",
  },
  small: {
    attackModifier: "+6",
    damageDieType: "d8",
    damageDieBaseNumber: 1,
    damageModifier: "+2",
  },
  medium: {
    attackModifier: "+5",
    damageDieType: "d6",
    damageDieBaseNumber: 2,
    damageModifier: "+1",
  },
  large: {
    attackModifier: "+6",
    damageDieType: "d10",
    damageDieBaseNumber: 2,
    damageModifier: "+2",
  },
  huge: {
    attackModifier: "+8",
    damageDieType: "d12",
    damageDieBaseNumber: 2,
    damageModifier: "+4",
  },
};

const swarmAttack = (swarmSize: swarmTypes, swarmNumber: number) => {
  const { attackModifier } = swarmConfig[swarmSize];

  const roll = `1d20${attackModifier}`;
  const attackRolls = Array.from(
    { length: swarmNumber },
    () => new DiceRoll(roll).total
  );

  return {
    roll,
    results: attackRolls,
    sortedResults: attackRolls.sort((a, b) => a - b),
  };
};

const swarmDamage = (swarmSize: swarmTypes, swarmNumber: number) => {
  const { damageDieType, damageDieBaseNumber, damageModifier } =
    swarmConfig[swarmSize];

  const roll = `${damageDieBaseNumber}${damageDieType}${damageModifier}`;
  const damageRolls = Array.from(
    { length: swarmNumber },
    () => new DiceRoll(roll).total
  );

  return {
    roll,
    results: damageRolls,
    sortedResults: damageRolls.sort((a, b) => a - b),
    total: damageRolls.reduce((a, b) => a + b),
  };
};

export const swarm = {
  tiny: {
    attack: (swarmNumber: number) => swarmAttack("tiny", swarmNumber),
    damage: (swarmNumber: number) => swarmDamage("tiny", swarmNumber),
  },
  small: {
    attack: (swarmNumber: number) => swarmAttack("small", swarmNumber),
    damage: (swarmNumber: number) => swarmDamage("small", swarmNumber),
  },
  medium: {
    attack: (swarmNumber: number) => swarmAttack("medium", swarmNumber),
    damage: (swarmNumber: number) => swarmDamage("medium", swarmNumber),
  },
  large: {
    attack: (swarmNumber: number) => swarmAttack("large", swarmNumber),
    damage: (swarmNumber: number) => swarmDamage("large", swarmNumber),
  },
  huge: {
    attack: (swarmNumber: number) => swarmAttack("huge", swarmNumber),
    damage: (swarmNumber: number) => swarmDamage("huge", swarmNumber),
  },
};
