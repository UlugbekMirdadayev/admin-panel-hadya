import { rem } from "@mantine/core";

export const BASE_URL = "https://api.hadyacrm.uz/api/";
export const departments = [
  {
    label: "Fast food",
    value: "fast_food",
  },
  {
    label: "Shashlik",
    value: "shashlik",
  },
  {
    label: "Tortlar/Shirinliklar",
    value: "cakes",
  },
  {
    label: "Choyxona",
    value: "tea_house",
  },
];

export const units = ["dona", "kg", "litr", "paket", "quti", "gr", "pors"];

export const themes = {
  fontSizes: {
    xs: rem(16),
    sm: rem(18),
    md: rem(22),
    lg: rem(24),
    xl: rem(26),
  },
};
