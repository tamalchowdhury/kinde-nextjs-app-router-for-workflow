import {
  onUserTokenGeneratedEvent,
  accessTokenCustomClaims,
  WorkflowSettings,
  WorkflowTrigger,
  fetch,
  getEnvironmentVariable,
} from "@kinde/infrastructure";

export const workflowSettings: WorkflowSettings = {
  id: "addAccessTokenClaim",
  name: "Add access token claim",
  trigger: WorkflowTrigger.UserTokenGeneration,
  bindings: {
    "kinde.accessToken": {},
    "kinde.localization": {},
    "kinde.fetch": {},
    "kinde.env": {},
    url: {},
  },
};

export default async function SupabaseWorkflow(
  event: onUserTokenGeneratedEvent
) {
  const accessToken = accessTokenCustomClaims<{
    myCustomFact: string;
  }>();

  accessToken.myCustomFact = "hello";
}
