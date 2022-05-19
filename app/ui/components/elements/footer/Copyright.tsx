import { Text, TextProps } from "@chakra-ui/react";
import * as React from "react";
import { getConfig } from "../../../../config";

export const Copyright = (props: TextProps) => (
  <Text fontSize="sm" {...props}>
    {/* TODO: find an appropriate copyright message */}
    &copy; {new Date().getFullYear()} Outreach {getConfig().title}, Outreach.lk.
  </Text>
);
