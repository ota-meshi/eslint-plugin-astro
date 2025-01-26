/**
 * Used in `/.github/workflows/pkg.pr.new.yml`
 */
export default async function ({ github, context, output }) {
  // eslint-disable-next-line no-console -- For debugging on github actions.
  console.log("pkg-pr-new publish output:", JSON.stringify(output))

  const sha =
    context.eventName === "pull_request"
      ? context.payload.pull_request.head.sha
      : context.payload.after
  const commitUrl = `https://github.com/${context.repo.owner}/${context.repo.repo}/commit/${sha}`

  const pullRequestNumber = await getPullRequestNumber()

  const packages = output.packages.map((p) => {
    let normalizedUrl = p.url
    if (pullRequestNumber && p.url.endsWith(sha)) {
      normalizedUrl = `${p.url.slice(0, -sha.length)}${pullRequestNumber}`
    }
    const repoPath = `/${context.repo.owner}/${context.repo.repo}/`
    normalizedUrl = normalizedUrl.replace(repoPath, "/")

    return {
      name: p.name,
      url: normalizedUrl,
    }
  })

  const botCommentIdentifier = "<!-- posted by pkg.pr.new-comment.mjs -->"

  const onlineUrl = new URL(
    "https://eslint-online-playground.netlify.app/#eslint-plugin-astro",
  )
  const overrideDeps = {}
  for (const p of packages) {
    overrideDeps[p.name] = p.url
  }
  onlineUrl.searchParams.set("overrideDeps", JSON.stringify(overrideDeps))
  const body = `${botCommentIdentifier}

## Try the Instant Preview in Online Playground

[ESLint Online Playground](${onlineUrl})

## Install the Instant Preview to Your Local

\`\`\`
npm i ${packages.map((p) => p.url).join(" ")}
\`\`\`

## Published Instant Preview Packages:

${packages.map((p) => `- ${p.name}: ${p.url}`).join("\n")}

[View Commit](${commitUrl})`

  if (pullRequestNumber) {
    await createOrUpdateComment(pullRequestNumber)
  } else {
    /* eslint-disable no-console -- For debugging on github actions. */
    console.log(
      "No open pull request found for this push. Logging publish information to console:",
    )
    console.log(`\n${"=".repeat(50)}`)
    console.log(body)
    console.log(`\n${"=".repeat(50)}`)
    /* eslint-enable no-console -- For debugging on github actions. */
  }

  /**
   * Get the pull request number from the context.
   */
  async function getPullRequestNumber() {
    if (context.eventName === "pull_request") {
      if (context.issue.number) {
        return context.issue.number
      }
    } else if (context.eventName === "push") {
      const pullRequests = await github.rest.pulls.list({
        owner: context.repo.owner,
        repo: context.repo.repo,
        state: "open",
        head: `${context.repo.owner}:${context.ref.replace("refs/heads/", "")}`,
      })

      if (pullRequests.data.length > 0) {
        return pullRequests.data[0].number
      }
    }
    return null
  }

  /**
   * Find the bot comment in the pull request.
   */
  async function findBotComment(issueNumber) {
    if (!issueNumber) return null
    const comments = await github.rest.issues.listComments({
      owner: context.repo.owner,
      repo: context.repo.repo,
      // eslint-disable-next-line camelcase -- The ID defined in the GitHub API.
      issue_number: issueNumber,
    })
    return comments.data.find((comment) =>
      comment.body.includes(botCommentIdentifier),
    )
  }

  /**
   * Create or update the bot comment in the pull request.
   */
  async function createOrUpdateComment(issueNumber) {
    const existingComment = await findBotComment(issueNumber)
    if (existingComment) {
      await github.rest.issues.updateComment({
        owner: context.repo.owner,
        repo: context.repo.repo,
        // eslint-disable-next-line camelcase -- The ID defined in the GitHub API.
        comment_id: existingComment.id,
        body,
      })
    } else {
      await github.rest.issues.createComment({
        // eslint-disable-next-line camelcase -- The ID defined in the GitHub API.
        issue_number: issueNumber,
        owner: context.repo.owner,
        repo: context.repo.repo,
        body,
      })
    }
  }
}
