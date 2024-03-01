import { connectToggleRefinement } from "react-instantsearch-core";

import { Checkbox } from "components/common/input/checkbox/Checkbox";
import { ToggleRefinementProps } from "types";

import styles from "./archiveCheckbox.module.scss";

export const ArchiveCheckbox = connectToggleRefinement(
  ({ currentRefinement, refine, label }: ToggleRefinementProps) => (
    <Checkbox
      label={label}
      checked={currentRefinement}
      onChange={(checked) => refine(checked)}
      className={styles.checkbox}
    >
    
      {currentRefinement ? "📦" : "📂"}
    </Checkbox>
  ),
);
