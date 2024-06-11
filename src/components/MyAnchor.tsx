import {Anchor, AnchorProps, createPolymorphicComponent, Group} from "@mantine/core";
import {forwardRef} from "react";

interface IconAnchorProps extends AnchorProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

export const MyAnchor = createPolymorphicComponent<'a', IconAnchorProps>(
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLAnchorElement, IconAnchorProps>(({leftIcon, rightIcon, children, ...others}, ref) => (
    <Anchor ref={ref} {...others}>
      <Group component={"span"} align={"center"} gap={0}>
        {leftIcon}
        {children}
        {rightIcon}
      </Group>
    </Anchor>
  ))
);

MyAnchor.displayName = "IconAnchor";