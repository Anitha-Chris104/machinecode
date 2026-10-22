import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

export const footerLinks = {
  quickLinks: [
    { title: "Home", path: "/" },
    { title: "About Us", path: "/about" },
    { title: "Products", path: "/products" },
    { title: "Industries", path: "/industries" },
    { title: "Contact", path: "/contact" },
  ],

  products: [
    "Ribbon Blender",
    "Conveyor System",
    "Packaging Machine",
    "Hotel Equipment",
    "Steam Boiler",
  ],

  social: [
    {
      name: "Facebook",
      icon: FaFacebookF,
      url: "https://www.facebook.com/CompassEngSol",
    },
    {
      name: "Instagram",
      icon: FaInstagram,
      url: "https://www.instagram.com/compassengineeringsolutions/",
    },
    // {
    //   icon: FaLinkedinIn,
    //   url: "#",
    // },
    // {
    //   icon: FaYoutube,
    //   url: "#",
    // },
  ],
};
