import ribbonBlender from "../assets/products/blender.png";
import conveyor from "../assets/products/conveyor.png";
import boiler from "../assets/products/hotel.png";

export const products = [
  {
    id: 1,

    slug: "ribbon-blender",

    name: "Ribbon Blender",

    category: "Food Processing",

    images: [ribbonBlender, ribbonBlender, ribbonBlender, ribbonBlender],

    shortDescription: "Industrial ribbon blender for powder and food mixing.",

    description:
      "Our Ribbon Blender is engineered for efficient and uniform mixing of powders, granules, spices, chemicals and food ingredients. Built with premium stainless steel and designed for long-term industrial use.",

    specifications: {
      Capacity: "100 - 5000 Kg",
      Material: "SS304 / SS316",
      Power: "5 HP - 30 HP",
      Voltage: "415V",
      MixingTime: "8 - 15 Minutes",
      Warranty: "1 Year",
    },

    features: [
      {
        icon: "shield",
        title: "Food Grade Material",
        description:
          "Manufactured using high-quality stainless steel suitable for food industries.",
      },
      {
        icon: "zap",
        title: "Energy Efficient",
        description:
          "Consumes less power while delivering high mixing performance.",
      },
      {
        icon: "factory",
        title: "Heavy Duty Design",
        description: "Built for continuous industrial production.",
      },
      {
        icon: "settings",
        title: "Easy Maintenance",
        description: "Simple cleaning and low maintenance requirements.",
      },
      {
        icon: "wrench",
        title: "Custom Sizes",
        description:
          "Available in multiple capacities based on customer needs.",
      },
      {
        icon: "trending",
        title: "High Productivity",
        description: "Reduces production time and increases output.",
      },
    ],

    applications: [
      "Food Industry",
      "Spice Manufacturing",
      "Chemical Industry",
      "Pharmaceutical Industry",
      "Animal Feed Plants",
    ],

    industries: [
      {
        title: "Food Processing",
        icon: "UtensilsCrossed",
        description: "Ideal for flour, spices and food ingredients.",
      },
      {
        title: "Chemical",
        icon: "FlaskConical",
        description: "Reliable powder mixing solution.",
      },
      {
        title: "Pharmaceutical",
        icon: "Pill",
        description: "Suitable for pharmaceutical powders.",
      },
      {
        title: "Hotels",
        icon: "ChefHat",
        description: "Large-scale commercial kitchen mixing.",
      },
    ],

    faq: [
      {
        question: "Can this machine mix spices?",
        answer: "Yes. It is designed for spices, flour, chemicals and powders.",
      },
      {
        question: "Can capacity be customized?",
        answer:
          "Yes. We manufacture custom capacities according to requirements.",
      },
      {
        question: "What material is used?",
        answer: "Food-grade SS304 or SS316 stainless steel.",
      },
    ],

    brochure: "/brochures/ribbon-blender.pdf",
  },

  // Conveyor

  {
    id: 2,

    slug: "conveyor-system",

    name: "Conveyor System",

    category: "Material Handling",

    images: [conveyor, conveyor, conveyor, conveyor],

    shortDescription: "Heavy-duty industrial conveyor system.",

    description:
      "Industrial conveyor designed for efficient material handling across production facilities.",

    specifications: {
      Capacity: "2 Ton",
      Material: "Mild Steel",
      Power: "3 HP",
      Voltage: "415V",
      Speed: "Custom",
      Warranty: "1 Year",
    },

    features: [
      {
        icon: "factory",
        title: "Heavy Duty Structure",
        description: "Designed for continuous industrial use.",
      },
      {
        icon: "zap",
        title: "Energy Efficient",
        description: "Low power consumption.",
      },
      {
        icon: "shield",
        title: "Safe Operation",
        description: "Built with industrial safety standards.",
      },
      {
        icon: "settings",
        title: "Custom Length",
        description: "Available in different sizes.",
      },
      {
        icon: "wrench",
        title: "Easy Maintenance",
        description: "Quick servicing and replacement.",
      },
      {
        icon: "trending",
        title: "High Productivity",
        description: "Improves production workflow.",
      },
    ],

    applications: ["Warehouse", "Packaging", "Food Factory", "Manufacturing"],

    industries: [
      {
        title: "Manufacturing",
        icon: "Factory",
        description: "Efficient material movement.",
      },
    ],

    faq: [
      {
        question: "Can the conveyor length be customized?",
        answer: "Yes. We manufacture conveyors according to factory layout.",
      },
    ],

    brochure: "/brochures/conveyor.pdf",
  },

  // Steam Boiler

  {
    id: 3,

    slug: "steam-boiler",

    name: "Steam Boiler",

    category: "Industrial Heating",

    images: [boiler, boiler, boiler, boiler],

    shortDescription: "Industrial steam boiler with high fuel efficiency.",

    description:
      "Heavy-duty steam boiler suitable for hotels, food processing plants and industrial heating.",

    specifications: {
      Capacity: "500 Kg/hr",
      Fuel: "Diesel / Gas",
      Pressure: "10 Bar",
      Warranty: "1 Year",
    },

    features: [
      {
        icon: "zap",
        title: "Fast Heating",
        description: "Rapid steam generation.",
      },
      {
        icon: "shield",
        title: "Safe Design",
        description: "Multiple safety controls.",
      },
      {
        icon: "factory",
        title: "Industrial Grade",
        description: "Designed for continuous operation.",
      },
    ],

    applications: ["Hotels", "Hospitals", "Food Plants"],

    industries: [
      {
        title: "Hotels",
        icon: "ChefHat",
        description: "Commercial kitchen steam supply.",
      },
    ],

    faq: [
      {
        question: "Which fuel is supported?",
        answer: "Diesel and LPG/Gas models are available.",
      },
    ],

    brochure: "/brochures/steam-boiler.pdf",
  },
];
