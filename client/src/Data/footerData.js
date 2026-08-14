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
      icon: FaFacebookF,
      url: "#",
    },
    {
      icon: FaInstagram,
      url: "#",
    },
    {
      icon: FaLinkedinIn,
      url: "#",
    },
    {
      icon: FaYoutube,
      url: "#",
    },
  ],
};
