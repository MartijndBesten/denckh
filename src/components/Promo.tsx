"use client";

// Tijdelijke actie: verschijnt alleen tot de einddatum, ook zonder nieuwe build (de site is statisch).
import { useEffect, useState } from "react";
import { PROMO } from "@/lib/prices";

export function Promo({ className }: { className?: string }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setOn(Date.now() < PROMO.until));
    return () => cancelAnimationFrame(id);
  }, []);
  return on ? <p className={className}>{PROMO.text}</p> : null;
}
