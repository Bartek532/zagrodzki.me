import type { ChangeEventHandler } from "react";
import { connectSearchBox } from "react-instantsearch-dom";
import type { SearchBoxProvided } from "react-instantsearch-core";
import { useCallback } from "react";

import { Input } from "components/common/input/Input";

interface SearchBoxProps extends SearchBoxProvided {
  readonly currentObjectID?: string | null;
  readonly onChange: (refinement: string) => void;
}

export const SearchBox = connectSearchBox<SearchBoxProps>(
  ({ refine, currentRefinement, currentObjectID, onChange }) => {
    const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
      (e) => {
        refine(e.currentTarget.value);
        onChange(e.currentTarget.value);
      },
      [onChange, refine],
    );

    return (
      <form noValidate role="search">
        <Input
          aria-autocomplete="list"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          placeholder="Search..."
          onChange={handleChange}
          value={currentRefinement}
          {...(currentObjectID && { "aria-activedescendant": "id" + currentObjectID })}
          type="search"
        >
          <span className="sr-only">search</span>
        </Input>
      </form>
    );
  },
);
