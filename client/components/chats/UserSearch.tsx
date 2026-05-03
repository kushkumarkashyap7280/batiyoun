"use client";

import React, { useEffect, useMemo, useState } from "react";
import { searchBUser } from "@/apis/api";
import { ChevronLeft, ChevronRight, Loader2, Search, X } from "lucide-react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
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
  isOpen?: boolean;
  onClose?: () => void;
}

export default function UserSearch({ onSelectUser, className, isOpen, onClose }: UserSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const LIMIT = 5;
  const normalizedQuery = searchQuery.trim();

  useEffect(() => {
    setCurrentPage(1);
  }, [normalizedQuery]);

  const {
    data: results,
    isFetching,
    isError,
    error,
  } = useQuery<SearchResult, Error>({
    queryKey: ["user-search", normalizedQuery, currentPage, LIMIT],
    queryFn: async () => {
      const response = await searchBUser(normalizedQuery, currentPage, LIMIT);
      return response.data;
    },
    enabled: normalizedQuery.length > 0,
    placeholderData: keepPreviousData,
    staleTime: 0,
  });

  const sortedUsers = useMemo(() => {
    if (!results?.users) {
      return [];
    }

    const query = normalizedQuery.toLowerCase();

    return [...results.users].sort((left, right) => {
      const leftUsername = left.username.toLowerCase();
      const rightUsername = right.username.toLowerCase();
      const leftFullName = left.fullName.toLowerCase();
      const rightFullName = right.fullName.toLowerCase();

      const leftPrefixMatch = leftUsername.startsWith(query) || leftFullName.startsWith(query);
      const rightPrefixMatch = rightUsername.startsWith(query) || rightFullName.startsWith(query);

      if (leftPrefixMatch !== rightPrefixMatch) {
        return leftPrefixMatch ? -1 : 1;
      }

      const usernameOrder = leftUsername.localeCompare(rightUsername);
      if (usernameOrder !== 0) {
        return usernameOrder;
      }

      return leftFullName.localeCompare(rightFullName);
    });
  }, [normalizedQuery, results]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleClear = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleSelect = (user: UserSearchResultUser) => {
    onSelectUser(user);
    handleClear();
  };

  if (isOpen === false) {
    return null;
  }

  const searchContent = (
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

        <button type="submit" className={styles.searchButton} disabled={!normalizedQuery || isFetching}>
            {isFetching ? <Loader2 size={16} className={styles.spinner} /> : "Search"}
        </button>
      </form>

        {normalizedQuery.length === 0 ? (
          <div className={styles.helperCard}>Start typing a username to search.</div>
        ) : null}

        {normalizedQuery.length > 0 ? (
          <div className={styles.resultsOverlay}>
            {isFetching && !results ? (
              <div className={styles.stateCard}>
                <Loader2 className={styles.spinner} size={18} />
                Searching users...
              </div>
            ) : null}

            {isError ? (
              <div className={`${styles.stateCard} ${styles.errorCard}`}>
                {error?.message || "Failed to search users"}
              </div>
            ) : null}

            {results ? (
              <div className={styles.resultsCard}>
          <div className={styles.resultsHeader}>
            <span>Results</span>
            <span>{results.pagination.total} total</span>
          </div>

          {sortedUsers.length === 0 ? (
            <div className={styles.emptyCard}>No users found for “{searchQuery}”.</div>
          ) : (
            <div className={styles.resultsList}>
              {sortedUsers.map((user) => (
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
        </div>
      ) : null}
    </section>
  );

  return (
    isOpen ? (
      <div className={styles.modalBackdrop} role="presentation" onClick={onClose}>
        <div className={styles.modalDialog} role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
          <div className={styles.modalHeader}>
            <div>
              <h2 className={styles.modalTitle}>Search users</h2>
              <p className={styles.modalDescription}>Find someone to start a direct chat.</p>
            </div>
            {onClose ? (
              <button type="button" className={styles.modalCloseButton} onClick={onClose} aria-label="Close search">
                <X size={18} />
              </button>
            ) : null}
          </div>
          {searchContent}
        </div>
      </div>
    ) : (
      searchContent
    )
  );
}
