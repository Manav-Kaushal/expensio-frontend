import { GlobalContext } from "@utils/context/GlobalState";
import { Formik, Field, Form } from "formik";
import { useContext, useState } from "react";

export const AddTransaction = () => {
  const { addTransaction } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (transaction: { text: string; amount: string }) => {
    setLoading(true);
    const newTransaction = {
      text: transaction.text,
      amount: +transaction.amount,
    };
    addTransaction!(newTransaction);
    setLoading(false);
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
          onSubmit={(values, { resetForm }) => {
            handleSubmit(values);
            resetForm();
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
                  placeholder="Text"
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="flex items-center justify-center px-3 py-2 ml-auto text-sm font-medium leading-4 text-white transition-all duration-200 ease-in-out rounded-md shadow-sm max-w-fit bg-black/80 hover:bg-black focus:outline-none disabled:bg-gray-500"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Adding..." : "Add Transaction"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
