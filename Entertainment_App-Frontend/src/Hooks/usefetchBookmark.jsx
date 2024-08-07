import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../Features/ApiCall";
import { useAuth } from "./useAuthentication";
import { useLocation, useNavigate } from "react-router-dom";
import { populateBookmarkArray } from "../redux/Slice/Bookmarksslice";

// to retrieve bookmarked information

export const useFetchBookmark = () => {
  const bookmarks = useSelector((state) => state.bookmarks.bookmarkId);
  const dispatch = useDispatch();
  const { auth } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const getBookmarks = async () => {
      try {
        const response = await axios.get("/user/watchlist", {
          headers: { Authorization: `Bearer ${auth.accessToken}` },
        });
        const data = response.data;
        if (data.success) {
          dispatch(populateBookmarkArray(data.watchlist));
        }
      } catch (err) {
        navigate("/login", { state: { from: pathname }, replace: true });
      }
    };

    getBookmarks();
  }, [bookmarks]);
};
