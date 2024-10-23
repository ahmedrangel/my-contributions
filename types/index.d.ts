export {};

declare global {
  interface User {
    username: string;
    name: string;
    avatar: string;
  }

  interface PullRequest {
    repo: string;
    title: string;
    url: string;
    created_at: string;
    state: "merged" | "draft" | "open" | "closed";
    number: number;
    type: "User" | "Organization";
    stars: number;
  }

  interface Contributions {
    user: User;
    prs: PullRequest[];
  }
}
