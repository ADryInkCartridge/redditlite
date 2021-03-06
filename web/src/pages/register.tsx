import React from "react";
import { Form, Formik } from "formik";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { Box, Button } from "@chakra-ui/react";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { NavBar } from "../components/NavBar";

interface registerProps {}

export const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  return (
    <div>
      <NavBar />
      <Wrapper variant="sm">
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={async (value, { setErrors }) => {
            console.log(value);
            const response = await register(value);
            if (response.data?.register.errors) {
              setErrors(toErrorMap(response.data.register.errors));
            }
            if (response.data?.register.user) {
              router.push("/");
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
    </div>
  );
};

export default Register;
