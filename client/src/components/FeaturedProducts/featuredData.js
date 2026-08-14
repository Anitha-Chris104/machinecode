import { CookingPot, Factory, Flame } from "lucide-react";

import blender from "../../assets/products/blender.png";
import conveyor from "../../assets/products/conveyor.png";
import hotel from "../../assets/products/hotel.png";

export const featuredProducts = [
  {
    id: 1,
    slug: "ribbon-blender",
    title: "Ribbon Blender",
    image: blender,
    icon: CookingPot,
    reverse: false,

    description:
      "Heavy-duty industrial mixer engineered for food, spices, chemicals and powder processing with superior mixing efficiency.",

    features: [
      "Food Grade Stainless Steel",
      "Heavy Duty Motor",
      "Low Maintenance",
      "Custom Capacity Available",
    ],
  },

  {
    id: 2,
    slug: "industrial-conveyor",
    title: "Industrial Conveyor",

    image: conveyor,

    icon: Factory,

    reverse: true,

    description:
      "Reliable conveyor systems designed for continuous production and material handling across manufacturing facilities.",

    features: [
      "Heavy Load Capacity",
      "Energy Efficient",
      "Easy Installation",
      "Custom Length Available",
    ],
  },

  {
    id: 3,
    slug: "steam-boiler",

    title: "Steam Boiler",

    image: hotel,

    icon: Flame,

    reverse: false,

    description:
      "Industrial steam generation systems delivering consistent heating with excellent fuel efficiency.",

    features: [
      "Fast Heating",
      "Safe Operation",
      "Fuel Efficient",
      "Long Service Life",
    ],
  },
];
