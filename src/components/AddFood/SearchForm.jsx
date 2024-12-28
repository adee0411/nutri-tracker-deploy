import { FormControl, Input, Sheet, Stack, Typography } from "@mui/joy";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ResultList from "./ResultList";

import queryList from "../../data/FoodDB";

import {
  setSelectedIngredient,
  setSearchQueryInput,
  setSearchResultList,
} from "../../store/ingredientSlie";

const SearchForm = () => {
  const dispatch = useDispatch();

  const { searchQueryInput } = useSelector((state) => state.ingredient.UI);
  const { searchResultList } = useSelector((state) => state.ingredient);

  const handleQueryInputChange = (e) => {
    dispatch(setSearchQueryInput(e.target.value));
    if (e.target.value === "") setSelectedIngredient("");
  };

  useEffect(() => {
    const resultList =
      searchQueryInput === ""
        ? []
        : queryList.filter(
            (data) =>
              data.ingredientName
                .toLowerCase()
                .includes(searchQueryInput.toLowerCase()) &&
              searchQueryInput.length > 2
          );

    dispatch(setSearchResultList(resultList));
  }, [searchQueryInput]);

  return (
    <>
      <Sheet
        color="primary"
        variant="outlined"
        invertedColors
        sx={{ p: 2, my: 2, borderRadius: "md" }}
      >
        <form>
          <Typography level="title-md">Étel keresése:</Typography>{" "}
          <Stack direction="row" my={1}>
            <FormControl sx={{ flex: 1 }}>
              <Input
                type="search"
                name="ingredient"
                value={searchQueryInput}
                onChange={handleQueryInputChange}
                placeholder="Keresés..."
              ></Input>
            </FormControl>
          </Stack>
        </form>
        {searchResultList.length === 0 ? (
          ""
        ) : (
          <ResultList resultList={searchResultList} />
        )}
      </Sheet>
    </>
  );
};

export default SearchForm;
