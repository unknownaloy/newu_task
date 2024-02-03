import React from "react";
import { FormikProps } from "formik";

import { TodoFormInterface } from "../common/interfaces/TodoFormInterface";

interface IProps extends FormikProps<TodoFormInterface> {}

const NumberInput: React.FC<IProps> = props => {
  return <input className="" type="number" {...props} />;
};

export default NumberInput;
