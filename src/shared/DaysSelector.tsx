import { Field, FieldProps } from "formik";
import Select from "react-select";

import { IDailyOption } from "../common/interfaces/IDailyOption";

type DaysSelectorProp = {
  name: string;
  label?: string;
};

const dailyOptions: IDailyOption[] = [
  { label: "Monday", value: "monday" },
  { label: "Tuesday", value: "tuesday" },
  { label: "Wednesday", value: "wednesday" },
  { label: "Thursday", value: "thursday" },
  { label: "Friday", value: "friday" },
  { label: "Saturday", value: "saturday" },
  { label: "Sunday", value: "sunday" },
];

const DaysSelector = ({ name, label = "Days per week" }: DaysSelectorProp) => {
  return (
    <Field name={name}>
      {({ field, form, meta }: FieldProps<IDailyOption>) => (
        <div className="flex flex-col gap-[2px]">
          <label className="mt-[16px]" htmlFor={name}>
            {label}
          </label>
          <Select
            {...field}
            isMulti
            id={name}
            onChange={values => form.setFieldValue(name, values)}
            options={dailyOptions}
            className="basic-multi-select"
            classNamePrefix="select"
          />
          {meta.touched && meta.error && (
            <div className="text-red-500">{meta.error}</div>
          )}
        </div>
      )}
    </Field>
  );
};

export default DaysSelector;
