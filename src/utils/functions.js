import ConfigForm from "../components/molecules/configForm/ConfigForm";

export const getDateCurrent=()=>{
  const date = new Date();
  let month = date.getMonth() + 1;
  let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  let dateCurrent = `${date.getFullYear()}-${month}-${day}`;
  return dateCurrent
}

export const getLastMonday = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Diferencia de días para llegar al lunes
  const lastMonday = new Date(today);
  lastMonday.setDate(today.getDate() - diff);
  
  const year = lastMonday.getFullYear();
  const month = String(lastMonday.getMonth() + 1).padStart(2, '0');
  const day = String(lastMonday.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}

export const roundToTwoDecimalPlaces=(number)=> {
  if (Number.isFinite(number) && !Number.isInteger(number)) {
    return number.toFixed(2);
  }
  return number;
}