/* eslint-disable react/prop-types */
import { useCallback } from "react";
import { ReactComponent as ArrowDownload } from "../../../assets/ArrowDownload.svg";
import { ReactComponent as ArrowUpload } from "../../../assets/ArrowUpload.svg";
import { useDropzone } from "react-dropzone";
import Title from "../../atom/Title/Title";
import s from "./File.module.scss";
//import { uploadFile } from "../../../firebase/firebase.config";
//import { useSelector } from "react-redux";

export default function File({
  typeIcon,
  text,
  setFile,
  setSubmitting,
  step
}) {
  //const comerceId=useSelector(state=>state.user_internal.comerceId);

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    setSubmitting(true);

    let xlfile = acceptedFiles[0];
    // console.log('Nombre de archivo subido: ', xlfile.name);
    let reader = new FileReader();
    if (step !== 3){
      reader.readAsArrayBuffer(xlfile);
    }else {
      // reader.readAsDataURL(xlfile);
      setFile(xlfile);
      return
    }
    reader.onload = (e) => {
    setFile(e.target.result);
  }
  }, []);
  
  const conditionalAccept =
    step !== 3
      ? {
          "application/vnd.ms-excel": [".xls"],
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
            ".xlsx",
          ],
          "application/xml": [".xml"],
        }
      : {
          "image/jpeg": [".jpeg", ".jpg"],
        };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: conditionalAccept,
    maxFiles: 1,
  });

  //const filePath = "/ExcelFile/I-Menu.xlsx";
  const filePath_EN = "/ExcelFile/I-Menu.xlsx";
  const filePath_ES = "/ExcelFile/I-Menu_ES.xlsx";
  const lang=localStorage.getItem('Lang');
  console.log(lang)

  return typeIcon === "download" ? (
    <a className={s.file} href={lang==="es"?filePath_ES:filePath_EN} download={"I-Menu Template.xlsx"}>
      <ArrowDownload className={s.icon} />
      <Title text={text} />
    </a>
  ) : (
    <div {...getRootProps()} className={s.file}>
      <ArrowUpload className={s.icon} />
      <input {...getInputProps()} /* onChange={uploadFile(setFile,comerceId.toString())} */ />
      {isDragActive ? (
        <Title text={"Arroja tu archivo aqui"} bold={true} />
      ) : (
        <Title text={text} bold={true} />
      )}
    </div>
  );
}
