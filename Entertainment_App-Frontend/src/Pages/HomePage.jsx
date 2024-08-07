import { PageLayout } from "../PageLayout";
import { useDispatch } from "react-redux";
import { setRecommended } from "../redux/Slice/RecommendSlice";
import { useEffect, useState } from "react";
import { setTrending } from "../redux/Slice/TrendingShowsslice";
import axios from "../Features/ApiCall.js";
import { SearchTab } from "../Components/SearchTab";
import { ResultofSearch } from "../Components/ResultofSearch";
import { useFind } from "../Hooks/useFind";
import { LoadingComp } from "../Components/LoadingComp";
import { ContainerforRecomm } from "../Components/ContainerforRecomm";
import { ContainerforTrending } from "../Components/ContainerforTrending";

export const HomePage = () => {
  const [searchString, setSearchString] = useState("");

  const { searchResults, isLoading, error } = useFind("/media", searchString);

  const dispatch = useDispatch();

  useEffect(() => {
    const movieOrTvArray = ["movies", "tvShows"];
    const selectMovieOrTv = Math.floor(Math.random() * 2);
    const randomPage =
      Math.floor(Math.random() * (selectMovieOrTv === 1 ? 1451 : 946)) + 1;

    const getRecommendedMovieOrTvShowAndPopulateRedux = async () => {
      const movieOrTv = movieOrTvArray[selectMovieOrTv];
      const URL = `/${movieOrTv}?page=${randomPage}`;
      const response = await axios.get(URL);
      const data = response.data;
      dispatch(
        setRecommended({
          type: movieOrTv,
          data: data.allmovies ? data.allmovies : data.tvShows,
        })
      );
    };

    const getTrendingAndPopulateRedux = async () => {
      const response = await axios.get("/trending");
      const data = await response.data;
      dispatch(setTrending(data.trendingItems));
    };

    getRecommendedMovieOrTvShowAndPopulateRedux();
    getTrendingAndPopulateRedux();
  }, []);

  return (
    <PageLayout>
      <SearchTab
        setSearchString={setSearchString}
        placeholder={"Search for Movies and Tvshows"}
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
          <ContainerforTrending />
          <ContainerforRecomm />
        </>
      )}
    </PageLayout>
  );
};
