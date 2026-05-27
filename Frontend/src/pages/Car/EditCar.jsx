import { useParams } from "react-router-dom";

export default function EditCar() {
  const { id } = useParams();
  return <div>edit car {id}</div>;
}