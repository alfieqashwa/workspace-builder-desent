export type Category =
  | "desk"
  | "chair"
  | "monitor"
  | "lamp"
  | "plant"
  | "coffee"
  | "outdoor"
  | "relax"
  | "garage";

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
  monitorLeft: Product | null;
  monitorCenter: Product | null;
  monitorRight: Product | null;
  plant: Product | null;
  coffee: Product | null;
  outdoor: Product | null;
  relax: Product | null;
  garage: Product | null;
};

export const MOCK_PRODUCTS: Product[] = [
  // --- DESKS ---
  {
    id: "desk-standing-electric",
    name: "Standing Desk Pro",
    category: "desk",
    pricePerMonth: 45,
    image: "/items/desk-standing.svg",
  },
  {
    id: "desk-minimal-wood",
    name: "Oak Wood Minimalist Desk",
    category: "desk",
    pricePerMonth: 35,
    image: "/items/desk-bamboo.svg",
  },

  // --- CHAIRS ---
  {
    id: "chair-herman-miller",
    name: "Ergonomic Mesh Chair",
    category: "chair",
    pricePerMonth: 40,
    image: "/items/chair-ergo.svg",
  },
  {
    id: "chair-leather-exec",
    name: "Leather Executive Chair",
    category: "chair",
    pricePerMonth: 50,
    image: "/items/chair-leather.svg",
  },
  {
    id: "chair-active-stool",
    name: "Active Balance Stool",
    category: "chair",
    pricePerMonth: 20,
    image: "/items/chair-stool.svg",
  },

  // --- MONITORS ---
  {
    id: "monitor-dell-ultrasharp",
    name: '27" 4K USB-C Monitor',
    category: "monitor",
    pricePerMonth: 30,
    image: "/items/monitor.svg",
  },
  {
    id: "monitor-curved-ultrawide",
    name: '34" Curved Ultrawide',
    category: "monitor",
    pricePerMonth: 55,
    image: "/items/monitor-ultrawide.svg",
  },
  {
    id: "monitor-portable-16",
    name: '16" OLED Portable Display',
    category: "monitor",
    pricePerMonth: 22,
    image: "/items/monitor-portable.svg",
  },

  // --- ACCESSORIES ---
  {
    id: "lamp-minimal",
    name: "LED Task Desk Light",
    category: "lamp",
    pricePerMonth: 10,
    image: "/items/lamp.svg",
  },
  {
    id: "plant-tropical-monstera",
    name: "Monstera Deliciosa Plant",
    category: "plant",
    pricePerMonth: 8,
    image: "/items/plant.svg",
  },
  {
    id: "plant-succulent-trio",
    name: "Mini Succulent Set",
    category: "plant",
    pricePerMonth: 6,
    image: "/items/succulents.svg",
  },

  // --- LIFESTYLE ---
  {
    id: "coffee-espresso-machine",
    name: "Compact Espresso Machine",
    category: "coffee",
    pricePerMonth: 25,
    image: "/items/coffee-machine.svg",
  },
  {
    id: "outdoor-surfboard",
    name: "Minimalist Surfboard Display",
    category: "outdoor",
    pricePerMonth: 18,
    image: "/items/sufboard.svg",
  },
  {
    id: "relax-beanbag",
    name: "Ergonomic Lounge Beanbag",
    category: "relax",
    pricePerMonth: 15,
    image: "/items/beanbag.svg",
  },
  {
    id: "garage-tool-rack",
    name: "Pegboard Tool Organizer",
    category: "garage",
    pricePerMonth: 14,
    image: "/items/shelf.svg",
  },
];
