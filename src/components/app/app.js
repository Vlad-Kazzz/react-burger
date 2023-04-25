import React from "react";
import PropTypes from "prop-types";
// import logo from '../logo.svg';
import styles from "./app.module.css";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";

import { useSelector, useDispatch } from "react-redux";
import { getAllIngredients } from "../../services/actions/actions";
import { BASE_URL } from "../../utils/urls";
import { FILL_INGREDIENTS_LIST } from "../../services/actions/actions";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ingredientsEndpoint = '/ingredients';
const DATA_URL = `${BASE_URL}${ingredientsEndpoint}`;

const App = () => {
  const dispatch = useDispatch();

  const { allIngredients } = useSelector(
    (store) => store.getAllIngredientsReducer
  );

  const { modalVisible } = useSelector((store) => store.modalReducer);

  React.useEffect(() => {
    dispatch(getAllIngredients(DATA_URL));
  }, []);

  React.useEffect(() => {
    if (allIngredients.length > 0) {
      const bunList = allIngredients
        .filter((elem) => elem.type === "bun")
        .map((elem) => ({ ...elem, counter: 0 }));

      const sauceList = allIngredients
        .filter((elem) => elem.type === "sauce")
        .map((elem) => ({ ...elem, counter: 0 }));

      const mainList = allIngredients
        .filter((elem) => elem.type === "main")
        .map((elem) => ({ ...elem, counter: 0 }));

      dispatch({
        type: FILL_INGREDIENTS_LIST,
        bunList: bunList,
        sauceList: sauceList,
        mainList: mainList,
      });
    }
  }, [allIngredients]);

  return (
    <div>
      <AppHeader />
      <main className={styles.container}>
        {allIngredients && (
          <>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
            {modalVisible && (
              <div className={`${styles.modal}`}>
                <Modal />
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default App;






