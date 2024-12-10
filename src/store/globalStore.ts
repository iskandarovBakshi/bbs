import { create } from "zustand";
import { persist } from "zustand/middleware";

export enum UserType {
  admin = "admin",
  barber = "barber",
  user = "user",
}

export interface IUser {
  type: UserType;
  name: string;
  email: string;
  password: string;
}
interface IBarberShop {
  name: string;
}

interface IState {
  users: IUser[];
  barberShops: IBarberShop[];
  loggedIn?: IUser;
  _hydrated: boolean;
}

interface IActions {
  setState: (st: Partial<IState>) => void;
}

export const useStore = create<IState & IActions>()(
  persist(
    (set, get) => ({
      users: [
        {
          type: UserType.admin,
          name: "admin",
          password: "admin",
          email: "admin@admin.com",
        },
      ],
      barberShops: [],
      loggedIn: undefined,
      _hydrated: false,
      setState: ({ ...all }: Partial<IState> = {}) =>
        set({
          ...all,
        }),
    }),
    {
      name: "barbershop-global",
    },
  ),
);
