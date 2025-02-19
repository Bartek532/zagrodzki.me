import { useState, useRef, useEffect, useCallback } from "react";

import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const options = {
  threshold: 1,
};

export const useRunningHeader = (containerId: string) => {
  const [id, setId] = useState("");

  const { observeElement, entry, cleanup } = useIntersectionObserver(options);

  const currentlyVisibleHeaders = useRef<Set<HTMLElement>>(new Set());

  const setRunningHeader = useCallback(() => {
    const el = document.getElementById(containerId);
    if (!el) {
      setId("");
      cleanup();

      return;
    }

    el.querySelectorAll<HTMLElement>("h2, h3, h4, h5, h6, #introduction").forEach(observeElement);
  }, [cleanup, observeElement, containerId]);

  useEffect(() => {
    setRunningHeader();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!entry) {
      return;
    }

    if (entry.isIntersecting) {
      currentlyVisibleHeaders.current.add(entry.target as HTMLElement);
    } else {
      currentlyVisibleHeaders.current.delete(entry.target as HTMLElement);
    }

    const highestEl = [...currentlyVisibleHeaders.current].reduce<HTMLElement | null>(
      (acc, node) => {
        if (!acc) {
          return node;
        }

        if (acc.compareDocumentPosition(node) & Node.DOCUMENT_POSITION_PRECEDING) {
          return node;
        }

        return acc;
      },
      null,
    );

    if (highestEl) {
      setId(highestEl.id);
    }
  }, [entry]);

  return { id };
};
