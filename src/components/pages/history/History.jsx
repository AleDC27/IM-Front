import Header from "../../molecules/Header/Header";
import Container from "../../atom/container/Container";
import LayoutContainer from "../../molecules/layouts/section/LayoutContainer";
import LayoutHistory from "../../molecules/layouts/history/LayoutHistory";
import { useTranslation } from "react-i18next";
import CartelPlanUno from "../../molecules/CartelPlanUno/CartelPlanUno";
import { useSelector } from "react-redux";
import ContentColumn from "../../atom/contentColumn/ContentColumn";
import ContentRow from "../../atom/contentRow/ContentRow";
import Separator from "../../atom/separator/Separator";
import { HistoryIcon } from "../../atom/iconsHerocoins/icons";
import HugeTitle from "../../atom/HugeTitle/HugeTitle";

export default function History() {
  const [t,i18n]=useTranslation("global")
  const planNumber = useSelector((state) => state.user_internal.commercialPlan);

  return (
    <Container>
      <Header
        icon="history"
        title={t("header.history.text")}
        detail={t("header.history.detail")}
      />
      {planNumber===1?
              <LayoutContainer padding={"0 2rem"}>
              <ContentColumn
                width={"100%"}
                height={"75vh"}
                alignItems={"start"}
                justifyContent={"start"}
              >
                <CartelPlanUno
                  width={"610px"}
                  height="140px"
                  title={t("plan 1.cartel plan 1.title")}
                  text_1={t("plan 1.cartel plan 1.history_1")}
                  text_2={t("plan 1.cartel plan 1.history_2")}
                  margin={"auto"}
                  marginBooton="10px"
                />
                <ContentRow
                  width={"100%"}
                  justifyContent={"center"}
                >
                  <ContentColumn>
                  <HistoryIcon heigth={"250px"} color={"#BABABA"} stroke={0.5}/>
                  <HugeTitle text={t("plan 1.history.text_1")} color={"#BABABA"} fontWeight="regular" fontSize={"40px"} />
                  <HugeTitle  text={t("plan 1.history.text_2")} color={"#BABABA"} fontWeight="regular" fontSize={"40px"} />
                  </ContentColumn>
                </ContentRow>
              </ContentColumn>
            </LayoutContainer>
      :
      <LayoutContainer>
        <LayoutHistory />
      </LayoutContainer>
      }
    </Container>
  );
}
