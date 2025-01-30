import React, { ReactElement } from "react";
import {
  StyleProp,
  View as ViewReactNative,
  ViewProps,
  ViewStyle,
} from "react-native";

type IProps = StyleProp<ViewStyle> &
  ViewProps & {
    children?: string | React.ReactNode;
    center?: boolean;
    style?: ViewStyle;
    row?: boolean;
    container?: boolean;
  };

export const View = (props: IProps): ReactElement => {
  const { center, children, style, row, container, ...rest } = props;

  const customStyles = {
    alignItems: center ? "center" : rest.alignItems,
    justifyContent: center ? "center" : rest.justifyContent,
    flexDirection: row ? "row" : rest.flexDirection,
    flex: container ? 1 : rest.flex,
  };

  return (
    <ViewReactNative
      testID={rest.testID}
      accessibilityLabel={rest.accessibilityLabel}
      {...rest}
      style={[customStyles, style]}
    >
      {children}
    </ViewReactNative>
  );
};
