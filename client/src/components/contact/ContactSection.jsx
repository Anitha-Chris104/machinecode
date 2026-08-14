import ContactForm from "./ContactForm";
import ContactMap from "./ContactMap";

const ContactSection = () => {
  return (
    <section
      id="contact-form"
      className="relative py-24 bg-white overflow-hidden"
    >
      {/* Decorative Blur */}
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#C2441C]/10 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-[#852E47]/10 blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.2fr_.8fr] gap-12">
          <ContactForm />

          <ContactMap />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
