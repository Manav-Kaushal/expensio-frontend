import React from "react";
import Link from "next/link";
import { Field, Form, Formik } from "formik";
import useAuth from "@context/AuthContext";
import Card from "@components/shared/Card";
import Logo from "@components/shared/Logo";
import InputField from "@components/shared/InputField";
import Button from "@components/shared/Button";
import { clearAllStorage, setCookie } from "@utils/lib";
import { cookieNames } from "@utils/config";
import axiosClient from "@utils/axiosClient";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Spinner from "@components/shared/Spinner";
import { NextSeo } from "next-seo";

const Login = () => {
  const router = useRouter();
  const { setUser } = useAuth();

  const login = async (
    values: { email: string; password: string },
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    setSubmitting(true);
    try {
      clearAllStorage("token");
      const res = await axiosClient.post(
        "/auth/login",
        JSON.stringify({
          ...values,
        }),
        { headers: { "Content-Type": "application/json" } }
      );
      const { token, userData, message } = res.data;
      setCookie(cookieNames.token, token);
      setUser(userData);
      toast.success(message);
      router.push("/");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <NextSeo title="Login" />
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
            onSubmit={(values, { setSubmitting }) => {
              login(values, setSubmitting);
            }}
          >
            {({ values, isSubmitting }) => (
              <Form>
                <Field as={InputField} name="email" label="Email" required />
                <Field
                  as={InputField}
                  name="password"
                  label="Password"
                  type="password"
                  required
                />
                <div className="text-center">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? <Spinner /> : "Login"}
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
    </>
  );
};

export default Login;
