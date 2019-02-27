import React, {useEffect, useState} from 'react'
import axios from 'axios';

export default function App() {

  const [stories, setStories] = useState([])
  const [query, setQuery] = useState('react hooks')

  useEffect(() => {
    getResults()

       // .then(res => {
    //   setStories(res.data.hits)
    // })
  }, []) 

  const getResults = async () => {
    const response = await axios.get(`http://hn.algolia.com/api/v1/search?query=${query}`)
    setStories(response.data.hits)
  }

  return (
    <>
    <form onSubmit={(e) => {e.preventDefault(); getResults()}}>
    <input 
    type="text"
    value={query}
    onChange={event => setQuery(event.target.value)}
    />
    <button type="submit">Search</button>
    </form>

    <ul>
      {stories.map(story => (
        <li key={story.objectID}>
          <a href={story.url}>{story.url}</a>
        </li>
      ))}
      </ul>
    </>
  )
}

