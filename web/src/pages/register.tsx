import React from "react";
import { Form, Formik } from "formik";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { Box, Button } from "@chakra-ui/react";
import { useMutation } from "urql";

interface registerProps {}
const REG_MUT = `mutation Register($username: String!, $password:String!) {
  register(options: {username:$username,password:$password}) {
    errors{
      field
      message
    }
    user {
      id
      username
    }
  }
}`;

export const Register: React.FC<registerProps> = ({}) => {
  const [, register] = useMutation(REG_MUT);
  return (
    <Wrapper variant="sm">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(value) => {
          console.log(value);
          return register(value);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="username" label="Username" />
            <Box mt={4}>
              <InputField name="password" label="Password" type="password" />
            </Box>
            <Box mt={4}>
              <Button
                colorScheme="teal"
                variant="solid"
                type="submit"
                isLoading={isSubmitting}
                loadingText="Loading"
              >
                Register
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
