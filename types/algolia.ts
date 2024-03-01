export type ToggleRefinementProps = {
  readonly attribute: string;
  readonly label: string;
  readonly value: boolean;
  readonly defaultRefinement: boolean;
  readonly currentRefinement: boolean;
  readonly canRefine: boolean;
  readonly count: {
    readonly checked: number;
    readonly unchecked: number;
  };
  readonly refine: (value: boolean) => void;
};
