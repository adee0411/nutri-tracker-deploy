import { ButtonGroup, IconButton } from "@mui/joy";

import { IoIosAddCircleOutline } from "react-icons/io";
import { CiTrash } from "react-icons/ci";
import { IoIosRefresh } from "react-icons/io";
import { TbListDetails } from "react-icons/tb";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";

import { emptyList } from "../../store/ingredientSlie";

const IngredientListActions = ({ listName }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mealName = useParams().mealTitle;

  const handleAddIngredient = () => {
    navigate("add-food");
  };

  const handleEmptyList = () => {
    dispatch(emptyList({ listName: listName, mealName: mealName }));
  };

  const listActions = {
    addIngredient: {
      icon: <IoIosAddCircleOutline />,
      title: "Alapanyag hozzáadása",
      handler: handleAddIngredient,
    },
    emptyList: {
      icon: <CiTrash />,
      title: "Lista ürítése",
      handler: handleEmptyList,
    },
    undoDeleteIngredient: {
      icon: <IoIosRefresh />,
      title: "Visszavonás",
    },
    changeDetails: {
      icon: <TbListDetails />,
      title: "Nézet",
    },
  };
  return (
    <ButtonGroup size="sm">
      {Object.entries(listActions).map((action) => {
        const actionName = action[0];
        const { icon, title, handler } = action[1];
        return (
          <IconButton
            title={title}
            sx={{ fontSize: 18 }}
            variant={actionName === "addIngredient" ? "solid" : ""}
            color={actionName === "addIngredient" ? "primary" : ""}
            onClick={handler}
            key={actionName}
          >
            {icon}
          </IconButton>
        );
      })}
    </ButtonGroup>
  );
};

export default IngredientListActions;
