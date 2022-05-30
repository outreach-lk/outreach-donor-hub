import { Button, ButtonGroup, VisuallyHidden } from "@chakra-ui/react";
import React from "react";
import { OAuthProviders } from "../../../../types/enums/providers";
import { GoogleIcon } from "./ProviderIcons";

const providers = [
  {
    name: OAuthProviders.GOOGLE,
    label: "Google",
    icon: <GoogleIcon boxSize="6" />,
  },
];

export type Props = {
  handlers: {
    name: OAuthProviders;
    handler: React.MouseEventHandler<HTMLButtonElement>;
  }[];
  isLoading?: boolean
};

/** Maps button click handlers passed through props for each button in the providers list. */
const mapProvider2Handler = (
  name: OAuthProviders,
  handlers: Props["handlers"]
) => {
  return handlers.find((h) => h.name === name)
    ?.handler as React.MouseEventHandler<HTMLButtonElement>;
};

export const OAuthButtonGroup = (props: Props) => {
  return (
    <ButtonGroup variant="outline" spacing="4" width="full">
      {providers.map(({ name, label, icon }) => (
        <Button
          onClick={mapProvider2Handler(name, props.handlers)}
          key={name}
          isFullWidth
          isLoading={props.isLoading}
        >
          <VisuallyHidden>Sign in with {label}</VisuallyHidden>
          {icon}
        </Button>
      ))}
    </ButtonGroup>
  );
};
