export const allPositions = [
  {
    id: "brainhub",
    position: "Full-stack Engineer",
    company: "Brainhub",
    start: new Date("2022-10-01"),
    link: "https://brainhub.eu",
    type: "Full-time",
    description:
      "Working on enterprise-level web and mobile applications for international clients. Focusing on delivering high-quality code while following best practices and modern development patterns. Collaborating closely with cross-functional teams to create scalable and maintainable solutions.",
    icon: "/svg/brainhub.svg",
  },
  {
    id: "zagrodzki",
    position: "Blogger",
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
