import type { WithID } from "./WithID";
export type Note = WithID & {
  id: string;
  title: string;
  content: string;
};