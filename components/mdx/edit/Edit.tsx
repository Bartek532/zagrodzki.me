import { memo } from "react";

import { env } from "env/client";

import { Link } from "../link/Link";

interface EditProps {
  readonly href: string;
}

export const Edit = memo<EditProps>(({ href }) => (
  <Link
    href={`https://github.com/${env.NEXT_PUBLIC_GITHUB_USERNAME}/zagrodzki.me/tree/main/content${href}.mdx`}
  >
    Edit on Github
  </Link>
));

Edit.displayName = "Edit";
