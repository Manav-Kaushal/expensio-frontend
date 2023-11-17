import Button from "@components/shared/Button";
import { GlobalContext } from "@context/GlobalState";
import { Formik, Field, Form, FormikState } from "formik";
import { useContext, useState } from "react";

export const AddTransaction = () => {
  const { addTransaction } = useContext(GlobalContext);

  const handleSubmit = (
    transaction: { text: string; amount: string },
    setSubmitting: (isSubmitting: boolean) => void,
    resetForm: (
      nextState?:
        | Partial<
            FormikState<{
              text: string;
              amount: string;
            }>
          >
        | undefined
    ) => void
  ) => {
    setSubmitting(true);
    const newTransaction = {
      text: transaction.text,
      amount: +transaction.amount,
    };
    addTransaction!(newTransaction);
    resetForm();
    setSubmitting(false);
  };

  return (
    <div className="space-y-3">
      <h4 className="text-lg font-semibold border-b border-gray-400">
        New Transaction
      </h4>
      <div>
        <Formik
          initialValues={{
            text: "",
            amount: "",
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            handleSubmit(values, setSubmitting, resetForm);
          }}
        >
          {({ isSubmitting }) => (
            <Form
              className="w-full p-4 space-y-3 text-lg border rounded-md shadow-md"
              autoComplete="off"
            >
              <div>
                <label
                  htmlFor="text"
                  className="block text-base font-medium text-gray-700 sr-only"
                >
                  Text
                </label>
                <Field
                  id="text"
                  name="text"
                  placeholder="Transaction message"
                  className="block w-full p-2 mt-1 duration-200 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm focus:outline-none focus:ring-1"
                />
              </div>
              <div>
                <label
                  htmlFor="amount"
                  className="block text-base font-medium text-gray-700 sr-only"
                >
                  Amount&nbsp;
                  <span>(negative - expense, positive - income)</span>
                </label>
                <Field
                  type="number"
                  id="amount"
                  name="amount"
                  placeholder="Amount (- expense, + income)"
                  className="block w-full p-2 mt-1 duration-200 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm focus:outline-none focus:ring-1"
                />
              </div>
              <div>
                <Button
                  size="sm"
                  variant="black"
                  type="submit"
                  position="right"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Adding..." : "Add Transaction"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
