import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ForgetPassword = () => {
  const [submitted, setSubmitted] = useState(false);

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // Simulate an API call
    setTimeout(() => {
      console.log("Password reset email sent to:", values.email);
      setSubmitted(true);
      setSubmitting(false);
      resetForm();
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>

      {submitted && (
        <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
          A password reset link has been sent to your email.
        </div>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="email" className="block mb-2 font-semibold">
              Email Address
            </label>
            <Field
              type="email"
              name="email"
              className="w-full p-2 mb-2 border rounded"
              placeholder="Enter your email"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm mb-2"
            />

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Reset Link"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ForgetPassword;
