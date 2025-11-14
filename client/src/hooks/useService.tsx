import { useQuery } from "@tanstack/react-query";
import type { USERS } from "../types.d";
import { fetchUsers } from "../service/fetchUser.js";

export default function useService() {
  const { isLoading, isError, data } = useQuery<USERS[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  return {
    isLoading,
    isError,
    data: data ?? [],
  };
}
