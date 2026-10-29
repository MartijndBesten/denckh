import Image from "next/image";
import type { Shot } from "@/lib/ouderhulp";

// Echt applicatiebeeld met fictieve gegevens, in een rustig kader, met de rol en de taak eronder.
export function Scherm({ shot, size = "phone", priority = false, label = true }: { shot: Shot; size?: "phone" | "desk"; priority?: boolean; label?: boolean }) {
  return (
    <figure className={`oh-shot oh-shot--${size}`}>
      <div className="oh-shot__frame">
        <Image src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} priority={priority}
          sizes={size === "phone" ? "(max-width: 760px) 70vw, 300px" : "(max-width: 1100px) 92vw, 760px"} />
      </div>
      {label && <figcaption><span className="oh-shot__role">{shot.role}</span> {shot.task}</figcaption>}
    </figure>
  );
}
