export const data = [
  {
    icon: "mdi:pickaxe",
    type: "tool",
    viewValue: "Gold Pickaxe",
    name: "gold_pickaxe",
    requirements: {
      level: 30,
      coins: 750,
    },
    materials: [
      {
        name: "moldy_plank",
        raw: 8,
        quantity: 8,
      },
      {
        name: "refined_gold",
        raw: 8,
        quantity: 8,
      },
      {
        name: "magic_crystal",
        raw: 12,
        quantity: 12,
      },
    ],
  },
  {
    icon: "mdi:pickaxe",
    type: "tool",
    viewValue: "Gold Shovel",
    name: "gold_shovel",
    requirements: {
      level: 30,
      coins: 750,
    },
    materials: [
      {
        name: "moldy_plank",
        raw: 8,
        quantity: 8,
      },
      {
        name: "refined_gold",
        raw: 8,
        quantity: 8,
      },
      {
        name: "magic_crystal",
        raw: 12,
        quantity: 12,
      },
    ],
  },
  {
    icon: "mdi:pickaxe",
    type: "tool",
    viewValue: "Gold Axe",
    name: "gold_axe",
    requirements: {
      level: 30,
      coins: 750,
    },
    materials: [
      {
        name: "moldy_plank",
        raw: 8,
        quantity: 8,
      },
      {
        name: "refined_gold",
        raw: 8,
        quantity: 8,
      },
      {
        name: "magic_crystal",
        raw: 12,
        quantity: 12,
      },
    ],
  },
  {
    icon: "mdi:pickaxe",
    type: "tool",
    viewValue: "Gold Rod",
    name: "gold_rod",
    requirements: {
      level: 30,
      coins: 750,
    },
    materials: [
      {
        name: "moldy_plank",
        raw: 8,
        quantity: 8,
      },
      {
        name: "refined_gold",
        raw: 8,
        quantity: 8,
      },
      {
        name: "magic_crystal",
        raw: 12,
        quantity: 12,
      },
    ],
  },

  {
    icon: "mdi:pickaxe",
    type: "tool",
    viewValue: "Iron Pickaxe",
    name: "iron_pickaxe",
    requirements: {
      level: 15,
      coins: 250,
    },
    materials: [
      {
        name: "rotten_plank",
        raw: 8,
        quantity: 8,
      },
      {
        name: "refined_iron",
        raw: 8,
        quantity: 8,
      },
      {
        name: "magic_crystal",
        raw: 6,
        quantity: 6,
      },
    ],
  },

  {
    icon: "mdi:pickaxe",
    type: "tool",
    viewValue: "Iron Shovel",
    name: "iron_shovel",
    requirements: {
      level: 15,
      coins: 250,
    },
    materials: [
      {
        name: "rotten_plank",
        raw: 8,
        quantity: 8,
      },
      {
        name: "refined_iron",
        raw: 8,
        quantity: 8,
      },
      {
        name: "magic_crystal",
        raw: 6,
        quantity: 6,
      },
    ],
  },
  {
    icon: "mdi:pickaxe",
    type: "tool",
    viewValue: "Iron Axe",
    name: "iron_axe",
    requirements: {
      level: 15,
      coins: 250,
    },
    materials: [
      {
        name: "rotten_plank",
        raw: 8,
        quantity: 8,
      },
      {
        name: "refined_iron",
        raw: 8,
        quantity: 8,
      },
      {
        name: "magic_crystal",
        raw: 6,
        quantity: 6,
      },
    ],
  },
  {
    icon: "mdi:pickaxe",
    type: "tool",
    viewValue: "Iron Rod",
    name: "iron_rod",
    requirements: {
      level: 15,
      coins: 250,
    },
    materials: [
      {
        name: "rotten_plank",
        raw: 8,
        quantity: 8,
      },
      {
        name: "refined_iron",
        raw: 8,
        quantity: 8,
      },
      {
        name: "magic_crystal",
        raw: 6,
        quantity: 6,
      },
    ],
  },
];
export const tools = () => {
  const nameList = data.map((v) => v.name);
  nameList.forEach((str) => {
    const dublicates = nameList.filter((name) => name === str);
    if (dublicates.length > 1) {
      throw new Error(`Dublicates found: ${str}`);
    }
  });
  // console.log("Ingredients does not have dublicates.");
  return data;
};
