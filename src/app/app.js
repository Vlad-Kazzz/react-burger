import React from "react";
// import logo from '../logo.svg';
import styles from "../app/app.module.css"; 
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css";

import AppHeader from "../app-header/app-header.js";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.js";
import BurgerConstructor from "../burger-constructor/burger-constructor.js";

const URL = "https://norma.nomoreparties.space/api/ingredients";

const App = () => {
  const [state, setState] = React.useState({
    ingredientsData: null,
    loading: false,
    error: null
  });
  
  const checkReponse = (res) => {
    return res.ok
      ? res.json()
      : res.json().then((err) => {
          Promise.reject(err);
          setState({ ...state, error: err.message });
        });
    };
  
  React.useEffect(() => {
    setState({ ...state, loading: true });
  
    fetch(URL)
      .then(checkReponse)
      .then((dataJson) => {
        setState({ ingredientsData: dataJson.data, loading: false });
      })
      .catch((e) => {
        setState({ ...state, error: e.message });
      });
  }, []);

  return (
    <div>
      <AppHeader />

      <div className={styles.container}>
        {state.ingredientsData && (
          <>
            <BurgerIngredients burgerIngredients={state.ingredientsData}/>
            <BurgerConstructor className={styles.alignRight} selectedIngredients={state.ingredientsData}/>
          </>
        )}
      </div>

      
    </div>
  );
};


//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
