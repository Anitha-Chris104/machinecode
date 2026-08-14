import ContactHero from "../components/contact/ContactHero";
import ContactInfo from "../components/contact/ContactInfo";
import ContactSection from "../components/contact/ContactSection";
import WhyChooseContact from "../components/contact/WhyChooseContact";
import ContactCTA from "../components/contact/ContactCTA";
import { Helmet } from "react-helmet-async";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us | Machine Code</title>

        <meta
          name="description"
          content="Contact Machine Code for industrial machinery, custom manufacturing solutions, quotations and technical support."
        />
      </Helmet>
      <ContactHero />
      <ContactInfo />
      <ContactSection />
      <WhyChooseContact />
      <ContactCTA />

      {/* Next Sections */}
    </>
  );
};

export default Contact;
