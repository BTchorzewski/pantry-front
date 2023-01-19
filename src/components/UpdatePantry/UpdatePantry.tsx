import './UpdatePantry.css';
import { useState } from 'react';
import { ChangePantryNameForm } from '../Forms/ChangePantryNameForm/ChangePantryNameForm';
interface Props {
  pantryId: string;
}
export const UpdatePantry = ({ pantryId }: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleShow = () => {
    setIsVisible((prevState) => !prevState);
  };

  return (
    <>
      {isVisible ? (
        <ChangePantryNameForm pantryId={pantryId} toggleShow={toggleShow} />
      ) : null}
      <button onClick={toggleShow}>Change</button>
    </>
  );
};
