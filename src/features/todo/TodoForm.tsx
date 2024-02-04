import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, FieldProps, Form, Formik } from "formik";
import { addDays } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

import { addTodoSchema } from "./addTodoSchema";
import { TodoFormInterface } from "../../common/interfaces/TodoFormInterface";
import NumberInput from "../../components/NumberInput";
import DaysSelector from "../../components/DaysSelector";
import { useAuth } from "../authentication/authContext";
import { saveTodoInDatabase } from "./services/todoService";
import { IToDoData } from "../../common/interfaces/ITodoData";
import { todoDocumentReference, todoDocumentReferenceId } from "./todoRefs";

const initialValues: TodoFormInterface = {
  title: "",
  trackingType: "",
  daysPerWeek: [],
  timesPerWeek: "",
  startDate: null,
};

const TodoForm: React.FC = () => {
  const { userId } = useAuth();

  const handleSubmit = async (values: TodoFormInterface) => {
    console.log("TodoForm - handleSubmit -- ", values);

    try {
      let todoData: IToDoData | undefined;

      const todoDocRef = todoDocumentReference(userId);

      if (values.trackingType === "daily") {
        // Extracting all the selected days. Values cannot be null at this point
        const selectedDays = values.daysPerWeek!.map(option => option.value);

        todoData = {
          id: todoDocRef.id,
          title: values.title,
          trackingType: values.trackingType,
          daysPerWeek: selectedDays,
          timesPerWeek: null,
        };
      } else if (values.trackingType === "weekly") {
        todoData = {
          id: todoDocRef.id,
          title: values.title,
          trackingType: values.trackingType,
          daysPerWeek: [],
          timesPerWeek: Number(values.timesPerWeek) ?? 1,
        };
      }

      // Ensure that todoData is defined before calling saveTodoInDatabase
      if (todoData !== undefined) {

        await saveTodoInDatabase(todoData, todoDocRef);
      }
    } catch (err) {
      console.log(err);
    }
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
        resetForm,
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
            <DaysSelector name="daysPerWeek" />
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
