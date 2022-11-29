import { CSSProperties } from "react";

import { Nullable } from "models";

export const applyCSSToNode = (
  node: Nullable<HTMLElement>,
  stylesToApply: CSSProperties | Record<string, string | number>,
) => {
  if (!node) return;

  // Note: setting styles as 'style[key as any]' is  faster than 'setProperty'
  Object.entries(stylesToApply).forEach(([key, value]) => {
    if (key.startsWith("--")) {
      node.style.setProperty(key, value);
    } else {
      node.style[key as any] = value;
    }
  });
};
