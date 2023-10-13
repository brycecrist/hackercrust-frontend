const hackerNewsUrl = "https://hacker-news.firebaseio.com/v0"
const localUrl = "http://localhost:5000"
const herokuUrl = "https://hackercrust-backend-74d20cb660dc.herokuapp.com"

let baseUrl = localUrl

const request = async (url, method="GET", body) => {
  try {
    const request = await fetch(`${baseUrl}/${url}`, {
      method: method,
      mode: 'cors',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    })
    return await request.json()
  } catch (e) {
    console.warn(e)
  }
}

export const getComments = async (ids) => await request("comments", "POST", {ids: ids})

export const getTopStories = async () => await request("storyids")

export const getStory = async (id) => await request(`item/${id}`)

export const getNumberOfStories = async (filters) =>
  await request(`topstories/page/${filters.page}/amount/${filters.amount}/increaseBy/${filters.increaseBy}`)
