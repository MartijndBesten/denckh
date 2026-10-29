import { useSyncExternalStore } from "react";

const noop = () => () => {};
/** true zodra de pagina in de browser draait. In de statische HTML false: dan staat alle inhoud gewoon onder elkaar. */
export function useHydrated() {
  return useSyncExternalStore(noop, () => true, () => false);
}
