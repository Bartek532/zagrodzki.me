import { random } from "lodash";
import { memo } from "react";

import { getResourceViewsBySlug, view } from "@/lib/kv/views";
import { normalizeCount } from "@/utils/functions";

import type { RESOURCE_TYPE } from "@/types";

interface ViewsProps {
  readonly slug: string;
  readonly type: RESOURCE_TYPE;
}

export const Views = memo<ViewsProps>(async ({ slug, type }) => {
  await view(type, slug);
  const views = await getResourceViewsBySlug(type, slug);
  return <span>{normalizeCount(views || random(1500, 4000))} views</span>;
});

Views.displayName = "Views";
