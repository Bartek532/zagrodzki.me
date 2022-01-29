import { useState, useRef, useEffect } from "react";

import { useIntersectionObserver } from "hooks/useIntersectionObserver";

const options = {
  threshold: 1,
};

export const useRunningHeader = (el: HTMLElement | null) => {
  const [id, setId] = useState("");
  const [progress, setProgress] = useState(0);

  const { observeElement, entry, cleanup } = useIntersectionObserver<HTMLElement>(options);

  const currentlyVisibleHeaders = useRef<Set<HTMLElement>>(new Set());

  const setRunningHeader = (el: HTMLElement | null) => {
    if (!el) {
      setId("");
      cleanup();

      return;
    }
    el.querySelectorAll<HTMLElement>("h2, h3, h4, h5, h6, #introduction").forEach(observeElement);
  };

  useEffect(() => {
    if (!entry) {
      return;
    }

    if (entry.isIntersecting) {
      currentlyVisibleHeaders.current.add(entry.target as HTMLElement);
    } else {
      currentlyVisibleHeaders.current.delete(entry.target as HTMLElement);
    }

    const highestEl = [...currentlyVisibleHeaders.current].reduce<HTMLElement | null>((acc, node) => {
      if (!acc) {
        return node;
      }

      if (acc.compareDocumentPosition(node) & Node.DOCUMENT_POSITION_PRECEDING) {
        return node;
      }

      return acc;
    }, null);

    if (highestEl) {
      setId(highestEl.id);
    }
  }, [entry]);

  return { id, setRunningHeader };
};
