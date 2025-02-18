import { Crown, Dumbbell, LibraryBig } from "lucide-react";

export const allFacts = [
  {
    icon: Dumbbell,
    title: "I do 100 pushups every day",
    description:
      "The beginning was hard, but if I ever give up, you can slap me in the face. Are you in? 💪",
  },
  {
    icon: LibraryBig,
    title: "I've read 55 books last year",
    description:
      "I love to read and try to improve on that this year. What book could you recommend? 📖",
  },
  {
    icon: Crown,
    title: "I really like chess",
    description:
      "I don't play the best, but I've managed to win a few school tournaments. Do you want to go up against me? Let's play ♟️",
  },
] as const;
