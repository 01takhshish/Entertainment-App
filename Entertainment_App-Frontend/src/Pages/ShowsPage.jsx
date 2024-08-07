import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../Features/ApiCall";
import { setTvShows } from "../redux/Slice/TVshowsslice";
import { PageLayout } from "../PageLayout";
import { useFind } from "../Hooks/useFind";
import { SearchTab } from "../Components/SearchTab";
import { ResultofSearch } from "../Components/ResultofSearch";
import { PageFormat } from "../Components/PageFormat";
import { AllMedia } from "../Components/AllMedia";
import { LoadingComp } from "../Components/LoadingComp";

export const ShowsPage = () => {
  const [searchString, setSearchString] = useState("");

  const [tvShowIsLoading, setTvShowIsLoading] = useState(true);

  const [tvShowError, setTvShowError] = useState("");

  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  const [totalPages, setTotalPages] = useState(null);

  const { searchResults, isLoading, error } = useFind(
    "/tvshows/search",
    searchString
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const getMoviesAndPopulateRedux = async () => {
      setTvShowIsLoading(true);
      setTvShowError("");

      try {
        const response = await axios.get(`/tvshows?page=${currentPageNumber}`);
        const data = response.data;

        dispatch(setTvShows(data.tvShows));

        setTotalPages(data.totalPages);
        setTvShowIsLoading(false);
      } catch (err) {
        setTvShowError(err.response.data);
        setTvShowIsLoading(false);
      }
    };

    getMoviesAndPopulateRedux();
  }, [currentPageNumber]);

  const tvShows = useSelector((state) => state.tvShows);

  return (
    <PageLayout>
      <SearchTab
        setSearchString={setSearchString}
        placeholder={"Search For TV Shows"}
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
            TV Shows
          </h2>
          <div className="mb-10 mt-10 w-fit place-self-center md:w-80 md:-translate-x-[15%] lg:w-96 lg:-translate-x-1/4">
            <PageFormat
              currentPage={currentPageNumber}
              setCurrentPage={setCurrentPageNumber}
              totalPages={totalPages}
              givenPadding={"p-2 px-1"}
            />
          </div>

          {tvShowIsLoading ? (
            <LoadingComp />
          ) : (
            <AllMedia data={tvShows} error={tvShowError} />
          )}
        </>
      )}
    </PageLayout>
  );
};
