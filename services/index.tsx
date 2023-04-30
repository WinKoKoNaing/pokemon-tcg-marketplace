import { useMemo } from "react";
import useSWR from "swr";

export function useTypes() {
  const { data, error } = useSWR<{ data: string[] }>(`/types`);
  const types = useMemo(() => data?.data.map((label) => ({ label })), [data]);
  return {
    types,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useRarities() {
  const { data, error } = useSWR<{ data: string[] }>(`/rarities`);
  const rarities = useMemo(
    () => data?.data.map((label) => ({ label })),
    [data]
  );

  return {
    rarities,
    isLoading: !error && !data,
    isError: error,
  };
}

type SetType = {
  name: string;
};
export function useSets() {
  const { data, error } = useSWR<{ data: SetType[] }>(`/sets`);
  const sets = useMemo(
    () => data?.data.map(({ name }) => ({ label: name })),
    [data]
  );
  return {
    sets,
    isLoading: !error && !data,
    isError: error,
  };
}
