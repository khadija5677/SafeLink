import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from './Navigation/AppNavigator'
export const Main = () => {

    return(
        <NavigationContainer>
            <AppNavigator />
        </NavigationContainer>
    )
}