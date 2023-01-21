import { IngredientObject } from "./interfaces";

export const getData = async (apiURL: string) => {
  return fetch(apiURL).then((res) =>
    res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
  );
};

export const randIndxArray = (numInidices: number, maxIndx: number) => {
  const resultVector = [];
  let randIndx;
  for (let i = 0; i < numInidices; i++) {
    randIndx = Math.floor(Math.random() * maxIndx);

    resultVector.push(randIndx);
  }
  return resultVector;
};

export const getRandomIngredients = (
  numElements: number,
  ingredientsData: IngredientObject[]
) => {
  // const totalIngredientsNum = ingredientsData.length;

  // const randomIndices = randIndxArray(numElements, totalIngredientsNum);
  const randomIndices = [5, 6, 5, 7, 8, 4]; //

  const ingredients = randomIndices.map((item) => ingredientsData[item]);
  return ingredients;
};
