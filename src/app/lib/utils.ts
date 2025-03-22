import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

// Utility function to check if error is FetchBaseQueryError
export function isFetchBaseQueryError(
  error: unknown
): error is FetchBaseQueryError {
  return typeof error === "object" && error !== null && "status" in error;
}
