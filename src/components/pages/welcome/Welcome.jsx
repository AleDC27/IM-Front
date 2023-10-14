import HugeTitle from "../../atom/HugeTitle/HugeTitle";
import WelcomeButton from "../../atom/WelcomeButton/WelcomeButton";
import s from "./Welcome.module.scss";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { getMenuActive } from "../../../redux/actions";

export default function Welcome() {
  const user = useSelector((state) => state.user);
  const menuActive = useSelector((state) => state.menuActive);
  const dispatch=useDispatch();
  console.log(user);
  console.log(menuActive);

  useEffect(()=>{
    dispatch(getMenuActive(user.comerceId))
  },[])
  return (
    <div className={s.mainContainer}>
      <div className={s.welcomeContainer}>
        <div className={`${s.frame} ${s.left}`}></div>
        <div className={s.textContainer}>
          <div className={s.logo}>
            <img src="/src/assets/logo_imenu_blanco.png" alt="IMENU" />
          </div>
          <HugeTitle text={"¡Bienvenido!"} />
          <p className={s.paragraph}>Ahora puedes comenzar a recibir pedidos</p>
        </div>
        <div className={`${s.frame} ${s.right}`}></div>
      </div>
      <WelcomeButton text={"Comenzar"} path={"/dashboard"} />
    </div>
  );
}
