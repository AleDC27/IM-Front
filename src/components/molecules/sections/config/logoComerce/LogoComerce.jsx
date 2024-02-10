// import Title from "../../../../atom/Title/Title";
// import { useState, useEffect } from "react";
// import Loading from "../../../../atom/loading/Loading";
// import MenuStep from "../../../MenuStep/MenuStep";
// import { Button } from "semantic-ui-react";
// import { useTranslation } from "react-i18next";
// import { getFileDownloadURL } from "../../../../../firebase/firebase.config";
// import { useSelector } from "react-redux";
// import ContentRow from "../../../../atom/contentRow/ContentRow";
// import InputButton from "../../../../atom/buttons/inputButton/InputButton";
// import { ArrowsUpDown } from "../../../../atom/iconsHerocoins/icons";
// import Separator from "../../../../atom/separator/Separator";
// import { uploadFile } from "../../../../../firebase/firebase.config";
// import File from "../../../File/File";

// export default function LogoComerce() {
//   const [imgURL, setImgURL] = useState(false);
//   const [newFile, setNewFile] = useState(null);
//   const [t, i18n] = useTranslation("global");
//   const comerceId = useSelector((state) => state.user_internal.comerceId);
//   const [clickCount, setClickCount] = useState(0);
//   const [isLoading, setIsLoading] = useState(false); // Nuevo estado para controlar la carga

//   useEffect(() => {
//     // Cuando el componente se monta, obtener la URL de la imagen existente
//     const fetchImageURL = async () => {
//       const fileName = comerceId.toString(); // Reemplaza con el nombre de tu archivo
//       const url = await getFileDownloadURL(fileName);
//       setImgURL(url);
//     };
//     fetchImageURL();
//   }, [clickCount]); // El segundo argumento [] asegura que se ejecute solo una vez al montar el componente

//   console.log(newFile);

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setNewFile(file);
//     }
//   };

//   const handleReplaceImage = async () => {
//     try {
//       if (newFile) {
//         setImgURL(false);
//         setIsLoading(true); // Marca como cargando
//         await uploadFile(newFile, comerceId.toString());
//         setClickCount((prevCount) => prevCount + 1);
//         setNewFile(false)
//       } else {
//         console.log("No hay nueva imagen para cargar.");
//       }
//     } catch (error) {
//       console.error("Error al cargar la imagen:", error);
//       alert("Error al cargar la imagen. Por favor, inténtelo de nuevo.");
//     } finally {
//       setIsLoading(false); // Marca como no cargando, independientemente del resultado
//     }
//   };
//   console.log(imgURL);
//   return (
//     <section>
//       <ContentRow justifyContent="center" width="80%">
//       {isLoading && <Loading />} {/* Mostrar Loading mientras se espera respuesta */}
//         {!isLoading && !imgURL && <Title text={"Sin logo disponible"} />}
//         {!isLoading && imgURL && (
//           <img
//             src={imgURL}
//             style={{ maxWidth: "50%", border: "2px solid #000" }}
//             alt="Logo"
//           />
//         )}
//       </ContentRow>
//       <Separator height="20px" />
//       <InputButton
//         onChange={handleImageUpload}
//         icon="arrowsUpDown"
//         text={t("menu.logo local.replace image")}
//         width="80%"
//       />
//       <Separator height="20px" />
//       {newFile && (
//         <ContentRow
//           width="100%"
//           justifyContent="space-around"
//           alignItems="center"
//         >
//           <img
//             src={URL.createObjectURL(newFile)}
//             alt="foto"
//             style={{ maxWidth: "40%", border: "2px solid #000" }}
//           />
//           <Button
//             secondary
//             text={t("button.update")}
//             onClick={handleReplaceImage}
//             size="big"
//             loading={isLoading}
//           >
//             {t("button.update")}
//           </Button>
//         </ContentRow>
//       )}
//     </section>
//   );
// }

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
//import {ReactComponent as Logo} from '../../../../../assets/logorojo.jpeg'

export default function LogoComerce() {
  const [imgURL, setImgURL] = useState(false);
  const [newFile, setNewFile] = useState(null);
  const [t, i18n] = useTranslation("global");
  const comerceId = useSelector((state) => state.user_internal.comerceId);
  const [clickCount, setClickCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
const fileName=comerceId.toString();

useEffect(() => {
  const fetchImageURL = async () => {
    try {
      //const response = await fetch(`https://tenkiweb.com/imenu/comercios/logos/Balcarce.JPG`)
      const response = await fetch(`https://tenkiweb.com/imenu/comercios/logos/${fileName}.jpg`)
      console.log(response)
      //const response = await fetch(`https://imgs.search.brave.com/cZ947Hi0LNN-JGmFs0pHq3SByr6vmw75zN3JV25P_Mo/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2Y3LzQw/L2UyL2Y3NDBlMmE5/ZmM5YWJlNjIzMzQ2/MDhiN2RkMDMyMzRh/LmpwZw`);
      if (response.ok) {
        // Si la respuesta es exitosa, establece imgURL con la URL de la imagen
        setImgURL(`https://tenkiweb.com/imenu/comercios/logos/${fileName}.jpg`);
      } else {
        // Si la respuesta no es exitosa, establece imgURL en false
        setImgURL(false);
        console.error('Error al obtener la URL de la imagen. Estado:', response.status);
      }
    } catch (error) {
      // Maneja cualquier error de red u otros errores estableciendo imgURL en false
      setImgURL(false);
      console.error("Error al obtener la URL de la imagen:", error);
    }
  };

  // Llama a la función fetchImageURL
  fetchImageURL();
}, [clickCount]); // Un array de dependencias vacío para asegurarse de que se ejecute solo una vez cuando el componente se monta



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
        setIsLoading(true);
  
        // Use the commerceId as the file name
        const fileName = comerceId.toString();
        const formData = new FormData();
        formData.append('archivo', newFile, fileName); // Append the file with the desired file name
  
        // Upload the image using fetch
        await fetch('https://tenkiweb.com/imenu/comercios/logos', {
          method:'POST',
          body: formData,
        });
  
        // Update click count and reset newFile
        setClickCount((prevCount) => prevCount + 1);
        setNewFile(false);
      } else {
        console.log("No hay nueva imagen para cargar.");
      }
    } catch (error) {
      console.error("Error al cargar la imagen:", error);
      alert("Error al cargar la imagen. Por favor, inténtelo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };
  

  console.log(imgURL);

  return (
    <section>
      <ContentRow justifyContent="center" width="80%">
        {isLoading && <Loading />}
        {!isLoading && !imgURL && <Title text={"Sin logo disponible"} />}
        {!isLoading && imgURL && (
          <img
            src={imgURL}
            //src={""}
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
            text={t("button.update")}
            onClick={handleReplaceImage}
            size="big"
            loading={isLoading}
          >
            {t("button.update")}
          </Button>
        </ContentRow>
      )}
    </section>
  );
}
