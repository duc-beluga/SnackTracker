import { QueryClient, isServer } from "@tanstack/react-query";
import { REACT_QUERY_STALE_TIME } from "./constants/snacks";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: REACT_QUERY_STALE_TIME,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
