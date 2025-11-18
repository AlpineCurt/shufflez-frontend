import { f2v, v2f, suits_str, ranks } from "../const/const";

/** From a combo string, finds the Cell Label
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

/** These regexes guarantee that for each type that passes,
 * the allowed characters will be in the correct string indexes.
 * Edge cases: T8o-TQo will pass even though the range isn't
 * correct. Ranges must be varified afterward.
 * Comments after each are examples.
 */
const pp_plus = /^([2-9akqjt])\1\+$/i; // QQ+
const pp_single = /^([2-9akqjt])\1$/i; // 88
const pp_range = /^([2-9akqjt])\1\-([2-9akqjt])\2$/i; // 22-55
const suited_plus = /^([0-9akqjt])(?!\1)[0-9akqjt]s\+$/i; // AQs+
const suited_single = /^([0-9akqjt])(?!\1)[0-9akqjt]s$/i; // KJs
const suited_range = /^([0-9akqjt])(?!\1)[0-9akqjt]s-\1[0-9akqjt]s$/i; // A2s-A5s | Edge case: T8s-TAs will return true, so check for valid range when parsing
const offsuit_plus = /^([0-9akqjt])(?!\1)[0-9akqjt]o\+$/i; // ATo+
const offsuit_single = /^([0-9akqjt])(?!\1)[0-9akqjt]o$/i; // KQo
const offsuit_range = /^([0-9akqjt])(?!\1)[0-9akqjt]o-\1[0-9akqjt]o$/i; // KTo-KJo | Edge Case: T8o-TAo will return true, so check for valid range when parsing
const single_combo = /([0-9akqjt][schd])(?!\1)[0-9akqjt][schd]/i; // 7h2d | Impossible single combos will fail. ex 6h6h

/** Takes a string and determines which type of combos it
 * represents.
 * 1 - pocket pair plus
 * 2 - pocket pair single
 * 3 - pocket pair range
 * 4 - suited plus
 * 5 - suited single
 * 6 - suited range
 * 7 - offsuit plus
 * 8 - offsuit single
 * 9 - offsuit range
 * 10 - single combo
 */
function get_parse_idx(hands: string): number {
  if (pp_plus.test(hands)) {
    return 1;
  } else if (pp_single.test(hands)) {
    return 2;
  } else if (pp_range.test(hands)) {
    return 3;
  } else if (suited_plus.test(hands)) {
    return 4;
  } else if (suited_single.test(hands)) {
    return 5;
  } else if (suited_range.test(hands)) {
    return 6;
  } else if (offsuit_plus.test(hands)) {
    return 7;
  } else if (offsuit_single.test(hands)) {
    return 8;
  } else if (offsuit_range.test(hands)) {
    return 9;
  } else if (single_combo.test(hands)) {
    return 10;
  }
  return -1;
}

/** takes a combo as a string and standardizes its capitalization.
 * ex: aa+ -> AA+ | Tt-qq -> TT-QQ | aSKH -> AsKh
 */
function capitalize_combo(c: string, type: string) {
  let ch = "";
  switch (type) {
    case "pp":
      for (let i = 0; i < c.length; i++) {
        switch (i) {
          case 0:
          case 1:
          case 3:
          case 4:
            ch += c[i].toUpperCase();
            break;
          default:
            ch += c[i].toLowerCase();
            break;
        }
      }
      break;
    case "range":
      for (let i = 0; i < c.length; i++) {
        switch (i) {
          case 0:
          case 1:
          case 4:
          case 5:
            ch += c[i].toUpperCase();
            break;
          default:
            ch += c[i].toLowerCase();
            break;
        }
      }
      break;
    case "single":
      for (let i = 0; i < c.length; i++) {
        switch (i) {
          case 0:
          case 2:
            ch += c[i].toUpperCase();
            break;
          default:
            ch += c[i].toLowerCase();
            break;
        }
      }
      break;
  }
  return ch;
}

/** Used in standardizing suit order in combo strings */
function order_suits(s1: string, s2: string) {
  const idx1 = suits_str.indexOf(s1);
  const idx2 = suits_str.indexOf(s2);
  if (idx1 === -1 || idx2 === -1) {
    throw `Incorrect suits. Received ${s1} ${s2}`;
  }
  if (idx1 < idx2) {
    return [s1, s2];
  } else {
    return [s2, s1];
  }
}

function parse_pp_plus(hands: string) {
  let combos = [];
  const low_rank = f2v[hands[0]];
  for (let i = low_rank; i <= 14; i++) {
    for (let j = 0; j < 4; j++) {
      for (let k = j + 1; k < 4; k++) {
        if (j === k) {
          continue;
        }
        combos.push(
          `${v2f[i as keyof typeof v2f]}${suits_str[j]}${
            v2f[i as keyof typeof v2f]
          }${suits_str[k]}`
        );
      }
    }
  }
  return combos;
}

function parse_pp_single(hands: string) {
  let combos = [];
  const rank = f2v[hands[0]];
  for (let j = 0; j < 4; j++) {
    for (let k = j + 1; k < 4; k++) {
      if (j === k) {
        continue;
      }
      const so = order_suits(suits_str[j], suits_str[k]);
      combos.push(
        `${v2f[rank as keyof typeof v2f]}${so[0]}${
          v2f[rank as keyof typeof v2f]
        }${so[1]}`
      );
    }
  }
  return combos;
}

function parse_pp_range(hands: string) {
  let combos = [];
  const low_rank = Math.min(f2v[hands[0]], f2v[hands[3]]);
  const high_rank = Math.max(f2v[hands[0]], f2v[hands[3]]);
  for (let i = low_rank; i <= high_rank; i++) {
    for (let j = 0; j < 4; j++) {
      for (let k = j + 1; k < 4; k++) {
        if (j === k) {
          continue;
        }
        combos.push(
          `${v2f[i as keyof typeof v2f]}${suits_str[j]}${
            v2f[i as keyof typeof v2f]
          }${suits_str[k]}`
        );
      }
    }
  }
  return combos;
}

function parse_suited_plus(hands: string) {
  let combos = [];
  const high_rank = Math.max(f2v[hands[0]], f2v[hands[1]]);
  const low_rank = Math.min(f2v[hands[0]], f2v[hands[1]]);
  for (let i = low_rank; i < high_rank; i++) {
    for (const suit of suits_str) {
      combos.push(
        `${v2f[high_rank as keyof typeof v2f]}${suit}${
          v2f[i as keyof typeof v2f]
        }${suit}`
      );
    }
  }
  return combos;
}

function parse_suited_single(hands: string) {
  let combos = [];
  const high_rank = Math.max(f2v[hands[0]], f2v[hands[1]]);
  const low_rank = Math.min(f2v[hands[0]], f2v[hands[1]]);
  for (const suit of suits_str) {
    combos.push(
      `${v2f[high_rank as keyof typeof v2f]}${suit}${
        v2f[low_rank as keyof typeof v2f]
      }${suit}`
    );
  }
  return combos;
}

function parse_suited_range(hands: string) {
  let combos: string[] = [];
  let bad_combos: string[] = [];
  if (f2v[hands[1]] >= f2v[hands[0]] || f2v[hands[5]] >= f2v[hands[4]]) {
    bad_combos.push(hands);
    return [combos, bad_combos];
  }
  const rank1 = hands[0];
  const high_rank = Math.max(f2v[hands[1]], f2v[hands[5]]);
  const low_rank = Math.min(f2v[hands[1]], f2v[hands[5]]);
  for (let i = low_rank; i <= high_rank; i++) {
    for (const suit of suits_str) {
      combos.push(`${rank1}${suit}${v2f[i as keyof typeof v2f]}${suit}`);
    }
  }
  return [combos, bad_combos];
}

function parse_offsuit_plus(hands: string) {
  let combos = [];
  const high_rank = Math.max(f2v[hands[0]], f2v[hands[1]]);
  const low_rank = Math.min(f2v[hands[0]], f2v[hands[1]]);
  for (let i = low_rank; i < high_rank; i++) {
    for (const suit1 of suits_str) {
      for (const suit2 of suits_str) {
        if (suit1 === suit2) {
          continue;
        }
        combos.push(
          `${v2f[high_rank as keyof typeof v2f]}${suit1}${
            v2f[i as keyof typeof v2f]
          }${suit2}`
        );
      }
    }
  }
  return combos;
}

function parse_offsuit_range(hands: string) {
  let combos: string[] = [];
  let bad_combos: string[] = [];
  if (f2v[hands[1]] >= f2v[hands[0]] || f2v[hands[5]] >= f2v[hands[4]]) {
    bad_combos.push(hands);
    return [combos, bad_combos];
  }
  const rank1 = hands[0];
  const high_rank = Math.max(f2v[hands[1]], f2v[hands[5]]);
  const low_rank = Math.min(f2v[hands[1]], f2v[hands[5]]);
  for (let i = low_rank; i <= high_rank; i++) {
    for (const suit1 of suits_str) {
      for (const suit2 of suits_str) {
        if (suit1 === suit2) {
          continue;
        }
        combos.push(`${rank1}${suit1}${v2f[i as keyof typeof v2f]}${suit2}`);
      }
    }
  }
  return [combos, bad_combos];
}

function parse_offsuit_single(hands: string) {
  let combos = [];
  const high_rank = Math.max(f2v[hands[0]], f2v[hands[1]]);
  const low_rank = Math.min(f2v[hands[0]], f2v[hands[1]]);
  for (const suit1 of suits_str) {
    for (const suit2 of suits_str) {
      if (suit1 === suit2) {
        continue;
      }
      combos.push(
        `${v2f[high_rank as keyof typeof v2f]}${suit1}${
          v2f[low_rank as keyof typeof v2f]
        }${suit2}`
      );
    }
  }
  return combos;
}

function parse_single_combo(hand: string) {
  let combos = [];
  if (f2v[hand[0]] > f2v[hand[2]]) {
    combos.push(hand);
  } else if (f2v[hand[0]] < f2v[hand[2]]) {
    const combo = `${hand[2]}${hand[3]}${hand[0]}${hand[1]}`;
    combos.push(combo);
  } else {
    const co = order_suits(hand[1], hand[3]);
    const combo = `${hand[0]}${co[0]}${hand[0]}${co[1]}`;
    combos.push(combo);
  }
  return combos;
}

/** Turns string representation of a range into a Set of all
 * combos represented as a string.
 * ex: AA+, ATs+ will return "AsAc, AsAh..., AsTs, AcTc..."
 * If two or more ranges overlap, no duplicate combos will be
 * generated. ex: 22-55, 44-66 will generate the same combos
 * as 22-66
 */
export function range2ComboArray(range: string) {
  const range_ = range.replace(/ /g, "").split(",");
  let all_combos = new Set<string>();
  let all_bad_combos = new Set<string>();
  for (let hands of range_) {
    let combos: string[] = [];
    let bad_combos: string[] = [];
    const parse_idx = get_parse_idx(hands);
    switch (parse_idx) {
      case 1:
      case 2:
      case 3:
        hands = capitalize_combo(hands, "pp");
        break;
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
        hands = capitalize_combo(hands, "range");
        break;
      case 10:
        hands = capitalize_combo(hands, "single");
        break;
    }
    switch (parse_idx) {
      case 1:
        combos = parse_pp_plus(hands);
        break;
      case 2:
        combos = parse_pp_single(hands);
        break;
      case 3:
        combos = parse_pp_range(hands);
        break;
      case 4:
        combos = parse_suited_plus(hands);
        break;
      case 5:
        combos = parse_suited_single(hands);
        break;
      case 6:
        [combos, bad_combos] = parse_suited_range(hands);
        break;
      case 7:
        combos = parse_offsuit_plus(hands);
        break;
      case 8:
        combos = parse_offsuit_single(hands);
        break;
      case 9:
        [combos, bad_combos] = parse_offsuit_range(hands);
        break;
      case 10:
        combos = parse_single_combo(hands);
        break;
      case -1:
        all_bad_combos.add(hands);
        break;
    }
    combos.forEach((c) => all_combos.add(c));
    bad_combos.forEach((c) => all_bad_combos.add(c));
  }
  return [Array.from(all_combos), Array.from(all_bad_combos)];
}

export function comboArray2Range(combo_arr: string[]) {
  const sorted_combos = combo_arr.reduce(
    (acc: { [combo: string]: Set<string> }, combo) => {
      const cellLabel: string = combo2CellLabel(combo);
      if (!acc[cellLabel]) {
        acc[cellLabel] = new Set<string>();
      }
      acc[cellLabel].add(combo);
      return acc;
    },
    {}
  );

  let upper_ptr = 0;
  let lower_ptr = 0;
  /** pocket pairs */
  let upper = ranks[0];
  let lower: string;
  for (const rank of ranks) {
    // LEFT OFF HERE. CAN'T THINK
  }

  for (const type of ["pp", "s", "o"]) {
    for (let i = 0; i < ranks.length; i++) {
      const r1 = ranks[i];
      for (let j = i + 1; j < ranks.length; j++) {
        if (type === "pp") {
        }
      }
    }
  }
  console.log("stop");
}
