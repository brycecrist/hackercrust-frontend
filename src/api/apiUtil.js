const hackerNewsUrl = "https://hacker-news.firebaseio.com/v0"
const baseUrl = "http://localhost:5000"

const request = async (url, method="GET", body) => {
  try {
    const request = await fetch(`${baseUrl}/${url}`, {
      method: method,
      body: body
    })
    return await request.json()
  } catch (e) {
    console.warn(e)
  }
}

export const getTopStories = async () => await request("storyids")

export const getStory = async (id) => await request(`item/${id}`)

export const getNumberOfStories = async (filters) =>
  await request(`topstories/page/${filters.page}/amount/${filters.amount}/increaseBy/${filters.increaseBy}`)
