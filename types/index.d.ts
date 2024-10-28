export {}

declare global {
  interface User {
    username: string
    name: string
    avatar: string
  }

  interface ContributionData {
    repo: string
    title: string
    url: string
    created_at: string
    number: number
    type: 'User' | 'Organization'
    stars: number
    comments: number
  }

  interface PullRequest extends ContributionData {
    state: 'merged' | 'draft' | 'open' | 'closed'
  }

  interface Issues extends ContributionData {
    state: 'open' | 'completed' | 'not-planned'
  }

  interface Contributions {
    user: User
    prs: PullRequest[]
    issues: Issues[]
  }
}
