import Title from "../../../../atom/Title/Title";
import { useState, useEffect } from "react";
import Loading from "../../../../atom/loading/Loading";
import MenuStep from "../../../MenuStep/MenuStep";
import { Button } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import { getFileDownloadURL } from "../../../../../firebase/firebase.config";
import { useSelector } from "react-redux";
import ContentRow from "../../../../atom/contentRow/ContentRow";
import InputButton from "../../../../atom/buttons/inputButton/InputButton";
import { ArrowsUpDown } from "../../../../atom/iconsHerocoins/icons";
import Separator from "../../../../atom/separator/Separator";
import { uploadFile } from "../../../../../firebase/firebase.config";
import File from "../../../File/File";

export default function LogoComerce() {
  const [imgURL, setImgURL] = useState(false);
  const [newFile, setNewFile] = useState(null);
  const [t, i18n] = useTranslation("global");
  const comerceId = useSelector((state) => state.user_internal.comerceId);
  const [clickCount, setClickCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // Nuevo estado para controlar la carga

  useEffect(() => {
    // Cuando el componente se monta, obtener la URL de la imagen existente
    const fetchImageURL = async () => {
      const fileName = comerceId.toString(); // Reemplaza con el nombre de tu archivo
      const url = await getFileDownloadURL(fileName);
      setImgURL(url);
    };
    fetchImageURL();
  }, [clickCount]); // El segundo argumento [] asegura que se ejecute solo una vez al montar el componente

  console.log(newFile);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewFile(file);
    }
  };

  const handleReplaceImage = async () => {
    try {
      if (newFile) {
        setImgURL(false);
        setIsLoading(true); // Marca como cargando
        await uploadFile(newFile, comerceId.toString());
        setClickCount((prevCount) => prevCount + 1);
        setNewFile(false)
      } else {
        console.log("No hay nueva imagen para cargar.");
      }
    } catch (error) {
      console.error("Error al cargar la imagen:", error);
      alert("Error al cargar la imagen. Por favor, inténtelo de nuevo.");
    } finally {
      setIsLoading(false); // Marca como no cargando, independientemente del resultado
    }
  };

  return (
    <section>
      <ContentRow justifyContent="center" width="80%">
      {isLoading && <Loading />} {/* Mostrar Loading mientras se espera respuesta */}
        {!isLoading && !imgURL && <Title text={"Sin logo disponible"} />} {/* Mostrar Title si no hay imagen */}
        {!isLoading && imgURL && (
          <img
            src={imgURL}
            style={{ maxWidth: "50%", border: "2px solid #000" }}
            alt="Logo"
          />
        )}
      </ContentRow>
      <Separator height="20px" />
      <InputButton
        onChange={handleImageUpload}
        icon="arrowsUpDown"
        text={t("menu.logo local.replace image")}
        width="80%"
      />
      <Separator height="20px" />
      {newFile && (
        <ContentRow
          width="100%"
          justifyContent="space-around"
          alignItems="center"
        >
          <img
            src={URL.createObjectURL(newFile)}
            alt="foto"
            style={{ maxWidth: "40%", border: "2px solid #000" }}
          />
          <Button
            secondary
            text={"enviar"}
            onClick={handleReplaceImage}
            size="big"
            loading={isLoading}
          >
            Enviar
          </Button>
        </ContentRow>
      )}
    </section>
  );
}
