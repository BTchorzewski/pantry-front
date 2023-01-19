import { useState } from 'react';

export const useToggle = (param: boolean): [boolean, () => void] => {
  const [toggle, setToggle] = useState(param);
  const switchToggle = () => {
    setToggle((prevState) => !prevState);
  };
  return [toggle, switchToggle];
};
