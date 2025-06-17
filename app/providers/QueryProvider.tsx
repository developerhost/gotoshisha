/**
 * TanStack Query プロバイダー
 */
import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { Platform } from "react-native";
import { queryClient } from "../lib/queryClient";

interface QueryProviderProps {
  children: React.ReactNode;
}

// Web環境でのみdevtoolsをインポート
const DevTools =
  Platform.OS === "web"
    ? React.lazy(() =>
        import("@tanstack/react-query-devtools").then((module) => ({
          default: module.ReactQueryDevtools,
        }))
      )
    : null;

export const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* DevToolsはWeb環境でのみ表示 */}
      {Platform.OS === "web" && DevTools && (
        <React.Suspense fallback={null}>
          <DevTools
            initialIsOpen={false}
            buttonPosition="bottom-right"
            position="bottom"
          />
        </React.Suspense>
      )}
    </QueryClientProvider>
  );
};
