import { rem } from "@mantine/core";

export const BASE_URL = "https://api.hadyacrm.uz/api/";
export const departments = [
  {
    label: "Fast food",
    value: "fast_food",
    index: 0,
  },
  {
    label: "Shashlik",
    value: "shashlik",
    index: 1,
  },
  {
    label: "Tortlar/Shirinliklar",
    value: "cakes",
    index: 2,
  },
  {
    label: "Choyxona",
    value: "tea_house",
    index: 3,
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
