import { createToken } from "@bonbons/core";

export interface IA {
  a: string;
  b: number;
}

export const TOKEN_TEST = createToken<IA>("func-token");

export const valueTest = { a: "sss", b: 123, c: true };
