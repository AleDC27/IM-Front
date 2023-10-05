import { ReactComponent as XIcon } from "../../../assets/XIcon.svg";
import { useEffect, useState } from "react";
import SubmitLoader from "../../atom/SubmitLoader/SubmitLoader";
import InstructionContainer from "../../atom/InstructionContainer/InstructionContainer";
import LineText from "../../atom/LineText/LineText";
import UploadMenuTitle from "../../atom/UploadMenuTitle/UploadMenuTitle";
import File from "../../molecules/File/File";
import InstructionButton from "../../molecules/InstructionButton/InstructionButton";
import MenuStep from "../../molecules/MenuStep/MenuStep";
import * as XLSX from "xlsx";
import s from "./InstructionTwo.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { postMenu } from "../../../redux/actions";

export default function InstructionTwo() {
  const [file, setFile] = useState(null);
  const [menu, setMenu] = useState(null);
  const [comercio, setComercio] = useState(null);
  const [submiting, setSubmiting] = useState(false);
  const id = useSelector((state)=> state.user.comerceId)
  const dispatch = useDispatch();

  useEffect(() => {
    if (file !== null) {
      setSubmiting(false);
      const workbook = XLSX.read(file, { type: "buffer" });
      const worksheetName1 = workbook.SheetNames[0];
      const worksheetName2 = workbook.SheetNames[1];
      const worksheet = workbook.Sheets[worksheetName1];
      const worksheet2 = workbook.Sheets[worksheetName2];
      const data = XLSX.utils.sheet_to_json(worksheet);
      const data2 = XLSX.utils.sheet_to_json(worksheet2);
      setMenu(data);
      setComercio(data2);
    }
  }, [file]);

  function emojiToUnicode(emoji) {
    const codeUnits = [];
    for (let i = 0; i < emoji.length; i++) {
      codeUnits.push(emoji.charCodeAt(i).toString(16).toUpperCase());
    }
    return `U+${codeUnits.join(" U+")}`;
  }

  const formattedMenu = ()=> {
    let objAditionals = { additional: null };
    let objProducts = { product: null };
    let objDishes = { dishes: null };
    let date = new Date().toISOString().substring(0, 10);
    let objDate = { date: date }
    setMenu(
      menu.map((m) => {
        if (m.Precio === undefined) m.Precio = null;
        m.Emoji = emojiToUnicode(m.Emoji);
        m["photo"] = m["Emoji"];
        m["category"] = m["Nombre de la categoria"];
        m["name"] = m["Nombre de productos"];
        m["cost"] = m["Precio"];
        m["description"] = m["descripcion"];
        m["discount"] = m["descuento"];
        m["promotion"] = m["promocion"];
        m["surcharge"] = m["recargo"];
        m["menuType"] = m["Tipo de menu"];
        m["validity"] = m["validez"];
        delete m["Emoji"];
        delete m["Nombre de la categoria"];
        delete m["Nombre de productos"];
        delete m["Precio"];
        delete m["descripcion"];
        delete m["descuento"];
        delete m["promocion"];
        delete m["recargo"];
        delete m["Tipo de menu"];
        delete m["validez"];
        Object.assign(m, objAditionals);
        Object.assign(m, objProducts);
        Object.assign(m, objDishes);
        Object.assign(m,objDate);
      })
    );
  }

  const clearMenu = () => {
    setFile(null);
    setMenu(null);
  };

  const handleClick = () => {
    formattedMenu();
    //dispatch(postMenu(JSON.stringify(menu), id));
    dispatch(postMenu(menu, id));
    console.log(menu)
    clearMenu();
  };
  
  
  return (
    <InstructionContainer>
      <main className={s.mainContainer}>
        <div className={s.textContainer}>
          <UploadMenuTitle text={"Empecemos con tu menú"} />
          <LineText
            text={"Intenta cumplir con los pasos antes de empezar a operar"}
            centered={true}
            bold={true}
          />
          <MenuStep
            number={2}
            text={"Sube  tu menú una vez que hayas guardado tus productos"}
          />
          <>
            {submiting ? (
              <SubmitLoader />
            ) : (
              <File
                step={2}
                typeIcon={"upload"}
                text={"Subir menú"}
                file={file}
                setFile={setFile}
                menu={menu}
                setMenu={setMenu}
                submitting={submiting}
                setSubmitting={setSubmiting}
              />
            )}
            {menu !== null && (
              <div className={s.uploadedFile}>
                <LineText text={"Menu.XML"} secundary={true} />
                <div className={s.icons}>
                  <XIcon
                    style={{ height: "24px", width: "24px" }}
                    onClick={clearMenu}
                  />
                </div>
              </div>
            )}
          </>
        </div>
        <InstructionButton
          helpText={"Necesito ayuda"}
          text={"Continuar"}
          path={menu && "/instructions/image"}
          handleClick={handleClick}
        />
      </main>
    </InstructionContainer>
  );
}
