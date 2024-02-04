import React from "react";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";

import DaysSelector from "../../components/DaysSelector";
import NumberInput from "../../components/NumberInput";
import { addTodoSchema } from "./addTodoSchema";
import { TodoFormInterface } from "../../common/interfaces/TodoFormInterface";
import { useAuth } from "../authentication/authContext";
import { saveTodoInDatabase } from "./services/todoService";
import { IToDoData } from "../../common/interfaces/ITodoData";
import { todoDocumentReference } from "./todoRefs";

const initialValues: TodoFormInterface = {
  title: "",
  trackingType: "",
  daysPerWeek: null,
  timesPerWeek: "",
  startDate: null,
};

const TodoForm: React.FC = () => {
  const { userId } = useAuth();

  const handleSubmit = async (
    values: TodoFormInterface,
    { resetForm }: FormikHelpers<TodoFormInterface>
  ) => {
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
          streak: 0,
        };
      } else if (values.trackingType === "weekly") {
        todoData = {
          id: todoDocRef.id,
          title: values.title,
          trackingType: values.trackingType,
          daysPerWeek: [],
          timesPerWeek: Number(values.timesPerWeek) ?? 1,
          streak: 0,
        };
      }

      // Ensure that todoData is defined before calling saveTodoInDatabase
      if (todoData !== undefined) {
        await saveTodoInDatabase(todoData, todoDocRef);

        resetForm();
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
      {({ isSubmitting, values }) => (
        <Form className="flex flex-col">
          {/* Title */}
          <label htmlFor="title">Title</label>
          <Field
            className="rounded-[4px] border-accent border-[1px] p-2"
            name="title"
            placeholder="Enter todo title"
          />
          <ErrorMessage
            name="title"
            className="text-red-500 text-[14px]"
            component="span"
          />

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

          <ErrorMessage
            name="trackingType"
            className="text-red-500 text-[14px]"
            component="span"
          />

          {values.trackingType === "daily" && (
            <DaysSelector name="daysPerWeek" />
          )}
          {values.trackingType === "weekly" && (
            <>
              <label className="mt-[16px]" htmlFor="timesPerWeek">
                Times per week
              </label>
              <Field
                className="rounded-[4px] border-accent border-[1px] p-2"
                as={NumberInput}
                name="timesPerWeek"
              />
              <ErrorMessage
                name="timesPerWeek"
                className="text-red-500 text-[14px]"
                component="span"
              />
            </>
          )}

          <button
            disabled={isSubmitting}
            className="mt-[16px] bg-accent p-[8px] text-white rounded-[4px] flex justify-center items-center"
            type="submit"
          >
            {isSubmitting ? (
              <svg
                className="mr-3 h-6 w-6 animate-spin rounded-full border-l-4 border-white"
                viewBox="0 0 24 24"
              ></svg>
            ) : (
              "Submit"
            )}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default TodoForm;
