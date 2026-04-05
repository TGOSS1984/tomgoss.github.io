export const introConfig = {
  enabled: true,

  displayMode: "first-visit",
  // "every-visit" | "session" | "first-visit"

  storageKey: "portfolio_intro_seen",
  finalSceneClickToEnter: true,
  showSkipButton: true,

  timings: {
    loadingDuration: 1600,
    loadingExitDelay: 180,
    chartDuration: 3200,
    journeyDuration: 4600,
  },
};