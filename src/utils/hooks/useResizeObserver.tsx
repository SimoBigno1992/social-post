import { useEffect, useRef, useState, useCallback } from "react";

export const useResizeObserver = (callback: ResizeObserverCallback) => {
  const observerRef = useRef<ResizeObserver | null>(null);

  const observe = useCallback((element: HTMLElement | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    if (element) {
      observerRef.current = new ResizeObserver(callback);
      observerRef.current.observe(element);
    }
  }, [callback]);

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return observe;
};