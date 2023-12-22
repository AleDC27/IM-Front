import ContentColumn from "../../atom/contentColumn/ContentColumn";
import Title from "../../atom/Title/Title";

export default function CartelPlanDos({ width, height, margin, title }) {
  const handleClick = () => {
    console.log("okokok");
  };
  return (
    <ContentColumn
      onClick={handleClick}
      background={"rgb(149, 218, 149)"}
      height={height}
      width={width}
      alignItems={"center"}
      margin={margin}
      marginBottom={"5px"}
      boxShadow={"0px 15px 15px -15px #989898"}
      justifyContent={"center"}
    >
      <Title
        icon={"LockClosed"}
        textAlign="start"
        color={"#000"}
        marginLeft={"10px"}
        padding={"0"}
        bold
        text={title}
      />
    </ContentColumn>
  );
}
