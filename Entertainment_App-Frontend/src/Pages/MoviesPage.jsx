import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../Features/ApiCall.js";
import { setMovies } from "../redux/Slice/MoviesSlice";
import { PageLayout } from "../PageLayout";
import { SearchTab } from "../Components/SearchTab";
import { ResultofSearch } from "../Components/ResultofSearch";
import { LoadingComp } from "../Components/LoadingComp";
import { useFind } from "../Hooks/useFind";
import { PageFormat } from "../Components/PageFormat";
import { AllMedia } from "../Components/AllMedia";

export const MoviesPage = () => {
  const [searchString, setSearchString] = useState("");

  const [movieIsLoading, setMovieIsLoading] = useState(true);

  const [movieError, setMovieError] = useState("");

  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  const [totalPages, setTotalPages] = useState(null);

  const { searchResults, isLoading, error } = useFind(
    "/movies/search",
    searchString
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const getMoviesAndPopulateRedux = async () => {
      setMovieIsLoading(true);

      setMovieError("");

      try {
        const response = await axios.get(`/movies?page=${currentPageNumber}`);
        const data = await response.data;
        dispatch(setMovies(data.allmovies));
        setTotalPages(data.totalPages);
        setMovieIsLoading(false);
      } catch (err) {
        setMovieError(err.response.data);
        setMovieIsLoading(false);
      }
    };

    getMoviesAndPopulateRedux();
  }, [currentPageNumber]);

  const movies = useSelector((state) => state.movies);

  return (
    <PageLayout>
      <SearchTab
        setSearchString={setSearchString}
        placeholder={"Search For Movies"}
      />
      {searchString ? (
        isLoading ? (
          <LoadingComp />
        ) : (
          <ResultofSearch
            data={searchResults}
            error={error}
            searchString={searchString}
          />
        )
      ) : (
        <>
          <h2 className="my-4 ml-8 place-self-start text-2xl font-light sm:ml-10 sm:text-4xl">
            Movies
          </h2>
          <div className="mb-10 mt-10 w-fit place-self-center md:w-80 lg:w-96 lg:-translate-x-1/4">
            <PageFormat
              currentPage={currentPageNumber}
              setCurrentPage={setCurrentPageNumber}
              totalPages={totalPages}
              givenPadding={"p-2"}
            />
          </div>

          {movieIsLoading ? (
            <LoadingComp />
          ) : (
            <AllMedia data={movies} error={movieError} />
          )}
        </>
      )}
    </PageLayout>
  );
};
