"use client";
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { hydrate } from "../lib/features/filters/filterSlice";
import { AppStore, makeStore } from "../lib/store";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    // Hydrate from localStorage
    const saved = localStorage.getItem("datamobile-filters");
    if (saved && storeRef.current) {
      try {
        const parsed = JSON.parse(saved);
        // Only hydrate if valid object
        if (parsed && typeof parsed === "object") {
          storeRef.current.dispatch(hydrate(parsed));
        }
      } catch (e) {
        console.error("Failed to load filters", e);
      }
    }

    // Subscribe to changes
    if (storeRef.current) {
      const unsubscribe = storeRef.current.subscribe(() => {
        const state = storeRef.current!.getState();
        localStorage.setItem(
          "datamobile-filters",
          JSON.stringify(state.filters)
        );
      });
      return unsubscribe;
    }
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
