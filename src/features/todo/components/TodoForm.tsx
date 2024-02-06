import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";

import DaysSelector from "../../../shared/DaysSelector";
import NumberInput from "../../../shared/NumberInput";

import { TodoFormInterface } from "../../../common/interfaces/TodoFormInterface";
import { ITodoData } from "../../../common/interfaces/ITodoData";
import { addTodoSchema } from "../addTodoSchema";
import {
  arrangeDaysOfWeek,
  capitalizeFirstLetter,
} from "../../../utils/todoHelper";
import { useAppDispatch } from "../../../app/hooks";
import { addTodo, updateATodo } from "../store/todoSlice";

type TodoFormProp = {
  todo?: ITodoData;
};

const TodoForm = ({ todo }: TodoFormProp) => {
  // Defines the initial form values for the todo form.
  //
  // If the todo is not null, then an edit is being carried out, so the todo values are used
  // as the initial values
  let initialValues: TodoFormInterface = {
    title: todo?.title ?? "",
    trackingType: todo?.trackingType ?? "",
    daysPerWeek:
      todo?.daysPerWeek?.map(day => ({
        label: capitalizeFirstLetter(day),
        value: day,
      })) ?? null,
    timesPerWeek: todo?.timesPerWeek?.toString() ?? "",
  };

  const handleResetForm = () => {
    initialValues = {
      title: "",
      trackingType: "",
      daysPerWeek: null,
      timesPerWeek: "",
    };
  };

  const dispatch = useAppDispatch();

  const handleSubmit = async (
    values: TodoFormInterface,
    { resetForm }: FormikHelpers<TodoFormInterface>
  ) => {
    try {
      let todoData: ITodoData | undefined;

      if (values.trackingType === "daily") {
        // Extracting all the selected days. Values cannot be null at this point
        let selectedDays = values.daysPerWeek!.map(option => option.value);

        selectedDays = arrangeDaysOfWeek(selectedDays);

        todoData = {
          id: todo?.id,
          title: values.title,
          trackingType: values.trackingType,
          daysPerWeek: selectedDays,
          timesPerWeek: null,
          streak: todo?.streak ?? 0,
          longestStreak: todo?.longestStreak ?? 0,
          lastStreak: null,
        };
      } else if (values.trackingType === "weekly") {
        todoData = {
          id: todo?.id,
          title: values.title,
          trackingType: values.trackingType,
          daysPerWeek: [],
          // timesPerWeek: Number(values.timesPerWeek) ?? 1,
          timesPerWeek:
            Number(values.timesPerWeek) || Number(values.timesPerWeek) === 0
              ? Number(values.timesPerWeek)
              : 1,
          streak: 0,
          longestStreak: 0,
          lastStreak: todo?.lastStreak ?? new Date().getTime(),
        };
      }

      // Ensure that todoData is defined before calling saveTodoInDatabase
      if (todoData != undefined) {
        if (todo == null) {
          // Dispatch method to create a new todo
          dispatch(addTodo(todoData));
          resetForm();
        } else {
          // Update todo
          dispatch(updateATodo(todoData));
          handleResetForm();
        }
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
