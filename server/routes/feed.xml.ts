import { Feed } from 'feed'
import { joinURL } from 'ufo'
import { getRequestURL } from 'h3'

export default defineEventHandler(async (event) => {
  const domain = getRequestURL(event).origin
  const { user, prs, issues } = await $fetch <Contributions> ('/api/contributions')
  const feed = new Feed({
    title: `${user.name} is contributing...`,
    description: `Discover ${user.name}'s recent contributions on GitHub`,
    id: domain,
    link: domain,
    language: 'en',
    image: joinURL(domain, 'favicon.png'),
    favicon: joinURL(domain, 'favicon.png'),
    copyright: `CC BY-NC-SA 4.0 2024 © ${user.name}`,
    feedLinks: {
      rss: `${domain}/rss.xml`,
    },
  })

  const feedArray = [...prs, ...issues]
    .toSorted((a, b) => Number(new Date(b.created_at)) - Number(new Date(a.created_at)))

  for (const contrib of feedArray) {
    const contributionType = contrib.url.includes('/pull/') ? 'PR' : 'Issue'
    feed.addItem({
      link: contrib.url,
      date: new Date(contrib.created_at),
      title: `${contributionType} · ${contrib.title}`,
      image: `https://github.com/${contrib.repo.split('/')[0]}.png`,
      description: `<a href="${contrib.url}">${contrib.title}</a>`,
    })
  }

  appendHeader(event, 'Content-Type', 'application/xml')
  return feed.rss2()
})
