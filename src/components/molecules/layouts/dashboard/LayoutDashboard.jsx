import s from "./layoutDashboard.module.scss";
import Card from "../../card/Card.jsx";
import { useSelector } from "react-redux/es/hooks/useSelector";
import SubTitleUnderline from "../../../atom/subTitleUnderline/SubTitleUnderline";
import { useEffect, useState } from "react";
import axios from "axios";
import { getDateCurrent } from "../../../../utils/functions";
import { useTranslation } from "react-i18next";

export default function LayoutDashboard({ closed }) {
  const [t, i18n] = useTranslation("global");
  const comerceId = useSelector((state) => state.user_internal.comerceId);
  const [allOrders, setAllOrders] = useState([]); // Almacenamos todas las ordenes
  const dateCurrent = getDateCurrent(); //fecha actual
  const [cardStatusChanged, setCardStatusChanged] = useState(false); //reques al cambiar de status la card

  // Función para manejar cambios de estado en las tarjetas
  const handleCardStatusChange = (newStatus, orderId) => {
    // Actualiza el estado para indicar que hubo cambios en las tarjetas
    setCardStatusChanged(true);
  };
  console.log(allOrders);
  const renderOrdesCards = (status) => {
    const statusOrder = statusTables(status);
    return (
      statusOrder.length > 0 &&
      statusOrder.map((cur, idx) => (
        <Card
          key={idx}
          tableNumber={cur.po && cur.po.id}
          sectorNumber={cur.sector && cur.sector.id}
          order={cur.order}
          hour={cur.hour}
          status={cur.status}
          delivery={cur.delivery}
          total={cur.paid}
          //
          onStatusChange={(newStatus, orderId) => {
            handleCardStatusChange(newStatus, orderId);
          }}
          //news
          accountemail={cur.account}
          accountname={cur.name}
          googleemail={cur.googleEmail}
          //tomamos menu , product y detail de cada orden
          //si llegara a ser un {[""]}
          //menu={cur.menu && cur.menu.name[0].length > 0 && cur.menu}
          //products={cur.products && cur.products.name[0].length > 0 && cur.products}
          //dishes={cur.dishes && cur.dishes.name[0].length > 0 && cur.dishes}
          //additionals={cur.additionals &&cur.additionals.name[0].length > 0 &&cur.additionals}
          menu={
            typeof cur.menu === "string"
              ? JSON.parse(cur.menu).name &&
                JSON.parse(cur.menu).name[0].length > 0 &&
                JSON.parse(cur.menu)
              : cur.menu &&
                cur.menu.name &&
                cur.menu.name[0].length > 0 &&
                cur.menu
          }
          products={
            typeof cur.products === "string"
              ? JSON.parse(cur.products).name &&
                JSON.parse(cur.products).name[0].length > 0 &&
                JSON.parse(cur.products)
              : cur.products &&
                cur.products.name &&
                cur.products.name[0].length > 0 &&
                cur.products
          }
          dishes={
            typeof cur.dishes === "string"
              ? JSON.parse(cur.dishes).name &&
                JSON.parse(cur.dishes).name[0].length > 0 &&
                JSON.parse(cur.dishes)
              : cur.dishes &&
                cur.dishes.name &&
                cur.dishes.name[0].length > 0 &&
                cur.dishes
          }
          additionals={
            typeof cur.additionals === "string"
              ? JSON.parse(cur.additionals).name &&
                JSON.parse(cur.additionals).name[0].length > 0 &&
                JSON.parse(cur.additionals)
              : cur.additionals &&
                cur.additionals.name &&
                cur.additionals.name[0].length > 0 &&
                cur.additionals
          }
        />
      ))
    );
  };

  //?
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(
          `order/paidOrderes/${comerceId}?startDate=${dateCurrent}&endDate=${dateCurrent}`
        );
        const data = response.data;
        setAllOrders(data);
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      }
    };
    if (cardStatusChanged) {
      fetchData();
      // Restablece el estado de cardStatusChanged a false
      setCardStatusChanged(false);
    }
    fetchData(); // Realiza la solicitud inicial
    const intervalId = setInterval(fetchData, 20000);
    // Limpia el intervalo si el componente se desmonta
    return () => clearInterval(intervalId);
  }, [cardStatusChanged]);

  const statusTables = (status) => {
    return allOrders.filter((cur) => cur.status === status);
  };
  return (
    <div className={s.content_LayoutDashboard}>
      <div
        className={`${s.status_orders} ${closed && s.status_orders_closed} `}
      >
        <SubTitleUnderline
          content={t("dashboard.new")}
          color={"#4B47FF"}
          number={statusTables("orderPlaced").length}
          status={"#orderPlaced"}
        />
        <SubTitleUnderline
          content={t("dashboard.preparing")}
          color={"#FF4A4A"}
          number={statusTables("orderInPreparation").length}
          status={"#orderInPreparation"}
        />
        <SubTitleUnderline
          content={t("dashboard.ready")}
          color={"#40CB5F"}
          number={statusTables("orderReady").length}
          status={"#orderReady"}
        />
      </div>
      <div className={s.content_orders}>
        <section className={s.content_status_orders} id="orderPlaced">
          {renderOrdesCards("orderPlaced")}
        </section>
        <section className={s.content_status_orders} id="orderInPreparation">
          {renderOrdesCards("orderInPreparation")}
        </section>
        <section className={s.content_status_orders} id="orderReady">
          {renderOrdesCards("orderReady")}
        </section>
      </div>
    </div>
  );
}
