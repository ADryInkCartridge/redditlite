import React from "react";
import { Form, Formik } from "formik";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { Box, Button } from "@chakra-ui/react";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { useLoginMutation } from "../generated/graphql";
import { NavBar } from "../components/NavBar";

interface LoginProps {}

export const Login: React.FC<LoginProps> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  return (
    <div>
      <NavBar />
      <Wrapper variant="sm">
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={async (value, { setErrors }) => {
            const response = await login({ options: value });
            if (response.data?.login.errors) {
              setErrors(toErrorMap(response.data.login.errors));
            }
            if (response.data?.login.user) {
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
                  loadingText="Logging you in"
                >
                  Login
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </div>
  );
};

export default Login;
