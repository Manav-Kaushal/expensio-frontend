import React, { useContext } from "react";
import Link from "next/link";
import { Field, Form, Formik } from "formik";
import Logo from "@components/Logo";
import { GlobalContext } from "@context/GlobalState";
import InputField from "@components/InputField";
import Card from "@components/Card";
import Button from "@components/Button";

const Register = () => {
  const { registerUser } = useContext(GlobalContext);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <Card sx="w-[350px] mx-auto px-4">
        <div className="py-4 text-center">
          <Logo className="aspect-[2/1] w-32" variant="black" center />
        </div>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
          onSubmit={(values, { setSubmitting }) => {
            registerUser(values, setSubmitting);
          }}
        >
          {({ values, isSubmitting }) => (
            <Form>
              <Field as={InputField} name="name" label="Name" />
              <Field as={InputField} name="email" label="Email" />
              <Field
                as={InputField}
                name="password"
                label="Password"
                type="password"
              />
              <div className="text-center">
                <Button type="submit" disabled={isSubmitting}>
                  Register
                </Button>
                <p className="py-2 text-sm">
                  Already have an account?{" "}
                  <Link
                    href={"/login"}
                    className="text-blue-500 hover:underline"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default Register;
