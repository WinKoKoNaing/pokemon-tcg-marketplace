import React, { PropsWithChildren } from "react";
import { AppState, View } from "react-native";
import { SWRConfig } from "swr";
import fetcher from "./fetcher";

export default function SwrConfig({ children }: PropsWithChildren) {
  return (
    <SWRConfig
      value={{
        fetcher: fetcher,
        provider: () => new Map(),
        isVisible: () => {
          return true;
        },
        initFocus(callback) {
          let appState = AppState.currentState;

          const onAppStateChange = (nextAppState) => {
            /* If it's resuming from background or inactive mode to active one */
            if (
              appState.match(/inactive|background/) &&
              nextAppState === "active"
            ) {
              callback();
            }
            appState = nextAppState;
          };

          // Subscribe to the app state change events
          const subscription = AppState.addEventListener(
            "change",
            onAppStateChange
          );

          return () => {
            subscription.remove();
          };
        },
      }}
    >
      {children}
    </SWRConfig>
  );
}
