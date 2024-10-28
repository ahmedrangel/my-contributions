export default defineCachedEventHandler(async (event) => {
  const octokit = useOctokit()
  // Fetch user from token
  const userResponse = await octokit.request('GET /user')
  const user: User = {
    name: userResponse.data.name ?? userResponse.data.login,
    username: userResponse.data.login,
    avatar: userResponse.data.avatar_url,
  }

  const callSearch = async (opts: { q: string, per_page?: number, page?: number }) => {
    const { q, per_page, page } = opts
    return await octokit.request('GET /search/issues', {
      q,
      per_page: per_page || 50,
      page: page || 1,
    })
  }

  // Fetch pull requests from user
  const prData = await callSearch({
    // To exclude the pull requests to your repositories
    // q: `type:pr+author:"${user.username}"+-user:"${user.username}"`,
    // To include the pull requests to your repositories
    q: `type:pr+author:"${user.username}"`,
  })

  // Fetch issues from user
  const issueData = await callSearch({
    // To exclude the issues to your repositories
    // q: `type:issue+author:"${user.username}"+-user:"${user.username}"`,
    // To include the issues to your repositories
    q: `type:issue+author:"${user.username}"`,
  })

  // Filter out closed PRs that are not merged
  const filteredPrs = prData.data.items.filter(pr => !(pr.state === 'closed' && !pr.pull_request?.merged_at))
  const prs: PullRequest[] = []
  const issues: Issues[] = []

  // For each PR, fetch the repository details
  for (const pr of filteredPrs) {
    const [owner, name] = pr.repository_url.split('/').slice(-2)
    const repo = await fetchRepo(event, owner!, name!)

    prs.push({
      repo: `${owner}/${name}`,
      title: pr.title,
      url: pr.html_url,
      created_at: pr.created_at,
      state: pr.pull_request?.merged_at ? 'merged' : pr.draft ? 'draft' : pr.state as 'open' | 'closed',
      number: pr.number,
      type: repo.owner.type,
      stars: repo.stargazers_count,
      comments: pr.comments,
    })
  }

  for (const issue of issueData.data.items) {
    const [owner, name] = issue.repository_url.split('/').slice(-2)
    const repo = await fetchRepo(event, owner!, name!)

    issues.push({
      repo: `${owner}/${name}`,
      title: issue.title,
      url: issue.html_url,
      created_at: issue.created_at,
      state: issue.state === 'open' ? 'open' : issue.state === 'closed' && issue.state_reason === 'completed' ? 'completed' : 'not-planned',
      number: issue.number,
      type: repo.owner.type,
      stars: repo.stargazers_count,
      comments: issue.comments,
    })
  }

  return {
    user,
    prs,
    issues,
  } as Contributions
}, {
  group: 'api',
  name: 'contributions',
  getKey: () => 'all',
  swr: true,
  maxAge: !import.meta.dev ? 60 * 20 : 1, // 20 minutes
})
