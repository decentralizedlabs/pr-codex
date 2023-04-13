import { endDescription, startDescription } from "@lib/summarizePullRequest"

export const testPayload = {
  installation: { id: 35293807 },
  action: "synchronize",
  pull_request: {
    number: 4,
    body: "<!-- start -->\n\nthis is a test",
    // body:
    //   "<!-- start -->\n\nthis is a test\n\n" +
    //   startDescription +
    //   "\n\n---\n\n## PR-Codex overview\nThis PR adds a new file `route.ts` and makes changes to several files. It adds a homepage with a button to install the app, changes the og_image and twitter_card image formats to png, removes a navbar, adds a `Made by dlabs` line in the footer, and removes the custom connect button and signed block from the navbar.\n\n" +
    // endDescription,
    base: {
      repo: { owner: { login: "decentralizedlabs" }, name: "pr-codex" },
      sha: "99dfdd96142d171546b59504fbba84cffe23ebd2"
    },
    head: { sha: "51cfb7599b7eea7fd74ec5a0cc4c8c5c77150404" }
  }
}
