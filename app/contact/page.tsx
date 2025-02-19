import { Contact } from "@/components/contact";
import { Hero } from "@/components/contact/hero";
import { getMetadata } from "@/lib/metadata";

const description = "Do you want to cooperate? Ask for something? Or just chat? Let me know 💬";

export const metadata = getMetadata({
  title: "Contact",
  description,
  image: "/img/contact.png",
  url: "/contact",
});

const ContactPage = () => (
  <>
    <Hero description={description} />
    <Contact />
  </>
);

export default ContactPage;
