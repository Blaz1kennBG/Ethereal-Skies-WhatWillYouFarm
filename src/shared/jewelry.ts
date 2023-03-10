export const data = [
  {
    icon: "maki:jewelry-store",
    type: "accessory",
    viewValue: "Gold Bracers",
    name: "gold_bracers",
    requirements: {
      level: 26,
      coins: 375,
    },
    materials: [
      {
        name: "worn_leather",
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
    icon: "maki:jewelry-store",
    type: "accessory",
    viewValue: "Gold Belt",
    name: "gold_belt",
    requirements: {
      level: 28,
      coins: 375,
    },
    materials: [
      {
        name: "worn_leather",
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
    icon: "maki:jewelry-store",
    type: "accessory",
    viewValue: "Iron Bracers",
    name: "iron_bracers",
    requirements: {
      level: 1,
      coins: 125,
    },
    materials: [
      {
        name: "tattered_leather",
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
    icon: "maki:jewelry-store",
    type: "accessory",
    viewValue: "Iron Belt",
    name: "iron_belt",
    requirements: {
      level: 3,
      coins: 125,
    },
    materials: [
      {
        name: "tattered_leather",
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
    icon: "maki:jewelry-store",
    type: "accessory",
    viewValue: "Iron Ring",
    name: "iron_ring",
    requirements: {
      level: 5,
      coins: 125,
    },
    materials: [
      {
        name: "refined_iron",
        raw: 12,
        quantity: 12,
      },
      {
        name: "magic_crystal",
        raw: 6,
        quantity: 6,
      },
    ],
  },
  {
    icon: "maki:jewelry-store",
    type: "accessory",
    viewValue: "Gold Ring",
    name: "gold_ring",
    requirements: {
      level: 5,
      coins: 125,
    },
    materials: [
      {
        name: "refined_gold",
        raw: 12,
        quantity: 12,
      },
      {
        name: "magic_crystal",
        raw: 12,
        quantity: 12,
      },
    ],
  },
  {
    icon: "maki:jewelry-store",
    type: "accessory",
    viewValue: "Gold Necklace",
    name: "gold_necklace",
    requirements: {
      level: 33,
      coins: 375,
    },
    materials: [
      {
        name: "refined_gold",
        raw: 15,
        quantity: 15,
      },
      {
        name: "magic_crystal",
        raw: 12,
        quantity: 12,
      },
    ],
  },
  {
    icon: "maki:jewelry-store",
    type: "accessory",
    viewValue: "Iron Necklace",
    name: "iron_necklace",
    requirements: {
      level: 8,
      coins: 125,
    },
    materials: [
      {
        name: "refined_iron",
        raw: 15,
        quantity: 15,
      },
      {
        name: "magic_crystal",
        raw: 6,
        quantity: 6,
      },
    ],
  },
];
export const accessories = () => {
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
