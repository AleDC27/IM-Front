import { useState } from "react";
import { useTranslation } from "react-i18next";
import PaymentMethods from "../../sections/config/PaymentMethods/PaymentMethods";
import PersonalData from "../../sections/config/personalData/PersonalData";
import ComerceData from "../../sections/config/comerceData/ComerceData";
import LargeButton from "../../../atom/LargeButton/LargeButton";
import LogoComerce from "../../sections/config/logoComerce/LogoComerce";
import s from "./layoutConfig.module.scss";
import CartelPlanUno from "../../CartelPlanUno/CartelPlanUno";
import CartelPlanDos from "../../cartelPlan2/CartelPlanDos";
import Separator from "../../../atom/separator/Separator";
import { useSelector } from "react-redux";

export default function LayoutConfig() {
  const [t, i18n] = useTranslation("global");
  const personalData = t("config.select.personal data");
  const businessData = t("config.select.business data");
  const paymentData = t("config.select.payment methods");
  const localLogo = t("menu.local logo");
  const [selectedOption, setSelectedOption] = useState(personalData);
  const commercialPlan = useSelector(
    (state) => state.user_internal.commercialPlan
  );
  console.log(commercialPlan);

  const optionToComponent = {
    [t("config.select.personal data")]: <PersonalData />,
    [t("config.select.business data")]: <ComerceData />,
    [t("config.select.payment methods")]: <PaymentMethods />,
    [t("menu.local logo")]: <LogoComerce />,
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className={s.containerd}>
      <section>
        <LargeButton
          text={personalData}
          icon={"arrowRight"}
          onClick={() => handleOptionClick(personalData)}
          selected={selectedOption === personalData}
          disabled
        />
        <LargeButton
          text={businessData}
          icon={"arrowRight"}
          onClick={() => handleOptionClick(businessData)}
          selected={selectedOption === businessData}
          disabled
        />
        <LargeButton
          text={paymentData}
          icon={"arrowRight"}
          onClick={() => handleOptionClick(paymentData)}
          selected={selectedOption === paymentData}
        />
        <LargeButton
          text={localLogo}
          icon={"arrowRight"}
          /* disabled={true} */
          onClick={() => handleOptionClick(localLogo)}
          selected={selectedOption === localLogo}
        />
        <CartelPlanUno
          title={t("plan 1.cartel plan 1.title")}
          text_1={"Podras configurar para cobrar a traves de mercado pago"}
          width={"90%"}
        />
        <Separator height={"10px"} />
        {commercialPlan === 1 ? (
          <CartelPlanDos title={t("plan 2.Change to plan 2")} width={"90%"} />
        ) : null}
      </section>
      {optionToComponent[selectedOption]}
    </div>
  );
}
