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
  const SUPABASE_ANON_KEY = getEnvironmentVariable(
    "NEXT_PUBLIC_SUPABASE_ANON_KEY"
  )?.value;

  const accessToken = accessTokenCustomClaims<{
    lifetime_subscriber: boolean;
  }>();

  const response = await fetch(
    `https://mjvyvgsfpcndidwbgcio.supabase.co/rest/v1/profiles?kinde_id=eq.${event.context.user.id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  console.log("response", response);

  if (response.data.length > 0) {
    const profile = response.data[0];
    accessToken.lifetime_subscriber = profile?.lifetime_subscriber;
  }
}
