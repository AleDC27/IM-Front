import { POST_MENU, CLEAR_STATE,GET_ORDERS, LOGIN_ACTION,LOGIN_ACTION_GOOGLE,MENU_ACTIVE,LOCAL_OPEN_VALUE,OPEN_LOCAL,CLOSED_LOCAL, GET_ALL_POS } from "../actions/actionTypes";
import jwtDecode from "jwt-decode";

const initalState = {
  user_internal: localStorage.getItem("user_internal")
    ? JSON.parse(localStorage.getItem("user_internal"))
    : {},
  usuario: "",
  localOpenValue:localStorage.getItem("localOpenValue")
  ?JSON.parse(localStorage.getItem("localOpenValue"))
  :null,
  idCommerceNew: null,
  local: true,
  orders: [],
  menuActive:localStorage.getItem("menuActivo")
  ? localStorage.getItem("menuActivo")
  : [],
  allPos: []
};

export const rootReducer = (state = initalState, { type, payload }) => {
  switch (type) {
    //Clear State
    case CLEAR_STATE:
      return {
        ...state,
        user_internal: {},
        menuActive: []
      }; // Restablece el estado a los valores iniciales
    //loguin 
    case LOGIN_ACTION: {
      const data = jwtDecode(payload.data.token);
      console.log(data)
      const user_internal = {
        token: payload.data.token,
        email: data.email,
        id: data.id,
        comerceId: data.commerceId,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
      };
      // Guardar el token y la información del usuario en localStorage
      localStorage.setItem("token", JSON.stringify(payload.data.token));
      localStorage.setItem("user_internal", JSON.stringify(user_internal));
      return {
        ...state,
        user_internal,
      };
    };

    //loginGoogle
    case LOGIN_ACTION_GOOGLE: {
      const data = jwtDecode(payload.data.token);
      console.log(data)
      const user_internal = {
        token: payload.data.token,
        id: data.id,
        phone: data.phone,
        email: data.email,
        comerceId: data.commerceId,
        commercialPlan:data["commerce.commercialPlan.id"],
        commerceName:data["commerce.name"]
      };
      // Guardar el token y la información del usuario en localStorage
      localStorage.setItem("token", JSON.stringify(payload.data.token));
      localStorage.setItem("user_internal", JSON.stringify(user_internal));
      
      return {
        ...state,
        user_internal,
      };
    };

    //para preguntar menu activo
    case MENU_ACTIVE:{
      return {
        ...state,
        menuActive:payload
      };
    };

    //local cerrado o abierto
    case LOCAL_OPEN_VALUE:{
      const localOpenValue=payload;
      localStorage.setItem("localOpenValue",JSON.stringify(localOpenValue))
      return{
        ...state,
        localOpenValue
      }
    };

    //abrimos local
    case OPEN_LOCAL:{
      return{
        ...state,
        localOpenValue:payload
      }

    }

    //ceramos local
    case CLOSED_LOCAL:{
      return{
        ...state,
        localOpenValue:payload
      }
    }

    case POST_MENU:{
      console.log(payload)
      let idTheNewCommerce=payload;
      localStorage.setItem("user_internal", idTheNewCommerce);
      return{
        ...state,
        idCommerceNew:idTheNewCommerce
      }
    }
    //busca todas las ordenes
    case GET_ORDERS:
      //esta linea solo es para forkear
      const arrayOrders = payload.slice(0, payload.length - 1);
      //
      return {
        ...state,
        orders: arrayOrders,
      };
      break;

    case GET_ALL_POS:
      return {...state, allPos: payload}
    default:
      return state;
  }
};

export default rootReducer;
