import { ranks, f2v } from "../const/const";

/** From a combo strin, finds the Cell Label
 * JhTs => JTo
 * AsAh => AA
 */
export function combo2CellLabel(combo: string): string {
  if (combo.length !== 4) {
    throw new Error("combo must be 4 characters");
  }
  let cellLabel: string;
  const r1 = combo[0].toUpperCase();
  const r2 = combo[2].toUpperCase();
  const s1 = combo[1].toLowerCase();
  const s2 = combo[3].toLowerCase();

  if (r1 === r2) {
    cellLabel = `${r1}${r2}`;
  } else {
    cellLabel = f2v[r2] < f2v[r1] ? `${r1}${r2}` : `${r2}${r1}`;
    cellLabel = `${cellLabel}${s1 === s2 ? "s" : "o"}`;
  }

  return cellLabel;
}
