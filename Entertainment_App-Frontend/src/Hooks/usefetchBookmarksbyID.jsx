import { useEffect } from "react";
import { useAuth } from "./useAuthentication";
import { populateBookmarkIDs } from "../redux/Slice/Bookmarksslice";
import axios from "../Features/ApiCall";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

// to retrieve information using id
export const useFetchBookmarksbyID = () => {
  const { auth } = useAuth();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const getBookmarksID = async () => {
      try {
        const response = await axios.get("/user/watchlist", {
          headers: { Authorization: `Bearer ${auth.accessToken}` },
        });
        const data = response.data;
        if (data.success) {
          data.watchlist.forEach((item) => {
            dispatch(populateBookmarkIDs(item._id));
          });
        }
      } catch (err) {
        navigate("/login", { state: { from: pathname }, replace: true });
      }
    };
    getBookmarksID();
  }, []);
};
