import InstructionContainer from '../../atom/InstructionContainer/InstructionContainer';
import LineText from '../../atom/LineText/LineText';
import UploadMenuTitle from '../../atom/UploadMenuTitle/UploadMenuTitle';
import InstructionButton from '../InstructionButton/InstructionButton';
import MenuStep from '../MenuStep/MenuStep';
import s from './MenuInstructionsBase.module.scss';
import { useTranslation } from 'react-i18next';

export default function MenuInstructionsBase() {
  const [t,i18n]=useTranslation("global");
  return (
    <InstructionContainer>
      <main className={s.mainContainer}>
        <div className={s.textContainer}>
          <UploadMenuTitle text={t("instructions.title")} />
          <LineText
            text={t("instructions.sub title")}
            centered={true}
            bold={true}
          />
          <MenuStep light={true} number={1} text={t("instructions.steps.step_1")} />
          <MenuStep light={true}
            number={2}
            text={t("instructions.steps.step_2")}
          />
          <MenuStep light={true} number={3} text={t("instructions.steps.step_3")} />
          <MenuStep light={true} number={4} text={t("instructions.steps.step_4")} />
        </div>
        <InstructionButton
          //helpText={t("instructions.button.i need help")}
          text={t("instructions.button.continue")}
          path={"/instructions/download"}
        />
      </main>
    </InstructionContainer>
  );
}
