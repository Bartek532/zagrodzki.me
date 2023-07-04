import { Hero } from "components/common/hero/Hero";
import { Contact } from "components/contact/Contact";
import { getMetadata } from "lib/metadata";

const description = "Do you want to cooperate? Ask for something? Or just chat? Let me know 💬";

export const metadata = getMetadata({ title: "Contact", description, image: "/img/contact.png" });

const ContactPage = () => (
  <>
    <Hero title="Contact" description={description} />
    <Contact />
  </>
);

export default ContactPage;
