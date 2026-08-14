import { ChefHat, Factory, CookingPot } from "lucide-react";

import food from "../../assets/products/food.png";
import conveyor from "../../assets/products/conveyor.png";
import hotel from "../../assets/products/hotel.png";

export const productCategories = [
  {
    id: 1,
    title: "Food Industry Machines",
    icon: ChefHat,
    image: food,
    products: [
      "Mixer Machine",
      "Packaging Machine",
      "Conveyor System",
      "Pulverizer Machine",
      "Filling Machine",
    ],
  },

  {
    id: 2,
    title: "Factory Equipment",
    icon: Factory,
    image: conveyor,
    products: [
      "Conveyor Belts",
      "Material Handling Systems",
      "Storage Systems",
      "Automation Solutions",
      "Processing Equipment",
    ],
  },

  {
    id: 3,
    title: "Hotel Equipment",
    icon: CookingPot,
    image: hotel,
    products: [
      "Industrial Kitchen Systems",
      "Steam Boilers",
      "Refrigeration Units",
      "Washing Systems",
      "Food Warmers",
    ],
  },
];
