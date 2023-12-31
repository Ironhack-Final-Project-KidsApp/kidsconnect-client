import { useEffect, useState,useContext } from "react";
import userService from '../../services/user.services';
import { AuthContext } from '../../context/auth.context';
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const FavoriteButton = ({ idactivity }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const authContext = useContext(AuthContext);
    const { user } = authContext;

    useEffect(() => {
        userService.getUsersFavorites(user._id)
          .then((response) => {
            // console.log(response.data);
            const userFavorites = response.data;
            const isFavorite = userFavorites.includes(idactivity);
            setIsFavorite(isFavorite);
          })
          .catch((error) => {
            console.error(error);
          });
      }, [user._id, idactivity]);

      const handleFavoriteButton = async () => {
        try {
          if (isFavorite) {
            await userService.removeFavoriteActivity(idactivity);
            setIsFavorite(false);
          } else {
            await userService.addFavoriteActivity(idactivity);
            setIsFavorite(true);
          }
        } catch (err) {
          console.error(err);
        }
      };
     
      return (
        <div>
          <IconButton onClick={handleFavoriteButton}>
            {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
          </IconButton>
        </div>
      );
    };

export default FavoriteButton;