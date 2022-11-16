import React from 'react';
import { ActivityIndicator } from 'react-native';
import { returnLoadingScrn } from '../loader/Loading';

interface WithAddTodoBtnInSafeLinearPrpos {
  loading: boolean;
}
/**
 * <P extends object>(Component: React.ComponentType<P>)
 * Here we are using a generic;
 * P represents the props of the component that is passed into the HOC.
 * React.ComponentType<P> is an alias for React.FunctionComponent<P> | React.ClassComponent<P>,
 * meaning the component that is passed into the HOC can be
 * either a function component or class component.
 *
 *
 * Generics
 * https://www.typescriptlang.org/docs/handbook/2/generics.html
 */
const withClassAddTodoBtnInSafeLinear = <P extends object>(
  Component: React.ComponentType<P>
) =>
  // eslint-disable-next-line react/prefer-stateless-function
  class WithAddTodoBtnInSafeLinear extends React.Component<
    P & WithAddTodoBtnInSafeLinearPrpos
  > {
    // eslint-disable-next-line react/require-render-return
    render() {
      const { loading, ...props } = this.props;
      return loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Component {...(props as P)} />
      );
    }
  };

const withFCAddTodoBtnInSafeLinear = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P & WithAddTodoBtnInSafeLinearPrpos> =>
  function ({ loading, ...props }: WithAddTodoBtnInSafeLinearPrpos) {
    return loading ? (
      <ActivityIndicator size="large" />
    ) : (
      <Component {...(props as P)} />
    );
  };
