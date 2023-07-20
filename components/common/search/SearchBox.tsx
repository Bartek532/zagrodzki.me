import { useCallback } from "react";
import { connectSearchBox } from "react-instantsearch-dom";

import { Input } from "components/common/input/Input";

import type { ChangeEventHandler } from "react";

export const SearchBox = connectSearchBox(({ refine, currentRefinement }) => {
  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      refine(e.currentTarget.value);
    },
    [refine],
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
        type="search"
      >
        <span className="sr-only">search</span>
      </Input>
    </form>
  );
});
