import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import type { CardSearchResult } from '../types/cards';

export function useCardSearch() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<CardSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(false);

  useEffect(() => {
    const trimmed = query.trim();

    if (trimmed.length < 2) {
      return;
    }

    let isCancelled = false;
    const timer = window.setTimeout(async () => {
      setIsSearching(true);
      setSearchError(false);
      try {
        const nextResults = await api.searchCards(trimmed);
        if (isCancelled) {
          return;
        }
        setSearchResults(nextResults);
      } catch {
        if (!isCancelled) {
          setSearchResults([]);
          setSearchError(true);
        }
      }
      if (!isCancelled) {
        setIsSearching(false);
      }
    }, 300);

    return () => {
      isCancelled = true;
      window.clearTimeout(timer);
    };
  }, [query]);

  const isQueryActive = query.trim().length >= 2;
  const results = isQueryActive ? searchResults : [];
  const loading = isQueryActive ? isSearching : false;

  return { query, setQuery, results, loading, searchError };
}

