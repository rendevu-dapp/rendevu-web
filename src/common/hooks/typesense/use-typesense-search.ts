// react
import { useState, useEffect, useCallback, useRef } from "react";
import { Errors } from "typesense";
// imports
import type {
  DocumentSchema,
  SearchOptions,
  SearchParams,
  SearchResponse,
  UnionSearchResponse,
} from "typesense-types";
import { typesense } from "@/common/configs";

// utility function for deep comparison to prevent unnecessary re-renders
import { deepEqual } from "@/common/helpers";

// types
type TypesenseErrorUnion = InstanceType<(typeof Errors)[keyof typeof Errors]>;
type AsyncResult<T> = {
  data: T | null;
  loading: boolean;
  error: Error | TypesenseErrorUnion | null;
};
type SearchFunctionParams<T extends DocumentSchema> = {
  collection: string;
  params: SearchParams<T>;
  options?: SearchOptions;
};
type MultiSearchFunctionParams<
  T extends DocumentSchema,
  U extends boolean = false,
> = {
  collection: string;
  searches: SearchParams<T>[];
  options?: SearchOptions;
  union?: U;
};

// single search hook
export const useTypesenseSearch = <T extends DocumentSchema = DocumentSchema>({
  collection,
  params,
  options = {},
}: SearchFunctionParams<T>) => {
  const [singleSearchResult, setSingleSearchResult] = useState<
    AsyncResult<SearchResponse<T>>
  >({
    data: null,
    loading: false,
    error: null,
  });

  // refs to track previous values for deep comparison
  const prevParamsRef = useRef<SearchParams<T>>(null);
  const prevOptionsRef = useRef<SearchOptions>(null);

  useEffect(() => {
    // only trigger if params or options actually changed
    if (
      deepEqual(params, prevParamsRef.current) &&
      deepEqual(options, prevOptionsRef.current)
    ) {
      return;
    }

    prevParamsRef.current = params;
    prevOptionsRef.current = options;

    setSingleSearchResult({ data: null, loading: true, error: null });
    const performSearch = async () => {
      try {
        const client = typesense();
        const result = await client
          .collections<T>(collection)
          .documents()
          .search(params, options);

        setSingleSearchResult({ data: result, loading: false, error: null });
      } catch (error) {
        setSingleSearchResult({
          data: null,
          loading: false,
          error: error as Error,
        });
      }
    };

    performSearch();
  }, [collection, params, options]);

  return singleSearchResult;
};

// lazy single search hook
export const useLazyTypesenseSearch = <
  T extends DocumentSchema = DocumentSchema,
>() => {
  const [singleSearchResult, setSingleSearchResult] = useState<
    AsyncResult<SearchResponse<T>>
  >({
    data: null,
    loading: false,
    error: null,
  });

  const search = useCallback(
    async ({ collection, params, options = {} }: SearchFunctionParams<T>) => {
      setSingleSearchResult({ data: null, loading: true, error: null });
      try {
        const client = typesense();
        const result = await client
          .collections<T>(collection)
          .documents()
          .search(params, options);

        setSingleSearchResult({ data: result, loading: false, error: null });
        return result;
      } catch (error) {
        setSingleSearchResult({
          data: null,
          loading: false,
          error: error as Error,
        });
        throw error;
      }
    },
    [],
  );

  return { search, ...singleSearchResult };
};

/* multi-search hook */
// over loads
export function useTypesenseMultiSearch<T extends DocumentSchema>(
  params: MultiSearchFunctionParams<T, true>,
): AsyncResult<UnionSearchResponse<T>>;
export function useTypesenseMultiSearch<T extends DocumentSchema>(
  params: MultiSearchFunctionParams<T, false>,
): AsyncResult<SearchResponse<T>[]>;
// implementation
export function useTypesenseMultiSearch<
  T extends DocumentSchema,
  U extends boolean = false,
>({
  collection,
  searches,
  options = {},
  union = false as U,
}: MultiSearchFunctionParams<T, U>) {
  const [multiSearchResult, setMultiSearchResult] = useState<
    AsyncResult<U extends true ? UnionSearchResponse<T> : SearchResponse<T>[]>
  >({
    data: null,
    loading: false,
    error: null,
  });

  // refs to track previous values for deep comparison
  const prevSearchesRef = useRef<SearchParams<T>[]>(null);
  const prevOptionsRef = useRef<SearchOptions>(null);
  const prevUnionRef = useRef<boolean>(null);

  useEffect(() => {
    // only trigger if searches, options, or union actually changed
    if (
      deepEqual(searches, prevSearchesRef.current) &&
      deepEqual(options, prevOptionsRef.current) &&
      union === prevUnionRef.current
    ) {
      return;
    }

    prevSearchesRef.current = searches;
    prevOptionsRef.current = options;
    prevUnionRef.current = union;

    setMultiSearchResult({ data: null, loading: true, error: null });
    const performMultiSearch = async () => {
      try {
        const client = typesense();
        const multiSearchParams = searches.map((search) => ({
          collection,
          ...search,
        }));

        if (union) {
          const result = await client.multiSearch.perform<T[]>({
            searches: multiSearchParams,
            union: true,
            ...options,
          });
          setMultiSearchResult({
            data: result as U extends true
              ? UnionSearchResponse<T>
              : SearchResponse<T>[],
            loading: false,
            error: null,
          });
        } else {
          const result = await client.multiSearch.perform<T[]>({
            searches: multiSearchParams,
            union: false,
            ...options,
          });
          setMultiSearchResult({
            data: result.results as U extends true
              ? UnionSearchResponse<T>
              : SearchResponse<T>[],
            loading: false,
            error: null,
          });
        }
      } catch (error) {
        setMultiSearchResult({
          data: null,
          loading: false,
          error: error as Error,
        });
      }
    };

    performMultiSearch();
  }, [collection, searches, options, union]);

  return multiSearchResult;
}
