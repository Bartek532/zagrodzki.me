import { isLocalLikesData } from "./validation/validator";

export const getGivenLikes = (givenLikes: string | null, slug: string) => {
  const parsed: unknown = givenLikes ? JSON.parse(givenLikes) : null;

  if (!parsed || !isLocalLikesData(parsed)) {
    return 0;
  }

  return parsed[slug] ?? 0;
};

export const incrementGivenLikes = (givenLikes: string | null, slug: string) => {
  const parsed: unknown = givenLikes ? JSON.parse(givenLikes) : null;

  if (!parsed || !isLocalLikesData(parsed)) {
    return JSON.stringify({ [slug]: 1 });
  }

  return JSON.stringify({ ...parsed, [slug]: (parsed[slug] ?? 0) + 1 });
};

export const decrementGivenLikes = (givenLikes: string | null, slug: string) => {
  const parsed: unknown = givenLikes ? JSON.parse(givenLikes) : null;

  if (!parsed || !isLocalLikesData(parsed)) {
    return JSON.stringify({ [slug]: 0 });
  }

  const current = parsed[slug] ?? 0;

  if (current === 0) {
    return JSON.stringify(parsed);
  }

  return JSON.stringify({ ...parsed, [slug]: current - 1 });
};
