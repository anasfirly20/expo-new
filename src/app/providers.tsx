import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/src/store";

type ProvidersTypes = {
  children: React.ReactNode;
};

const Providers = (props: ProvidersTypes) => {
  const { children } = props;

  return <ReduxProvider store={store}>{children}</ReduxProvider>;
};

Providers.displayName = "Providers";

export default Providers;
