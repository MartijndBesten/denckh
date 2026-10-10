"use client";

// Tijdelijke actie: verschijnt alleen tot de einddatum, ook zonder nieuwe build (de site is statisch).
import { useEffect, useState } from "react";
import { PROMOS } from "@/lib/prices";

export function Promo({ which, className }: { which: keyof typeof PROMOS; className?: string }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setOn(Date.now() < PROMOS[which].until));
    return () => cancelAnimationFrame(id);
  }, [which]);
  return on ? <p className={className}>{PROMOS[which].text}</p> : null;
}
