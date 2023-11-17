import React, { useContext } from "react";
import Link from "next/link";
import { Field, Form, Formik } from "formik";
import Card from "@components/shared/Card";
import Logo from "@components/shared/Logo";
import InputField from "@components/shared/InputField";
import Button from "@components/shared/Button";
import useAuth from "@context/AuthContext";
import axiosClient from "@utils/axiosClient";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Spinner from "@components/shared/Spinner";
import { AxiosError, AxiosPromise, AxiosResponse } from "axios";

const Register = () => {
  const router = useRouter();

  const register = async (
    values: { name: string; email: string; password: string },
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    setSubmitting(true);
    try {
      const response = await axiosClient.post(
        "/auth/register",
        JSON.stringify({
          ...values,
        }),
        { headers: { "Content-Type": "application/json" } }
      );
      toast.success(response.data.message || "Success! Redirecting");
      setTimeout(() => router.push("/login"), 1500);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

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
            register(values, setSubmitting);
          }}
        >
          {({ values, isSubmitting }) => (
            <Form autoComplete="off">
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
                  {isSubmitting ? <Spinner /> : "Register"}
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
