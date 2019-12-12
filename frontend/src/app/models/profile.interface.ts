import { UserInterface } from "./user";

export interface IProfile {
  age: string;
  carrerLevel: string;
  createdAt: string;
  experience: string;
  id: number;
  info: string;
  location: string;
  updatedAt: string;
  user: UserInterface;
  website: string;
}
