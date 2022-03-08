export type Fact = {
  readonly title: string;
  readonly icon: string;
  readonly description: string;
};

export type Position = {
  readonly position: string;
  readonly company: string;
  readonly date: string;
  readonly id: number;
};

export type Skill = {
  readonly name: string;
  readonly slug: string;
  readonly color: string;
  readonly link: string;
};

export type Recommendation = {
  readonly content: string;
  readonly author: {
    readonly name: string;
    readonly position: string;
    readonly image: string;
  };
};
