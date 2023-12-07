import HugeTitle from "../../atom/HugeTitle/HugeTitle";
import WelcomeButton from "../../atom/WelcomeButton/WelcomeButton";
import s from "./Welcome.module.scss";
import { useDispatch,useSelector } from "react-redux";
import { useEffect} from "react";
import { getMenuActive } from "../../../redux/actions";
import logo from "../../../assets/logo_imenu_blanco.png"
import { useTranslation } from "react-i18next";
/* import WelcomeModal from "../../molecules/modals/welcomeModal/WelcomeModal"; */

export default function Welcome() {
  const user_internal = useSelector((state) => state.user_internal);
  const comerceId=useSelector(state=>state.user_internal)
  console.log(comerceId)
  const [t,i18n]=useTranslation("global")
  const dispatch=useDispatch();
/*   const [modal,setModal]=useState(false);

const handleModal=()=>{
  setModal(!modal)
} */

  useEffect(()=>{
    dispatch(getMenuActive(user_internal.comerceId))
  },[])
  return (
    <div className={s.mainContainer}>
      <div className={s.welcomeContainer}>
        <div className={`${s.frame} ${s.left}`}></div>
        <div className={s.textContainer}>
          <div className={s.logo}>
            <img src={logo} alt="IMENU" />
          </div>
          <HugeTitle text={t("welcome.welcome")} />
          <p className={s.paragraph}>{t("welcome.now you can start receiving orders")}</p>
        </div>
        <div className={`${s.frame} ${s.right}`}></div>
      </div>
      <WelcomeButton text={t("welcome.start")} path={"/dashboard"} />
      {/* { !modal?<WelcomeModal handleModal={handleModal}/> :null} */}
    </div>
  );
}
