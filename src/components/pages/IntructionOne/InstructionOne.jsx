import LineText from "../../atom/LineText/LineText";
import UploadMenuTitle from "../../atom/UploadMenuTitle/UploadMenuTitle";
import File from "../../molecules/File/File";
import MenuStep from "../../molecules/MenuStep/MenuStep";
import s from "./InstructionOne.module.scss";
import InstructionButton from "../../molecules/InstructionButton/InstructionButton";
import InstructionContainer from "../../atom/InstructionContainer/InstructionContainer";
import { useTranslation } from "react-i18next";
import Container from "../../atom/container/Container";
import { useSelector } from "react-redux";

export default function InstructionOne() {
  const [t,i18n]=useTranslation("global");
  const id = useSelector((state) => state.user_internal);
  console.log(id)

  return (
    <Container marginTop >
    <InstructionContainer>
      <main className={s.mainContainer}>
        <div className={s.textContainer}>
          <UploadMenuTitle text={t("instructions.title")} />
          <LineText
            text={t("instructions.sub title")}
            centered={true}
            bold={true}
          />
          <MenuStep number={1} text={t("instructions.steps.step_1")} />
          <File
            step={1}
            typeIcon={"download"}
            text={t("instructions.steps.text_1")}
          />
        </div>
        <InstructionButton
          //helpText={t("instructions.button.i need help")}
          text={t("instructions.button.continue")}
          path={"/instructions/uploadMenu"}
        />
      </main>
    </InstructionContainer>
    </Container>
  );
}
