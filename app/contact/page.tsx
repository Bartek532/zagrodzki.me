import { Hero } from "components/common/hero/Hero";
import { Contact } from "components/contact/Contact";

const description = "Do you want to cooperate? Ask for something? Or just chat? Let me know 💬";

const ContactPage = () => (
  <>
    <Hero title="Contact" description={description} />
    <Contact />
  </>
);

export default ContactPage;
