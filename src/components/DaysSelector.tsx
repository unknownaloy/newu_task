import { Field, FieldProps } from 'formik';
import React from "react";
import Select from "react-select";
import { TodoFormInterface } from '../common/interfaces/TodoFormInterface';
import { IDailyOption } from '../common/interfaces/IDailyOption';


const dailyOptions: IDailyOption[] = [
  { label: "Monday", value: "monday" },
  { label: "Tuesday", value: "tuesday" },
  { label: "Wednesday", value: "wednesday" },
  { label: "Thursday", value: "thursday" },
  { label: "Friday", value: "friday" },
  { label: "Saturday", value: "saturday" },
  { label: "Sunday", value: "sunday" },
];

const DaysSelector = () => {
  return (
    <Field name="daysPerWeek">
      {({ field, form, meta } : FieldProps<IDailyOption>) => (
        <Select
          {...field}
          isMulti
          id="daysPerWeek"
          onChange={values => form.setFieldValue("daysPerWeek", values)}
          options={dailyOptions}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      )}
    </Field>
  );
};

export default DaysSelector;
