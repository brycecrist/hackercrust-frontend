const baseUrl = "https://hacker-news.firebaseio.com/v0/"

const request = async (url, method="GET") => {
    const response = await fetch(`${baseUrl}/${url}.json`, {
        method: method
    })

    return response
}

export const getTopStories = async () => await request("topstories")

export const getStory = async (id) => await request(`item/${id}`)

export const getNumberOfStories = async (ids, filters) => {
    let stories = []

    let minStoriesToGet = (filters.page - 1) * filters.maxAmount
    const maxStoriesToGet = filters.page * filters.maxAmount

    for (let i = minStoriesToGet; i < maxStoriesToGet; i++) {
        const story = await getStory(ids[i])
        stories.push(await story.json())
    }

    return stories
}
