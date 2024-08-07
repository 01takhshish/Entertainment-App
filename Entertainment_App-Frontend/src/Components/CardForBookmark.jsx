import { useNavigate } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import { GrDevice } from "react-icons/gr";
import { FaFilm } from "react-icons/fa";
import { BookMark_Comp } from "./BookMark_Comp";

export const CardForBookmark = ({ data }) => {
  const getReleaseYear = (item) => {
    return item.type === "Movie"
      ? (item.releaseDate && item.releaseDate.split("-")[0]) || "N/A"
      : (item.firstAirDate && item.firstAirDate.split("-")[0]) || "N/A";
  };

  const navigate = useNavigate();
  return data.map((item) => (
    <div
      className="w-64 md:w-72 lg:w-64 xl:w-[15.8rem] 2xl:w-64"
      key={item._id}
    >
      <div className="relative w-full rounded-lg">
        <img
          src={item.bannerUrl || item.posterUrl}
          onError={(e) => {
            e.currentTarget.src = "/placeHolder.png";
          }}
          alt={item.title}
          loading="eager"
          className="aspect-video w-full cursor-pointer rounded-lg object-fill transition-opacity duration-300 hover:opacity-50"
          onClick={() => {
            navigate(
              `/${item.type === "Movie" ? "movies" : "tvshows"}/${item._id}`
            );
          }}
        />
        <BookMark_Comp id={item._id} />
      </div>
      <div>
        <div className="flex w-full items-center gap-4 text-app-icons">
          <span>{getReleaseYear(item)}</span>
          <GoDotFill className="h-3 w-3" />
          {item.type === "Movie" ? (
            <FaFilm className="inline-block h-4 w-4" />
          ) : (
            <GrDevice className="inline-block h-4 w-4" />
          )}
        </div>
      </div>
      <h2>{item.title}</h2>
    </div>
  ));
};
