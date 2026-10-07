export type Category = "desk" | "chair" | "monitor" | "lamp" | "plant";

export interface Product {
  id: string;
  name: string;
  category: Category;
  pricePerMonth: number;
  image: string;
}

export type WorkspaceSlots = {
  desk: Product | null;
  chair: Product | null;
  lamp: Product | null;
  monitor: Product | null;
  plant: Product | null;
};

export const MOCK_PRODUCTS: Product[] = [
  // Desks
  {
    id: "desk-standing",
    name: "Smart Standing Desk",
    category: "desk",
    pricePerMonth: 45,
    image: "/items/desk-standing.svg",
  },
  {
    id: "desk-bamboo",
    name: "Bali Bamboo Desk",
    category: "desk",
    pricePerMonth: 35,
    image: "/items/desk-bamboo.svg",
  },

  // Chairs
  {
    id: "chair-ergonomic",
    name: "Ergonomic Mesh Chair",
    category: "chair",
    pricePerMonth: 30,
    image: "/items/chair-ergo.svg",
  },

  // Monitors
  {
    id: "monitor-4k",
    name: '27" 4K Display',
    category: "monitor",
    pricePerMonth: 25,
    image: "/items/monitor.svg",
  },

  // Lamps
  {
    id: "lamp-minimal",
    name: "Warm LED Lamp",
    category: "lamp",
    pricePerMonth: 10,
    image: "/items/lamp.svg",
  },

  // Plants
  {
    id: "plant-monstera",
    name: "Monstera Plant",
    category: "plant",
    pricePerMonth: 8,
    image: "/items/plant.svg",
  },
];
