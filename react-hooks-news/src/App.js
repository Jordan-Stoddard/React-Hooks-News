import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function App() {
  const [stories, setStories] = useState([]);
  const [query, setQuery] = useState("react hooks");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchInputRef = useRef();

  useEffect(() => {
    getResults();
  }, []);

  const getResults = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `http://hn.algolia.com/api/v1/search?query=${query}`
      );
      setStories(response.data.hits);
    } catch (err) {
      setError(err);
    }

    setLoading(false);
  };

  const handleClearSearch = e => {
    e.preventDefault();
    console.log(searchInputRef);
    setQuery("");
    searchInputRef.current.focus();
  };

  return (
    <div className="container max-w-md mx-auto p-4 m-2 bg-purple-lightest shadow-lg rounded">
    <img src="https:/icon.now.sh/react/c0c" alt="react logo" className="float-right h-12"/>
    <h1 className="text-grey-darkest font-thin">Hooks News</h1>
      <form
        onSubmit={e => {
          e.preventDefault();
          getResults();
        }}
        className="mb-2"
      >
        <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
          ref={searchInputRef}
          className="border p-1 rounded"
        />
        <button className="bg-orange text-white rounded m-1 p-1" type="submit">Search</button>
        <button className="bg-teal rounded m-1 p-1" type="button" onClick={handleClearSearch}>
          Clear
        </button>
      </form>

      {loading ? (
        <div className="font-bold text-orange-dark">Loading results...</div>
      ) : (
        <ul className="list-reset leading-normal">
          {stories.map(story => (
            <li key={story.objectID}>
              <a className="text-indigo-dark hover:text-indigo-darkest" href={story.url}>{story.url}</a>
            </li>
          ))}
        </ul>
      )}
      {error && <div className="text-red font-bold">{error.message}</div>}
    </div>
  );
}
