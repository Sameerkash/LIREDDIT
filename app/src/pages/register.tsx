import React from "react";
import { Formik, Form } from "formik";
import { FormControl, FormLabel, Input } from "@chakra-ui/core";
import { Wrapper } from "../components/Wrapper";

interface registerProps {}

export const Register: React.FC<registerProps> = ({}) => {
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", passwrod: "" }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {(values: { username: string }, handleChange: any) => (
          <Form>
          
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
