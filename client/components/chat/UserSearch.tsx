"use client";

import React, { useState } from "react";
import { searchBUser } from "@/apis/api";
import { ChevronLeft, ChevronRight, Loader2, Search, X } from "lucide-react";
import styles from "./user-search.module.css";

export interface UserSearchResultUser {
  _id: string;
  username: string;
  email: string;
  fullName: string;
}

interface SearchResult {
  users: UserSearchResultUser[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasMore: boolean;
  };
}

interface UserSearchProps {
  onSelectUser: (user: UserSearchResultUser) => void;
  className?: string;
}

export default function UserSearch({ onSelectUser, className }: UserSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const LIMIT = 10;

  const handleSearch = async (query: string, page: number = 1) => {
    if (!query.trim()) {
      setResults(null);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await searchBUser(query.trim(), page, LIMIT);
      setResults(response.data);
      setCurrentPage(page);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to search users");
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery, 1);
  };

  const handlePageChange = (page: number) => {
    handleSearch(searchQuery, page);
  };

  const handleClear = () => {
    setSearchQuery("");
    setResults(null);
    setError(null);
    setCurrentPage(1);
  };

  const handleSelect = (user: UserSearchResultUser) => {
    onSelectUser(user);
    handleClear();
  };

  return (
    <section className={`${styles.inlineSearchShell} ${className || ""}`.trim()}>
      <form className={styles.searchBar} onSubmit={handleSubmit}>
        <div className={styles.searchField}>
          <Search size={16} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search users by username"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          {searchQuery ? (
            <button type="button" className={styles.clearButton} onClick={handleClear} aria-label="Clear search">
              <X size={16} />
            </button>
          ) : null}
        </div>

        <button type="submit" className={styles.searchButton} disabled={!searchQuery.trim()}>
          Search
        </button>
      </form>

      {loading ? (
        <div className={styles.stateCard}>
          <Loader2 className={styles.spinner} size={18} />
          Searching users...
        </div>
      ) : null}

      {error ? <div className={`${styles.stateCard} ${styles.errorCard}`}>{error}</div> : null}

      {!loading && !error && !results ? (
        <div className={styles.helperCard}>
          Press Enter or tap Search to find users by username.
        </div>
      ) : null}

      {!loading && results ? (
        <div className={styles.resultsCard}>
          <div className={styles.resultsHeader}>
            <span>Results</span>
            <span>{results.pagination.total} total</span>
          </div>

          {results.users.length === 0 ? (
            <div className={styles.emptyCard}>No users found for “{searchQuery}”.</div>
          ) : (
            <div className={styles.resultsList}>
              {results.users.map((user) => (
                <button key={user._id} type="button" className={styles.resultItem} onClick={() => handleSelect(user)}>
                  <div className={styles.avatar}>{user.fullName.charAt(0).toUpperCase()}</div>
                  <div className={styles.resultMeta}>
                    <strong>{user.fullName}</strong>
                    <span>@{user.username}</span>
                    <p>{user.email}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {results.pagination.totalPages > 1 ? (
            <div className={styles.paginationBar}>
              <button
                type="button"
                className={styles.paginationButton}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={16} />
                Prev
              </button>

              <span>
                Page {results.pagination.page} of {results.pagination.totalPages}
              </span>

              <button
                type="button"
                className={styles.paginationButton}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={!results.pagination.hasMore}
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
