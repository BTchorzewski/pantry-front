import './AddProduct.css';
import { useToggle } from '../../hooks/useToggle';
import { CreateProductForm } from '../Forms/CreateProductForm/CreateProductForm';

interface Props {
  pantryId: string;
}
export const AddProduct = ({ pantryId }: Props) => {
  const [toggle, switchToggle] = useToggle(false);
  return (
    <>
      {toggle ? (
        <CreateProductForm pantryId={pantryId} hideForm={switchToggle} />
      ) : null}
      <button
        onClick={(event) => {
          switchToggle();
        }}
      >
        Add item
      </button>
    </>
  );
};
