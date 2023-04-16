import { codexCommand } from "../../utils/constants"

export const testPayloadComment = {
  installation: { id: 35293807 },
  action: "created",
  issue: {
    number: 4
  },

  comment: {
    body: `${codexCommand}what changes have been done in the homepage?`
  },
  sender: {
    login: "jjranalli"
  },
  repository: {
    name: "pr-codex",
    owner: {
      login: "decentralizedlabs"
    }
  }
}
