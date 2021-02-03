import React from "react";
import { Form, Formik } from "formik";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { Box, Button } from "@chakra-ui/react";
import { useMutation } from "urql";
import { useRegisterMutation } from "../generated/graphql";

interface registerProps {}

export const Register: React.FC<registerProps> = ({}) => {
  const [, register] = useRegisterMutation();
  return (
    <Wrapper variant="sm">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (value, { setErrors }) => {
          console.log(value);
          const response = await register(value);
          if (response.data?.register.errors) {
            setErrors({
              username: "Please",
            });
          }
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
