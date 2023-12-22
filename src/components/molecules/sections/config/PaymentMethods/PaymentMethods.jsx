import ConfigFormMp from "../../../configForm/ConfigForm";
import { useTranslation } from "react-i18next";
import Switch from "react-switch";
import { useState, useEffect } from "react";
import SubTitle from "../../../../atom/subTitle/SubTitle";
import { useSelector } from "react-redux";
import s from "./paymentMethods.module.scss";
import axios from "axios";
import Loading from "../../../../atom/loading/Loading";
import { ReactComponent as MpLogo } from "../../../../../assets/MpLogo.svg";
import { Banknotes } from "../../../../atom/iconsHerocoins/icons";
//import { ReactComponent as CashLogo } from "../../../../../assets/cash.png";

export default function PaymentMethods() {
  const [t, i18n] = useTranslation("global");
  const [paymentMethods, setPaymentMethods] = useState(null);
  const [cash, setCash] = useState(false);
  const [mp, setMp] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isChangingMp, setIsChangingMp] = useState(false); // Estado para controlar si se está cambiando el estado de mp
  const [isChangingCash, setIsChangingCash] = useState(false); // Estado para controlar si se está cambiando el estado de mp

  const comerceId = useSelector((state) => state.user_internal.comerceId);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `/payment/all/${comerceId}`
        );
        setPaymentMethods(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar datos de pago:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (paymentMethods) {
      const mpValue = paymentMethods.find((cur) => cur.type === "mercadopago");
      const cashValue = paymentMethods.find((cur) => cur.type === "efectivo");
      setMp(mpValue);
      setCash(cashValue);
    }
  }, [paymentMethods]);

const method=(arg)=> paymentMethods.find(cur=>cur.type===arg);

  const handlePaymentMethods = async (change,newChange,paymentMethods,newset) => {
    if (change) return; // Evita múltiples clics mientras se está realizando una solicitud

    newChange(true); // Marcar que se está cambiando el estado de mp
    try {
      const response = await axios.put(
        `https://nodejs-production-bbf9.up.railway.app/payment/${
          paymentMethods.active ? "inactive" : "active"
        }/${paymentMethods.id}`
      );
      if (response.status === 200) {
        // La solicitud se completó con éxito, actualiza el estado del interruptor
        newset({ ...paymentMethods, active: !paymentMethods.active });
      }
    } catch (error) {
      console.error("Error al cambiar el estado de Mercado Pago:", error);
    }

    newChange(false); // Restablecer el estado después de completar la solicitud
  };

  return (
    <section>
      {loading ? (
        <Loading />
      ) : (
        <>
          <article className={s.contentOption}>
            <Banknotes heigth={40}/>
            <SubTitle text={"Efectivo"} />
            <Switch
              onChange={()=>handlePaymentMethods(isChangingCash,setIsChangingCash,cash,setCash)}
              checked={cash ? cash.active : false}
              disabled={isChangingCash}
            />
          </article>
          <article className={s.contentOption}>
            <MpLogo
              style={{
                width: "40px",
                height: "40px",
              }}
            />
            <SubTitle text={"Mercado pago"} />
            <Switch
              onChange={()=>handlePaymentMethods(isChangingMp,setIsChangingMp,mp,setMp)}
              checked={mp ? mp.active : false}
              disabled={isChangingMp}
            />
          </article>
        </>
      )}
      {mp && mp.active && !loading ? (
        <ConfigFormMp
          subTitle_text={t("config.payment market.title")}
          label_text_1={t("config.payment market.input_1")}
          label_text_2={t("config.payment market.input_2")}
          label_text_3={t("config.payment market.input_3")}
          method={method("mercadopago")}
        />
      ) : null}
    </section>
  );
}
