import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SearchTab } from "../Components/SearchTab";
import { ResultofSearch } from "../Components/ResultofSearch";
import { PageLayout } from "../PageLayout";
import { CardForBookmark } from "../Components/CardForBookmark";

export const BookmarksPage = () => {
  const bookmarks = useSelector((state) => state.bookmarks.bookmarkArray);
  const bookmarkedMovies = bookmarks.filter((item) => item.type === "Movie");
  const bookmarkedTvShows = bookmarks.filter((item) => item.type === "TV Show");

  const [searchString, setSearchString] = useState("");

  const [error, setError] = useState("");

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    setError("");
    if (searchString) {
      const searchBookmarks = (searchString) => {
        const titleRegex = new RegExp(searchString, "i");
        const bookmarkSearchResults = bookmarks.filter((item) =>
          titleRegex.test(item.title)
        );
        if (bookmarkSearchResults.length === 0) {
          setError("No boomkarks found");
        } else {
          setSearchResults(bookmarkSearchResults);
        }
      };
      searchBookmarks(searchString);
    }
  }, [searchString]);

  return (
    <PageLayout>
      <SearchTab
        setSearchString={setSearchString}
        placeholder={"Search for Bookmarked Shows"}
      />

      {searchString ? (
        <ResultofSearch
          data={searchResults}
          searchString={searchString}
          error={error}
        />
      ) : bookmarks.length !== 0 ? (
        <div className="flex flex-col items-center gap-20 lg:items-start">
          <div className="flex flex-col items-center lg:items-start">
            <h1 className="my-6 place-self-start text-2xl font-extralight sm:text-4xl">
              Bookmarked Movies
            </h1>
            <div className="grid grid-cols-1 gap-8 place-self-center sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 xl:gap-6 2xl:grid-cols-5">
              <CardForBookmark data={bookmarkedMovies} />
            </div>
          </div>

          <div className="flex flex-col items-center lg:items-start">
            <h1 className="my-6 place-self-start text-2xl font-extralight sm:text-4xl">
              Bookmarked Tv Shows
            </h1>
            <div className="grid grid-cols-1 gap-8  sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 xl:gap-6 2xl:grid-cols-5">
              <CardForBookmark data={bookmarkedTvShows} />
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-20 flex size-full items-center justify-center">
          <h1 className=" lg:-translate-x-1/2">
            <span className="  text-2xl font-medium">
              No Bookmarks Yet! <br />
            </span>
            <Link to={"/"} className="addBookmarks">
              Spice Up Your Watchlist?
            </Link>
          </h1>
        </div>
      )}
    </PageLayout>
  );
};
