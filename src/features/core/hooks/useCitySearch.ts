import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/useDebounce";
import { getAutoComplete } from "@/features/weather/services/weather.service";
import type { AutoComplete } from "@/features/weather/interface/autocomplete.interface";

interface UseCitySearch {
  query: string;
  open: boolean;
}

export const useCitySearch = ({query, open}: UseCitySearch) => {
  const [searchResults, setSearchResults] = useState<AutoComplete[]>([]);
  const debouncedSearchQuery = useDebounce(query, 300);

  const mutation = useMutation({
    mutationFn: (query: string) => getAutoComplete({ city: query }),
    onSuccess: (data) => {
      if (data) {
        setSearchResults(Array.isArray(data) ? data : [data]);
      } else {
        setSearchResults([]);
      }
    },
    onError: () => {
      setSearchResults([]);
    },
  });

  useEffect(() => {
    if (debouncedSearchQuery.length > 2 && open) {
      mutation.mutate(debouncedSearchQuery);
    }
  }, [debouncedSearchQuery, open]);

  useEffect(() => {
    if (!open) {
      setSearchResults([]);
    }
  }, [open]);

  return { searchResults, isLoading: mutation.isPending };
};