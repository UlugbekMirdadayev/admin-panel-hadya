import { useSelector } from "react-redux";

export const useUser = () => useSelector(({ user }) => user);
export const useReport = () => useSelector(({ report }) => report);
export const useLoader = () => useSelector(({ loader }) => loader);
export const useWaiter = () => useSelector(({ waiters }) => waiters);
export const useRooms = () => useSelector(({ rooms }) => rooms);
export const useOrders = () => useSelector(({ orders }) => orders);
export const useAdmins = () => useSelector(({ admin }) => admin);
export const useProducts = () => useSelector(({ products }) => products);
