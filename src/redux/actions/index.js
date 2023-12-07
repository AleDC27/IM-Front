import axios from "axios";
import { CLEAR_STATE,LOCAL_OPEN_VALUE,GET_ORDERS,LOGIN_ACTION,LOGIN_ACTION_GOOGLE,MENU_ACTIVE,OPEN_LOCAL,CLOSED_LOCAL, GET_ALL_POS, POST_NEW_IMG} from "./actionTypes";

//limpiamos redux

export function clearState() {
  return function (dispatch) {
    console.log("CLearState")
    return dispatch({
      type:CLEAR_STATE
    })
  }
}

//nos logueamos
export function loginAction(payload){
return async function (dispatch) {
  try {
    const response = await axios.post("loginemployee/login",payload);
/*     console.log(response.data.token) */
    return dispatch({
      type:LOGIN_ACTION,
      payload:response
    })
  } catch (error) {
    return error
  }
}
};


//loguin Google
export function loginActionGoogle(payload){
  const email={
    googleUser: payload
}
  return async function (dispatch) {
    try {
      const response = await axios.post("loginemployee/loginG",email);
      return dispatch({
        type:LOGIN_ACTION_GOOGLE,
        payload:response
      })
    } catch (error) {
      console.error(/* "Error en la acción loginActionGoogle:", */ error);
      return error
    }
  }
  }

//////////////////* Menu Actions *//////////////////
//si hay un menu activo
export function getMenuActive(comerceId){
  return async function (dispatch) {
    try {
      const response = await axios(`menu/lastMenu/${comerceId}`);
      const result=response.data;
      return dispatch({
        type:MENU_ACTIVE,
        payload:result
      })
    } catch (error) {
      return error
    }
  }
}


export function postMenu(menu,comercio, id) {
  console.log(menu,"menu transformado")
  console.log(comercio,"comercio transformado")
  return async function (dispatch, getState) {
    console.log(id)
    try {
      id = getState().user_internal.comerceId;
      if (id){
        const response = await axios.post(
          `/menu/menuUp/${id}`,
          { commerceJSON: comercio, menuJSON: menu }
        );
        console.log("entro al primero",response)
      }else {
        const response = await axios.post(
          `/menu/menuUp/0`,
          { commerceJSON: comercio, menuJSON: menu }
        );
        console.log("entro al segundo",response)
      }
    } catch (error) {
      return error;
    }
  };
}


//si el local esta abierto
export function localOpen(comerceId) {
  return async function (dispatch) {
    try {
      const response = await axios(`commerce/openCommerce/${comerceId}`)
      const result=response.data
      return dispatch({
        type:LOCAL_OPEN_VALUE,
        payload:result
      })
    } catch (error) {
      return error
    }
  }
  }


//abrimos local
export function openLocal(comerceId) {
  return async function (dispatch) {
    try {
      const response = await axios.put(`/commerce/open/${comerceId}`)
      if(response.status===200){
        return dispatch({
          type:OPEN_LOCAL,
          payload:true
        })
      }
    } catch (error) {
      return error
    }
  }
  }
//cerramos local
export function closedLocal(comerceId) {
  return async function (dispatch) {
    try {
      const response = await axios.put(`/commerce/close/${comerceId}`)
      if(response.status===200){
        return dispatch({
          type:CLOSED_LOCAL,
          payload:false
        })
      }
    } catch (error) {
      return error
    }
  }
  }


export async function getOrders() {
  return async function (dispatch) {
    try {
      const response = await axios.get("order/all");
      return dispatch({
        type:GET_ORDERS,
        payload:response.data
      })
    } catch (error) {
      return error
    }
  }
}

//? Devuelve array con todos los sectores del comercio, dentro de los sectores se encuentran los Pos
//? Esta accion se debe ejecutar en un useEffect del componente QrGenerator.
export function getAllPos(id){
  return async function (dispatch){
    try {
      let response = await axios.get(`/pos/all/${id}`);
      let allPos = response.data[0].sectors;
      return dispatch({
        type: GET_ALL_POS,
        payload: allPos
      })
    } catch (error) {
      console.error(error)
    }
  }
}


export async function postImg (img) {
  try {
    let response = await axios.post(
      "https://tenkiweb.com/public_html/imenu/img/",
      img,
      {
        headers: {
          "Access-Control-Allow-Origin": "http://127.0.0.1:5173/",
        },
      }
    );
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}