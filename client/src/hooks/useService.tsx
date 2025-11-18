import { useQuery } from "@tanstack/react-query";
import type { USERS } from "../types.d";
import getUsers from "../service/getUsers.js";

export default function useService() {
  const { isLoading, isError, data } = useQuery<USERS[]>({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return {
    isLoading,
    isError,
    data: data ?? [],
  };
}
