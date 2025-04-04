// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { createContext, useContext, useMemo } from "react";
// eslint-disable-next-line no-restricted-imports
import { useSearchParams } from "react-router-dom";

import { Network } from "./utils/api/DefaultRpcClient";
import { queryClient } from "./utils/queryClient";

// See also /apps/explorer/public/env-config.js
// See also /docker-entrypoint.sh
// See also /apps/explorer/src/types/env.d.ts
export const DEFAULT_NETWORK = window.__ENV__?.SUI_RPC_URL || "";

export const NetworkContext = createContext<
  [Network | string, (network: Network | string) => void]
>(["", () => null]);

export function useNetworkContext() {
  return useContext(NetworkContext);
}

// TODO: Remove this flexibility.
export function useNetwork(): [string, (network: Network | string) => void] {
  const [searchParams, setSearchParams] = useSearchParams();

  const network = useMemo(() => {
    const networkParam = searchParams.get("network");

    if (
      networkParam &&
      (Object.values(Network) as string[]).includes(networkParam.toUpperCase())
    ) {
      return networkParam.toUpperCase();
    }

    return networkParam ?? DEFAULT_NETWORK;
  }, [searchParams]);

  const setNetwork = (network: Network | string) => {
    // When resetting the network, we reset the query client at the same time:
    queryClient.cancelQueries();
    queryClient.clear();

    setSearchParams({ network: network.toLowerCase() });
  };

  return [network, setNetwork];
}
