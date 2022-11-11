import AuthStack from "./AuthStack";
import NoAuthStack from "./NoAuthStack";
import { useSelector } from "react-redux";
import { getToken } from "../features/authSlice";
import { NavigationContainer } from "@react-navigation/native";

const RootNavigation = () => {
  const userToken = useSelector(getToken);

  return (
    <NavigationContainer>
      {userToken === null ? <NoAuthStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootNavigation;
