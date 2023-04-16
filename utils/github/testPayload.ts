import { endDescription, startDescription } from "@lib/summarizePullRequest"

export const testPayload = {
  installation: { id: 35293807 },
  action: "synchronize",
  pull_request: {
    number: 4,
    // body: null,
    // body: "\n\n<!-- start pr-codex -->\n\n## PR-Codex overview\nThis PR adds a new feature to the project: a GitHub app that explains and summarizes PR code diffs. It includes a new `github/route.ts` file and updates several existing files, including `README.md`, `Homepage.tsx`, `DefaultHead.tsx`, `AppLayout.tsx`, `Footer.tsx`, and `Navbar.tsx`.\n\n> The following files were skipped due to too many changes: `package-lock.json`.\n\n<!-- end pr-codex -->",
    body: "<!-- start -->\n\nthis is a test",
    // body:
    //   "<!-- start -->\n\nthis is a test" +
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
