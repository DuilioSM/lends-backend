import { Provider } from "react-redux";
import { store } from "./store";
import { StripeProvider } from "@stripe/stripe-react-native";
import RootNavigation from "./navigation/RootNavigation";

export default function App() {
  return (
    <Provider store={store}>
      <StripeProvider
        publishableKey="pk_test_51M0R05KwAWaCzg2GvgUIIZOCksgA1ZNqBDGvSy8lBZirEXji3vNxdxkYmSsCjhHWwNdHdi67O3i7ayDDdFBQz5Ec00UurgqM39"
        merchantIdentifier="merchant.com"
      >
        <RootNavigation />
      </StripeProvider>

    </Provider>
  );
}
