import { createContext, useContext } from "react";

const RouteLoadingContext = createContext({
  isLoading: false,
});

export function RouteLoadingProvider({ value, children }) {
  return (
    <RouteLoadingContext.Provider value={value}>
      {children}
    </RouteLoadingContext.Provider>
  );
}

export function useRouteLoading() {
  return useContext(RouteLoadingContext);
}