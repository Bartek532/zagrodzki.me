import { RESOURCE_TYPE } from "types";

import { supabase } from "./supabase";

export const getViewsByType = async (type: RESOURCE_TYPE): Promise<number> => {
  const { data } = await supabase.from("views").select("*").eq("type", type);

  const views = data?.reduce((acc, curr) => acc + curr.count, 0);

  return views ?? 0;
};

export const getViewsBySlug = async (slug: string, type: RESOURCE_TYPE): Promise<number> => {
  const { data } = await supabase.from("views").select("*").eq("slug", slug).eq("type", type);

  if (data && data[0] && data[0].count && !isNaN(data[0].count)) {
    return data[0].count;
  }

  return 0;
};

export const view = async (slug: string, type: RESOURCE_TYPE): Promise<number> => {
  const { data } = await supabase.from("views").select("*").eq("slug", slug).eq("type", type);

  if (data?.length) {
    await supabase
      .from("views")
      .update({ count: data[0].count + 1 })
      .eq("slug", slug)
      .eq("type", type);

    return data[0].count + 1;
  } else {
    await supabase.from("views").insert([{ slug, count: 1, type }]);

    return 1;
  }
};
