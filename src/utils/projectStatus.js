// Resolves a project's deployment status for display purposes.
//
// "live"    -> liveUrl is currently reachable, shown as the primary action
// "offline" -> a public build exists but is currently scaled down (e.g. to
//              manage hosting costs)
// "private" -> no public deployment exists; code/local only
export function getProjectStatus(project) {
  if (project.deploymentStatus) return project.deploymentStatus;
  return project.liveUrl ? "live" : "private";
}