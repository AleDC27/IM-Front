import HugeTitle from "../../atom/HugeTitle/HugeTitle";
import WelcomeButton from "../../atom/WelcomeButton/WelcomeButton";
import s from "./Welcome.module.scss";

export default function Welcome() {
  return (
    <div className={s.mainContainer}>
      <div className={s.welcomeContainer}>
          <div className={`${s.frame} ${s.left}`}></div>
        <div className={s.textContainer}>
          <div className={s.logo}></div>
          <HugeTitle text={"¡Bienvenido!"} />
          <p className={s.paragraph}>Ahora puedes comenzar a recibir pedidos</p>
        </div>
          <div className={`${s.frame} ${s.right}`}></div>
      </div>
        <WelcomeButton text={"Comenzar"} path={"/dashboard"} />
    </div>
  );
}
