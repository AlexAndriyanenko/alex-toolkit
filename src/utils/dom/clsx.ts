import { Nullable } from "models";

type Value = Nullable<string | number | boolean>;
type Mapping = Record<string, string | number | boolean>;
type Argument = Value | Mapping | Argument[];

export function clsx(...args: Argument[]): string {
  let i = 0;
  let tmp: Nullable<Argument>;
  let x: Nullable<string>;
  let res = "";

  while (i < args.length) {
    if ((tmp = args[i++])) {
      if ((x = toVal(tmp))) {
        res && (res += " ");
        res += x;
      }
    }
  }

  return res;
}

function toVal(value: Argument): string {
  let res = "";
  let y: Nullable<string>;

  if (typeof value === "string" || typeof value === "number") {
    res += value;
  } else if (typeof value === "object") {
    if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        if (value[i]) {
          if ((y = toVal(value[i]))) {
            res && (res += " ");
            res += y;
          }
        }
      }
    } else {
      for (const key in value) {
        if (value[key]) {
          res && (res += " ");
          res += key;
        }
      }
    }
  }

  return res;
}

export default clsx;
