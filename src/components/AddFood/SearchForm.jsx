import {
  Button,
  FormControl,
  Input,
  List,
  ListItem,
  ListItemButton,
  Stack,
  Typography,
} from "@mui/joy";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import queryList from "../../data/FoodDB";

import {
  setSelectedIngredient,
  setSearchQueryInput,
  setSearchResultList,
} from "../../store/ingredientSlie";

console.log(queryList);

const SearchForm = () => {
  const dispatch = useDispatch();

  const query = useSelector((state) => state.ingredient.UI.searchQueryInput);
  const { searchResultList, selectedIngredient } = useSelector(
    (state) => state.ingredient
  );

  const handleSelectedIngredient = (e) => {
    const ingredientID = e.target.id;
    const ingredient = searchResultList.filter(
      (result) => result.id === ingredientID
    );
    dispatch(setSelectedIngredient(ingredient));
  };

  const handleQueryInputChange = (e) => {
    dispatch(setSearchQueryInput(e.target.value));
    if (e.target.value === "") setSelectedIngredient("");
  };

  useEffect(() => {
    const resultList =
      query === ""
        ? []
        : queryList.filter((data) =>
            data.ingredientName.toLowerCase().includes(query.toLowerCase())
          );

    dispatch(setSearchResultList(resultList));
  }, [query]);

  return (
    <>
      <form>
        {" "}
        <Stack direction="row" m={1}>
          <FormControl sx={{ p: 1, flex: 1 }}>
            <Input
              type="search"
              name="ingredient"
              value={query}
              onChange={handleQueryInputChange}
              placeholder="Search ingredient"
            ></Input>
          </FormControl>
          <FormControl sx={{ p: 1 }}>
            <Button type="submit">Search</Button>
          </FormControl>
        </Stack>
        {searchResultList.length === 0 ? (
          ""
        ) : (
          <List
            variant="outlined"
            sx={{
              m: 2,
              borderRadius: "md",
              p: 0,
              overflow: "hidden",
            }}
          >
            {searchResultList.map((result) => {
              return (
                <ListItem key={result.id}>
                  <ListItemButton
                    sx={{ borderRadius: 0, fontSize: 12 }}
                    id={result.id}
                    onClick={handleSelectedIngredient}
                  >
                    {result.ingredientName}
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        )}
      </form>
      <Typography>
        {selectedIngredient ? selectedIngredient[0].ingredientName : ""}
      </Typography>
    </>
  );
};

export default SearchForm;
