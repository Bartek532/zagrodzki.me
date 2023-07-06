export interface Fact {
  readonly title: string;
  readonly icon: string;
  readonly description: string;
}

export interface Position {
  readonly position: string;
  readonly company: string;
  readonly date: string;
  readonly id: number;
  readonly link: string;
}

export interface Skill {
  readonly name: string;
  readonly slug: string;
  readonly color: string;
  readonly link: string;
}

export interface Recommendation {
  readonly content: string;
  readonly author: {
    readonly name: string;
    readonly position: string;
    readonly image: string;
  };
}
