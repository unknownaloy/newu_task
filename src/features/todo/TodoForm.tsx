import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { MultiSelect } from "react-multi-select-component";
import { addDays } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

import { addTodoSchema } from "./addTodoSchema";
import { TodoFormInterface } from "../../common/interfaces/TodoFormInterface";
import NumberInput from "../../components/NumberInput";
import Select, { components } from "react-select";
import DaysSelector from "../../components/DaysSelector";

interface DailyOption {
  label: string;
  value: string;
}

const initialValues: TodoFormInterface = {
  title: "",
  trackingType: "",
  daysPerWeek: [],
  timesPerWeek: null,
  startDate: null,
};

const TodoForm: React.FC = () => {
  const dailyOptions: DailyOption[] = [
    { label: "Monday", value: "monday" },
    { label: "Tuesday", value: "tuesday" },
    { label: "Wednesday", value: "wednesday" },
    { label: "Thursday", value: "thursday" },
    { label: "Friday", value: "friday" },
    { label: "Saturday", value: "saturday" },
    { label: "Sunday", value: "sunday" },
  ];

  const handleSubmit = async (values: TodoFormInterface) => {
    console.log("TodoForm - handleSubmit -- ", values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={addTodoSchema}
      onSubmit={handleSubmit}
    >
      {({
        handleChange,
        isSubmitting,
        values,
        errors,
        touched,
        setFieldTouched,
        setFieldValue,
        setValues,
      }) => (
        <Form className="flex flex-col">
          {/* Title */}
          <label htmlFor="title">Title</label>
          <Field
            className="rounded-[4px] border-accent border-[1px] p-2"
            name="title"
            placeholder="Enter todo title"
          />
          <ErrorMessage name="title" />

          {/* Tracking type */}
          <label className="mt-[16px]" htmlFor="trackingType">
            Tracking type
          </label>
          <Field
            className="rounded-[4px] border-accent border-[1px] p-2"
            as="select"
            name="trackingType"
          >
            <option value="" disabled>
              Select type
            </option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </Field>
          <ErrorMessage name="trackingType" />

          {values.trackingType === "daily" && (
            <>
              {/* <MultiSelect
                className="mt-[16px]"
                options={dailyOptions}
                value={[]}
                onChange={() => console.log("Hello friend")}
                labelledBy="Select"
              /> */}

              <DaysSelector />

              {/* <Select
                isMulti={true}
                value={values.daysPerWeek}
                onBlur={() => {
                  // setFieldTouched("daysPerWeek", true, false);
                  setFieldTouched("daysPerWeek", true);
                }}
                // onFocus={() => {
                //   setFieldTouched("daysPerWeek", true, false);
                // }}
                onChange={(array) => {
                  console.log("array - ", array);
                  console.log("values - ", values);
                  console.log("errors - ", errors);
                  setFieldValue("daysPerWeek", array);
                }}
                options={dailyOptions}
              />
              <ErrorMessage name="daysPerWeek" /> */}
            </>
          )}
          {values.trackingType === "weekly" && (
            <>
              <label className="mt-[16px]" htmlFor="trackingType">
                Times per week
              </label>
              <Field
                className="rounded-[4px] border-accent border-[1px] p-2"
                as={NumberInput}
                name="timesPerWeek"
              />
              <ErrorMessage name="timesPerWeek" />
            </>
          )}

          <button className="mt-[16px]" type="submit">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default TodoForm;