import PropTypes from "prop-types";

export const ingredientsPropTypes = PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
}).isRequired;


// export const burgerIngredientsPropTypes = PropTypes.arrayOf(
//     PropTypes.shape({
//         _id: PropTypes.string.isRequired,
//         name: PropTypes.string.isRequired,
//         type: PropTypes.string.isRequired,
//         proteins: PropTypes.number.isRequired,
//         fat: PropTypes.number.isRequired,
//         carbohydrates: PropTypes.number.isRequired,
//         calories: PropTypes.number.isRequired,
//         price: PropTypes.number.isRequired,
//         image: PropTypes.string.isRequired,
//         image_mobile: PropTypes.string.isRequired,
//         image_large: PropTypes.string.isRequired,
//         __v: PropTypes.number.isRequired,
//     })
// ).isRequired;    



// export const ingredientsInfoPropTypes = PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     image_large: PropTypes.string.isRequired,
//     calories: PropTypes.number.isRequired,
//     proteins: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     carbohydrates: PropTypes.number.isRequired,
// }).isRequired;
