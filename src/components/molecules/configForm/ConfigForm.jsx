import React from "react";
import s from "./configForm.module.scss";
import SubTitle from "../../atom/subTitle/SubTitle";
import LabelInput from "../../atom/labelInput/LabelInput";
import { useState } from "react";
import { Button } from "semantic-ui-react";
import Separator from "../../atom/separator/Separator";
import axios from "axios";
import CryptoJS from "crypto-js";
import { useTranslation } from "react-i18next";

export default function ConfigFormMp({
  subTitle_text,
  label_text_1,
  label_text_2,
  label_text_3,
  method,
}) {
  console.log(method);
  const idMethod = method.id;
  const keysecret0 = "esta clave deveria venir por bodi";
  const [isLoading,setLoading]=useState(false)
  const [t, i18n] = useTranslation("global");
  const decrypt = (ciphertext) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, keysecret0);
    const originalValue = bytes.toString(CryptoJS.enc.Utf8);
    return originalValue;
  };

  const [mp, setmp] = useState({
    publicKey: method.publicKey ? decrypt(method.publicKey) : "",
    accesToken: method.accesToken ? decrypt(method.accesToken) : "",
    alias: method.alias ? decrypt(method.alias) : "",
    commerceId: method.commerceId,
  });
  console.log(mp);

  const handleInputChangePassword = (e) => {
    setmp({ ...mp, [e.target.name]: e.target.value });
  };

  const encrypt = (value) => {
    const ciphertext = CryptoJS.AES.encrypt(value, keysecret0).toString();
    return ciphertext;
  };

  const HandleUpDateMp = async () => {
    setLoading(true)
    try {
      const hashedMp = {
        publicKey: encrypt(mp.publicKey),
        accesToken: encrypt(mp.accesToken),
        alias: encrypt(mp.alias),
        commerceId: method.commerceId,
      };

      console.log(hashedMp);
      const result = await axios.put(
        `payment/updateKeys/${idMethod}`,
        hashedMp
      );
      console.log("enviado");
      console.log("Datos enviados correctamente:", result.data);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  };

  console.log(mp);
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
        {
          <LabelInput
            text={label_text_3}
            placeholder={"Complete los campos"}
            type="password"
            name="alias"
            value={mp.alias}
            onChange={handleInputChangePassword}
          />
        }
      </>
      <Separator height={"10px"} />
      <Button primary type="submit" onClick={HandleUpDateMp} loading={isLoading}>
        {t("button.update")}
      </Button>
    </section>
  );
}
