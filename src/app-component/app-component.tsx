import React, { memo } from "react";

import { clsx } from "utils";
import styles from "./app-component.module.css";

export const AppComponent: React.FC = memo(() => {
  return <div className={clsx(styles.container)}> Component </div>;
});
