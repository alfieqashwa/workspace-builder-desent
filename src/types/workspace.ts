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
  // Desks
  {
    id: "desk-standing-electric",
    name: "Ergonomic Electric Standing Desk",
    category: "desk",
    pricePerMonth: 45,
    image: "/items/desk-standing.svg",
  },
  {
    id: "desk-bamboo-minimal",
    name: "Bali Natural Bamboo Desk",
    category: "desk",
    pricePerMonth: 35,
    image: "/items/desk-bamboo.svg",
  },

  // Chairs
  {
    id: "chair-herman-miller",
    name: "Premium Ergonomic Mesh Chair",
    category: "chair",
    pricePerMonth: 35,
    image: "/items/chair-ergo.svg",
  },

  // Monitors
  {
    id: "monitor-dell-ultrasharp",
    name: 'Dell 27" 4K USB-C Monitor',
    category: "monitor",
    pricePerMonth: 28,
    image: "/items/monitor.svg",
  },

  // Desk Accessories
  {
    id: "lamp-minimal",
    name: "Warm Minimalist LED Desk Lamp",
    category: "lamp",
    pricePerMonth: 12,
    image: "/items/lamp.svg",
  },
  {
    id: "plant-tropical-monstera",
    name: "Indoor Potted Monstera Plant",
    category: "plant",
    pricePerMonth: 8,
    image: "/items/plant.svg",
  },

  // Coffee Station
  {
    id: "coffee-delonghi-espresso",
    name: "DeLonghi Espresso & Coffee Maker",
    category: "coffee",
    pricePerMonth: 25,
    image: "/items/coffee-machine.svg",
  },

  // Outdoor Gear
  {
    id: "outdoor-custom-surfboard",
    name: "Canggu Shortboard Surfboard",
    category: "outdoor",
    pricePerMonth: 20,
    image: "/items/surfboard.svg",
  },

  // Relax Zone
  {
    id: "relax-waterproof-beanbag",
    name: "Outdoor Waterproof Bean Bag",
    category: "relax",
    pricePerMonth: 15,
    image: "/items/beanbag.svg",
  },

  // Storage & Garage
  {
    id: "garage-metal-rack",
    name: "Heavy-Duty Equipment Storage Shelf",
    category: "garage",
    pricePerMonth: 18,
    image: "/items/shelf.svg",
  },
];
