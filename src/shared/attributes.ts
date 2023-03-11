const base_url =
  process.env.NODE_ENV === "production"
    ? "/ethereal-skies-wwyf/images/"
    : "src/assets/imaes";

export const attributes = [
  {
    iconUrl: base_url + "strength.png",
    name: "strength",
    viewValue: "Strength",
    max: 300,
    quantity: 0,
    stats: [
      {
        viewValue: "Attack Damage",
        multiplier: 0.2,
      },
      {
        viewValue: "Critical Strike Power",
        multiplier: 0.1,
      },
    ],
    description: `Per point bonus: 
— 0.2% Attack Damage
— 0.1% Critical Strike Power`,
  },
  {
    iconUrl: base_url + "endurance.png",
    name: "endurance",
    viewValue: "Endurance",
    max: 300,
    quantity: 0,
    stats: [
      {
        viewValue: "Defense",
        multiplier: 0.1,
      },
      {
        viewValue: "Max Health",
        multiplier: 0.2,
      },
    ],
    description: `Per point bonus: 
— 0.1% Defense
— 0.2% Max Health`,
  },
  {
    iconUrl: base_url + "dexterity.png",
    name: "dexterity",
    viewValue: "Dexterity",
    max: 300,
    quantity: 0,
    stats: [
      {
        viewValue: "Skill Critical Strike Chance",
        multiplier: 0.1,
      },
      {
        viewValue: "Critical Strike Change",
        multiplier: 0.1,
      },
    ],
    description: `Per point bonus: 
— 0.1% Skill Critical Strike Chance
— 0.1% Critical Strike Change`,
  },
  {
    iconUrl: base_url + "intelligence.png",
    name: "intelligence",
    viewValue: "Intelligence",
    max: 300,
    quantity: 0,
    stats: [
      {
        viewValue: "Skill Damage",
        multiplier: 0.1,
      },
      {
        viewValue: "Cooldown Reduction",
        multiplier: 0.1,
      },
    ],
    description: `Per point bonus: 
— 0.1% Skill Damage
— 0.1% Cooldown Reduction`,
  },
  {
    iconUrl: base_url + "wisdom.png",
    name: "wisdom",
    viewValue: "Wisdom",
    max: 300,
    quantity: 0,
    stats: [
      {
        viewValue: "Max Mana",
        multiplier: 0.1,
      },
      {
        viewValue: "Bonus Experience",
        multiplier: 0.1,
      },
    ],
    description: `Per point bonus: 
— 0.1% Max Mana
— 0.1% Bonus Experience`,
  },
];
