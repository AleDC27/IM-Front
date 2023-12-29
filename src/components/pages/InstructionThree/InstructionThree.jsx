import { useState } from "react";
import { ReactComponent as XIcon } from "../../../assets/xIcon.svg";
import InstructionContainer from "../../atom/InstructionContainer/InstructionContainer";
import UploadMenuTitle from "../../atom/UploadMenuTitle/UploadMenuTitle";
import LineText from "../../atom/LineText/LineText";
import MenuStep from "../../molecules/MenuStep/MenuStep";
import File from "../../molecules/File/File";
import InstructionButton from "../../molecules/InstructionButton/InstructionButton";
import s from "./InstructionThree.module.scss";
import { useTranslation } from "react-i18next";
import Container from "../../atom/container/Container";
import { useSelector } from "react-redux";
import { uploadFile } from "../../../firebase/firebase.config";

export default function InstructionThree() {
  const [t,i18n]=useTranslation("global");
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [submiting, setSubmiting] = useState(false);
  const comerceId=useSelector(state=>state.user_internal.comerceId);
  const idCommerceNew=useSelector(state=>state.idCommerceNew);
  console.log(idCommerceNew)
  const clearImage = () => {
    setFile(null);
    setImage(null);
  };


  const handleClick=async ()=>{
    try {
      //throw new Error('Fallo interbo intente mas tarde')
      if(comerceId){
        console.log("tiene id")
        const result=await uploadFile(file,comerceId.toString())
        console.log(result)
      }else{
        console.log("no tiene id")
        const result=await uploadFile(file,idCommerceNew.toString())
        console.log(result)
      }
    } catch (error) {
      console.log(error)
      console.log("error en la imagen")
      alert(error)
    }
  }
  //console.log(redirectToNextPage)
  return (
    <Container marginTop>
    <InstructionContainer>
      <main className={s.mainContainer}>
        <div className={s.textContainer}>
          <UploadMenuTitle text={t("instructions.title")} />
          <LineText
            text={t("instructions.sub title")}
            centered={true}
            bold={true}
          />
          <MenuStep
            number={3}
            text={
              `${t("instructions.steps.text_3")} \n${t("instructions.steps.text_3_1")} \n ${t("instructions.steps.text_3_2")}\n ${t("instructions.steps.text_3_3")} \n ${t("instructions.steps.text_3_4")}`
            }
          />
          <>
            <File
              step={3}
              typeIcon={"upload"}
              text={t("instructions.steps.text_3_5")}
              file={file}
              setFile={setFile}
              menu={image}
              setMenu={setImage}
              submitting={submiting}
              setSubmitting={setSubmiting}
            />
            {file !== null && (
              <div className={s.uploadedFile}>
                {/* <LineText text={"Logo.JPG"} secundary={true} /> */}
                <img src={URL.createObjectURL(file)} alt="" height={"90px"} />
                <div className={s.icons}>
                  <XIcon
                    style={{ height: "24px", width: "24px" }}
                    onClick={clearImage}
                  />
                </div>
              </div>
            )}
          </>
        </div>
        <InstructionButton
          helpText={t("instructions.button.i need help")}
          text={t("instructions.button.continue")}
          path={"/instructions/onDemand"}
          //path={"/instructions/onDemand"}
          handleClick={() => handleClick(file)}
        />
      </main>
    </InstructionContainer>
    </Container>
  );
};