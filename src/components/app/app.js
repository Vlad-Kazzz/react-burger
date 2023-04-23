import React from "react";
import PropTypes from "prop-types";
// import logo from '../logo.svg';
import styles from "../app/app.module.css"; 
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css";

import AppHeader from "../app-header/app-header.js";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.js";
import BurgerConstructor from "../burger-constructor/burger-constructor.js";

import { ConstructorIngredientsContext } from "../../utils/constructor-ingredients-context";
import { AllIngredientsContext } from "../../utils/all-ingredients-context";
// import { DATA_URL } from "../../utils/urls";
import { BASE_URL } from "../../utils/urls";
import { checkReponse } from "../../utils/check-response";

import {burgerIngredientsPropTypes} from "../../utils/prop-types";

const ingredientsEndpoint = '/ingredients';
const DATA_URL = `${BASE_URL}${ingredientsEndpoint}`;

const App = () => {
  const [state, setState] = React.useState({
    ingredientsData: null,
    loading: false,
    error: null,
  });

  const initialIngredientsForConstructor = {
    selectedIngredients: [],
    selectedBun: {},
    totalPrice: 0,
  };

  function reducer(state, action) {
    switch (action.type) {
      case "changeIngredients":
        return { ...state, selectedIngredients: action.payload };
      case "changeIngredientsBun":
        return { ...state, selectedBun: action.payload };
      case "changeTotalPrice":
        return { ...state, totalPrice: action.payload };
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  }

  const [ingredientsForConstructor, dispatch] = React.useReducer(
    reducer,
    initialIngredientsForConstructor
  );

  React.useEffect(() => {
    setState({ ...state, loading: true });

    fetch(DATA_URL) 
      .then((res) => checkReponse(res, state, setState))
      .then((dataJson) => 
        
        setState({ ingredientsData: dataJson.data, loading: false })
     )
      .catch((e) => {
        setState({ ...state, error: e.message });
      });
  }, []);

  React.useEffect(() => {
    if (state.ingredientsData) {
      const selectedIngredients = state.ingredientsData.filter(
        (elem) => elem.type !== "bun"
      );

      dispatch({ type: "changeIngredients", payload: selectedIngredients });

      const selectedBun = state.ingredientsData.filter(
        (elem) => elem.type === "bun"
      )[0];
      dispatch({ type: "changeIngredientsBun", payload: selectedBun });

      let totalPrice = 0;
      selectedIngredients.forEach((elem) => {
        totalPrice = totalPrice + elem.price;
      });
      totalPrice = totalPrice + selectedBun.price * 2;
      dispatch({ type: "changeTotalPrice", payload: totalPrice });
    }
  }, [state.ingredientsData]);

  return (
    <div>
      <AppHeader />
      <div className={styles.container}>
        {state.ingredientsData && (
          <>
            <AllIngredientsContext.Provider value={state.ingredientsData}>
              <BurgerIngredients />
            </AllIngredientsContext.Provider>
            <ConstructorIngredientsContext.Provider value={ingredientsForConstructor}>
              <BurgerConstructor className={styles.item} />
            </ConstructorIngredientsContext.Provider>
          </>
        )}
      </div>
    </div>
  );
};


ConstructorIngredientsContext.Provider.propTypes = burgerIngredientsPropTypes;

AllIngredientsContext.Provider.propTypes = PropTypes.shape({
  selectedIngredients: PropTypes.array.isRequired,
  selectedBun: PropTypes.object.isRequired,
  totalPrice: PropTypes.number.isRequired,
}).isRequired;



export default App;





