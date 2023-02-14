import React from "react";
import Link from "next/link";
import { Field, Form, Formik } from "formik";
import useAuth from "@utils/context/AuthContext";
import Card from "@components/shared/Card";
import Logo from "@components/shared/Logo";
import InputField from "@components/shared/InputField";
import Button from "@components/shared/Button";

const Login = () => {
  const { login, isAuthenticating } = useAuth();

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <Card sx="w-[350px] mx-auto px-4 rounded-lg">
        <div className="py-4 text-center">
          <Logo className="aspect-[2/1] w-32" variant="black" center />
        </div>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={async (values) => {
            login(values.email, values.password);
          }}
        >
          {({ values }) => (
            <Form>
              <Field as={InputField} name="email" label="Email" />
              <Field
                as={InputField}
                name="password"
                label="Password"
                type="password"
              />
              <div className="text-center">
                <Button
                  type="submit"
                  disabled={
                    isAuthenticating || !values.email || !values.password
                  }
                >
                  Login
                </Button>
                <p className="py-2 text-sm">
                  Already have an account?{" "}
                  <Link
                    href={"/register"}
                    className="text-blue-500 hover:underline"
                  >
                    Register
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

export default Login;
