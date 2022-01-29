export const getHeadings = (source: string) => {
  const HEADING_REGEX = /<h[2-6](.*?)<\/h[2-6]>/g;

  if (source.match(HEADING_REGEX) && typeof window !== "undefined") {
    return source.match(HEADING_REGEX)?.map((heading) => {
      const headingEl = new DOMParser().parseFromString(heading, "text/html").body.firstChild as Element;

      return {
        text: headingEl.textContent,
        level: headingEl.tagName,
        id: headingEl.id,
      };
    });
  }
};
