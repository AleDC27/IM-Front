/* eslint-disable no-unreachable */
import { useDispatch, useSelector } from "react-redux";
import { getAllPos } from "../../../redux/actions";
import { useEffect, useRef } from "react";
import { useState } from "react";
import s from "./QrCodeGenerator.module.scss";
import ReactToPrint from "react-to-print";
import CryptoJS from "crypto-js";
import QRCode from "qrcode";
import React from "react";
import JSZip from "jszip";
export default function QrGenerator() {
  const commerceId = useSelector((state) => state.user.comerceId);
  const allPos = useSelector((state) => state.allPos);
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedTable, setSelectedTable] = useState("");
  const [number, setNumber] = useState(0);
  const [zip, setZip] = useState();
  const [toPrint, setToPrint] = useState();
  const [names, setNames] = useState([]);
  const [done, setDone] = useState(false);
  // const [loading, setLoading] = useState(true);

  const array = [];
  // const names = [];
  const componentRef = useRef();
  const dispatch = useDispatch();
  const qrProps = {
    width: 300,
    margin: 1,
    color: {
      dark: "#2b2b2b",
      light: "#fefefe",
    },
  };
  const key = import.meta.env.VITE_REACT_APP_KEY;

  //?cifro la url
  const cifrarUrl = (url) => {
    const objetoCifrado = CryptoJS.AES.encrypt(
      ("2/1/5"),
      key
    ).toString();
    console.log(
      "newurlCifrada: ",
      `https://im-front-use-customer.vercel.app/language/${objetoCifrado}`
    );
    return objetoCifrado;
  };

  cifrarUrl()

  //?descifro la url
  const descifrarUrl = (url) => {
    const bytes = CryptoJS.AES.decrypt(
      "U2FsdGVkX18fYSdn8CTSbFIdx8DvWwhLJdE8ymZZ/4o=",
      key
    );
    const objetoOriginal = (bytes.toString(CryptoJS.enc.Utf8));
    console.log("urlOriginal: ", objetoOriginal);
    return objetoOriginal;
  };

  descifrarUrl()

  useEffect(() => {
    dispatch(getAllPos(commerceId));
  }, []);

  useEffect(() => {
    setToPrint(null);
    setNames([]);
    setDone(false);
  }, [selectedSector, selectedTable]);

  useEffect(() => {
    toPrint && generateZip(toPrint);
  }, [done]);

  const addName = (name) => {
    setNames((prevNames) => [...prevNames, name]);
  };

  const handleSectorSelect = (e) => {
    if (e.target.value === "Todos") {
      setSelectedSector(e.target.value);
    } else {
      let sector = allPos.filter((s) => s.name === e.target.value);
      setSelectedSector(sector);
    }
    setSelectedTable('')
  };

  const handleTableSelect = (e) => {
    setSelectedTable(e.target.value);
  };

  const generateZip = async (array) => {
    //? Convierto los elementos de array a tipo Blob
    const promises = array.map(async (s) => {
      const res = await fetch(s);
      const blob = await res.blob();
      return blob;
    });
    //? Genero un array de Blobs
    const result = await Promise.all(promises);
    //? Creo zip con los codigos QR
    const zip = new JSZip();
    result.forEach((blob, index) => {
      // zip.file(`Mesa ${index + 1}.png`, blob);
      zip.file(`${names[index]}.png`, blob);
    });

    const readme = zip.folder("readme");
    readme.file("readme.txt", "Created with JSZip - Powered by I-menu");

    const zipFile = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(zipFile);
    setZip(url);
  };

  //!Tomo la informacion del Qr a generar
  //!Puede generarse uno solo o varios, segun corresponda.
  const generateArray = async () => {
    //? Genero codigos QR segun Sector - Mesa seleccionados
    //? 3 casos a tener en cuenta. Todos-Todos/Todos - 1/1-Todos/1-1
    if (selectedSector === "Todos") {
      if (selectedTable !== "Todos") {
        for (const p of allPos) {
          for (const pos of p.pos) {
            if (pos.id == selectedTable[selectedTable.length - 1]) {
              let name = `Sector ${p.name} - Mesa ${pos.id}`;
              addName(name);
              const r = await QRCode.toDataURL(pos.qrCode, qrProps);
              array.push(r);
            }
          }
        }
      } else {
        for (const p of allPos) {
          for (const pos of p.pos) {
            let name = `Sector ${p.name} - Mesa ${pos.id}`;
            addName(name);
            const r = await QRCode.toDataURL(pos.qrCode, qrProps);
            array.push(r);
          }
        }
      }
    } else if (selectedTable === "Todos") {
      for (const p of selectedSector[0].pos) {
        let name = `Sector ${selectedSector[0].name} - Mesa ${p.id}`;
        addName(name);
        const r = await QRCode.toDataURL(p.qrCode, qrProps);
        array.push(r);
      }
    } else {
      const p = selectedSector[0].pos.find((p) => p.id == selectedTable);
      if (p) {
        let name = `Sector ${selectedSector[0].name} - Mesa ${p.id}`;
        addName(name);
        const url = await QRCode.toDataURL(p.qrCode, qrProps);
        array.push(url);
      }
    }
    setToPrint(array);
    setDone(true);
  };

  //!Prepara los Codigos Qr para imprimir
  const QrToPrintCodes = () => {
    return (
      <div style={{ display: "flex", flexFlow: "row wrap" }}>
        {names.length ? (
          toPrint.map((q, i) => (
            <div key={i} style={{ margin: "5px" }}>
              <img src={q} alt="a Qr code" />
              <h4 style={{ color: "#2b2b2b", textAlign: "center" }}>
                {`${names[i]}`}
              </h4>
            </div>
          ))
        ) : (
          <p>loading...</p>
        )}
      </div>
    );
  };

  //!Componente para mostrar los Codigos Qr para imprimir
  // eslint-disable-next-line react/display-name
  const ComponentToPrint = React.forwardRef((props, ref) => {
    return (
      <div ref={ref}>
        <QrToPrintCodes />
      </div>
    );
  });

  return (
    <div className={s.mainContainer}>
      <h1 className={s.mainTitle}>Generar codigos Qr</h1>
      <div className={s.headerContainer}>
        <div className={s.selectContainer}>
          <label className={s.label}>Seleccionar Sector</label>
          <select
            value={selectedSector ? selectedSector.name : ""}
            onChange={handleSectorSelect}
            className={s.select}
          >
            <option value="" disabled hidden>
              Selecciona una opción
            </option>
            <option value="Todos">Todos los sectores</option>
            {allPos?.map((sector, index) => (
              <option key={index} value={sector.name}>
                {sector.name}
              </option>
            ))}
          </select>
        </div>
        {selectedSector === "Todos" ? (
          <div className={s.selectContainer}>
            <label className={s.label}>Seleccionar Pos</label>
            <select
              value={selectedTable}
              onChange={handleTableSelect}
              className={s.select}
            >
              <option value="" disabled hidden>
                Selecciona una opción
              </option>
              <option value="Todos">Todos los Pos</option>
              {allPos.map((p) =>
                p.pos.map((pos, index) => (
                  <option key={index}>{`${p.name} - ${pos.id}`}</option>
                ))
              )}
            </select>
          </div>
        ) : selectedSector[0]?.pos.length ? (
          <div className={s.selectContainer}>
            <label className={s.label}>Seleccionar Pos</label>
            <select
              value={selectedTable}
              onChange={handleTableSelect}
              className={s.select}
            >
              <option value="" disabled hidden>
                Selecciona una opción
              </option>
              <option value="Todos">Todos los Pos</option>
              {selectedSector[0].pos.map((table, index) => (
                <option key={index} value={table.id}>
                  {table.id}
                </option>
              ))}
            </select>
          </div>
        ) : (
          selectedSector !== "" && <p>No hay mesas asignadas a este sector</p>
        )}
        {
          //* Boton para generar Codigos Qr*//}
        }
        <button
          className={s.generatorButton}
          onClick={() => selectedSector && selectedTable && generateArray()}
        >
          Generar codigo/s
        </button>
      </div>
      {/* {qrCode && <img src={qrCode} />} */}
      <div className={s.buttons}>
        {
          //* Boton para descargar los Codigos Qr *//
        }
        {/* {zip ? ( */}
        <a
          href={zip}
          download="QrCodes.zip"
          className={`${s.downloadButton} ${zip && toPrint && s.visible}`}
        >
          Descargar codigo/s Qr
        </a>
        {/* // ) : null} */}
        {
          //* Boton para imprimir los Codigos Qr *//
        }
        {/* {toPrint ? ( */}
        <ReactToPrint
          trigger={() => (
            <button className={`${s.printButton} ${toPrint && s.visible}`}>
              Imprimir codigo/s
            </button>
          )}
          content={() => componentRef.current}
        />
        {/* ) : null} */}
      </div>
      {toPrint ? <ComponentToPrint ref={componentRef} /> : null}
    </div>
  );
}