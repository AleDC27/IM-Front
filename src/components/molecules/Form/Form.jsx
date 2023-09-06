import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { loginSchema } from "../../../utils/yup";
import FormButton from "../../atom/FormButton/FormButton";
import FormError from "../../atom/FormError/FormError";
import FormHr from "../../atom/FormHr/FormHr";
import FormInput from "../../atom/FormInput/FormInput";
import FormLabel from "../../atom/FormLabel/FormLabel";
import FormLink from "../../atom/FormLink/FormLink";
import s from "./Form.module.scss";
import { loginAction } from "../../../redux/actions";
import { useDispatch,useSelector } from "react-redux";
import { useState } from "react";

export default function Form() {
  const [t, i18n] = useTranslation(["global"]);
  const [passwordIconrrect,setPasswordIncorrect]=useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onTouched",
  });

  const { errors, isDirty, isSubmitting } = formState;

  const onSubmit = async (data, event) => {
    event.preventDefault();
    try {
      const response = await dispatch(loginAction(data));
      if (response.payload.status === 200 ) {
        console.log("éxito");
        setPasswordIncorrect(false)
        navigate('/welcome')
      } else {
        console.log("error");
      }
    } catch (error) {
      setPasswordIncorrect(true)
      console.log("error", error);
    }
  };
  

  return (
    <form className={s.loginForm} onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormLabel htmlFor={"email"} text={t("internal.auth.email")} />
      <FormInput
        type={"email"}
        id={"email"}
        name={"email"}
        placeholder={"burgerstore@gmail.com"}
        register={register}
      />
      <FormError error={errors.email} text={"Ingrese un email valido"} />
      <FormLabel htmlFor={"loginPassword"} text={t("internal.auth.password")} />
      <FormInput
        type={"password"}
        id={"loginPassword"}
        name={"password"}
        placeholder={"********"}
        register={register}
      />
      <FormError
        error={errors.password}
        text={"la contraseña debe tener entre 4 y 8 caracteres"}
      />
      {passwordIconrrect?<FormError error={passwordIconrrect} text={"email o contraceña incorrecta"} />:null}
      <FormButton
        type="submit"
        disabled={!isDirty || isSubmitting}
        text={t("internal.auth.login")}
      />
      <FormLink path={""} text={t("internal.auth.forgot")} />
      <FormHr className={s.hr} />
      <FormLink path={"/register"} text={t("internal.auth.register")} />
    </form>
  );
}
