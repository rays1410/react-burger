export const getData = (state, setState, apiURL) => {
  try {
    setState({ ...state, isLoading: true });
    fetch(apiURL)
      .then((res) =>
        res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
      )
      .then(({ data }) =>
        setState({ ...state, ingredientsData: data, isLoading: false })
      )
      .catch((e) => {
        setState({ ...state, isLoading: false, isError: true });
      });
  } catch (e) {
    console.log("Error, server does not respond");
  }
};

export const randIndxArray = (numInidices, maxIndx) => {
  const resultVector = [];
  let randIndx;
  for (let i = 0; i < numInidices; i++) {
    randIndx = Math.floor(Math.random() * maxIndx);

    resultVector.push(randIndx);
  }
  return resultVector;
};

export const getRandomIngredients = (numElements, ingredientsData) => {
  const totalIngredientsNum = ingredientsData.length;
  // const randomIndices = randIndxArray(numElements, totalIngredientsNum);
  const randomIndices = [5, 6, 5, 7, 8, 4]; //
  const ingredients = randomIndices.map((item) => ingredientsData[item]);
  return ingredients;
};

// Get total price of all constructor ingredients
export const getTotalPrice = (currentIngredients, bunPrice) => {
  return currentIngredients.reduce(
    (totalPrice, item) => (totalPrice += item?.price),
    bunPrice * 2
  );
};
