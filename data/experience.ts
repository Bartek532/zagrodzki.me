export const allPositions = [
  {
    id: "dropbox",
    position: "Software Engineer",
    company: "Dropbox",
    start: new Date("2025-09-01"),
    link: "https://dropbox.com",
    type: "Full-time",
    description:
      "Building collaborative, secure content workflows used by millions. Shipping high-quality experiences with strong emphasis on performance, accessibility, and reliability. Partnering with design and product to deliver intuitive UIs, instrumented with analytics and experiments. Owning features end-to-end from architecture and testing to rollout and monitoring.",
    icon: "/svg/dropbox.svg",
  },
  {
    id: "brainhub",
    position: "Full-stack Engineer",
    company: "Brainhub",
    start: new Date("2022-10-01"),
    end: new Date("2025-09-01"),
    link: "https://brainhub.eu",
    type: "Full-time",
    description:
      "Working on enterprise-level web and mobile applications for international clients. Focusing on delivering high-quality code while following best practices and modern development patterns. Collaborating closely with cross-functional teams to create scalable and maintainable solutions.",
    icon: "/svg/brainhub.svg",
  },
  {
    id: "zagrodzki",
    position: "Founder",
    company: "zagrodzki.me",
    start: new Date("2022-02-01"),
    link: "https://www.zagrodzki.me",
    type: "Part-time",
    description:
      "Writing technical articles and tutorials about React, TypeScript and modern web development. Sharing knowledge and experiences with the developer community while continuously learning and researching new technologies. Building an engaged audience through quality content and social media presence.",
    icon: "/svg/logo.svg",
  },
  {
    id: "freelancer",
    position: "Front-end Developer",
    company: "Freelancer",
    start: new Date("2021-06-01"),
    end: new Date("2022-09-01"),
    link: "https://useme.com/pl/roles/contractor/bartosz-zagrodzki,174146",
    type: "Part-time",
    description:
      "Developed custom websites and web applications for various clients as an independent contractor. Managed entire project lifecycles from requirements gathering to deployment while maintaining direct client communication. Specialized in creating responsive and performant React-based solutions.",
    icon: "/img/avatars/computer.png",
  },
] as const;
