import { Box } from "@chakra-ui/react";
import React from "react";

interface WrapperProps {
    variant?: "sm" | "reg";
}

export const Wrapper: React.FC<WrapperProps> = ({
    children,
    variant = "reg",
}) => {
    return (
        <Box mt={8} mx="auto" maxW={variant === "reg" ? "800px" : "400px"}>
            {children}
        </Box>
    );
};
