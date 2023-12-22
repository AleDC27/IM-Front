import React from "react";
import s from "./configForm.module.scss";
import SubTitle from "../../atom/subTitle/SubTitle";
import LabelInput from "../../atom/labelInput/LabelInput";
import { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import Separator from "../../atom/separator/Separator";
import axios from "axios";
import CryptoJS from "crypto-js";
import jwtDecode from "jwt-decode";

export default function ConfigFormMp({
  subTitle_text,
  label_text_1,
  label_text_2,
  label_text_3,
  //comerceId,
  method,
}) {
  console.log(method)
  const idMethod = method.id;
  
  const [mp, setmp] = useState({
    publicKey: method.publicKey || "",
    accesToken: method.accesToken|| "",
    alias: method.alias || "",
  });
  console.log(mp);
  const handleInputChangePassword = (e) => {
    setmp({ ...mp, [e.target.name]: e.target.value });
  };

/*   const hashValue = (value) => {
    // Utilizar SHA-256 para hashear los valores
    return CryptoJS.SHA256(value).toString(CryptoJS.enc.Hex);
  }; */

  //const publicKey=jwtDecode(method.publicKey) || "nada";
  //console.log(publicKey)
  //const token=jwtDecode(method.accesToken);
  //const token=method.token;
  //console.log(token)
  //const alias=jwtDecode(method.alias);
  //console.log(publicKey,token,alias);

  
  const HandleUpDateMp = async () => {
    try {
/*       const hashedMp = {
        publicKey: hashValue(mp.publicKey),
        accesToken: hashValue(mp.accesToken),
        alias: hashValue(mp.alias),
      }; */
      //console.log(hashedMp);
      const result = await axios.put(`payment/update/${idMethod}`, mp);
      console.log("enviado");
      console.log("Datos enviados correctamente:", result.data);
    } catch (error) {
      console.log(error);
    }
  };
  
console.log(mp)
  return (
    <section>
      <SubTitle text={subTitle_text} />
      <>
        <LabelInput
          text={label_text_1}
          placeholder={"Complete los campos"}
          type="password"
          name="accesToken"
          value={mp.accesToken}
          onChange={handleInputChangePassword}
        />
        <LabelInput
          text={label_text_2}
          placeholder={"Complete los campos"}
          type="password"
          name="publicKey"
          value={mp.publicKey}
          onChange={handleInputChangePassword}
        />
{        <LabelInput
          text={label_text_3}
          placeholder={"Complete los campos"}
          type="password"
          name="alias"
          value={mp.alias}
          onChange={handleInputChangePassword}
        />}
      </>
      <Separator height={"10px"} />
      <Button primary type="submit" onClick={HandleUpDateMp}>
        Guardar
      </Button>
    </section>
  );
}
