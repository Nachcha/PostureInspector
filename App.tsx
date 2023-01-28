/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from "react";
import {
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  NativeModules,
  NativeEventEmitter,
  requireNativeComponent,
} from "react-native";

import { Colors } from "react-native/Libraries/NewAppScreen";
import MyView from "./src/components/native_components/my_view";
// import RCTImageView from './src/components/native_modules/ImageView';

const { CalendarModule } = NativeModules;

const eventEmitter = new NativeEventEmitter(CalendarModule);

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    alignItems: "center",
    justifyContent: "flex-start",
    height: "100%",
    paddingTop: 20,
  };

  useEffect(() => {
    eventEmitter.addListener("EventCount", (eventCount) => {
      console.log("New event count", eventCount);
    });

    return () => {
      eventEmitter.removeAllListeners("EventCount");
    };
  }, []);

  const handleIncrimentButton = () => {
    // CalendarModule.createCalendarEvent("test Name", "test Location");
    // CalendarModule.createCalendarEventCallBack((res: string) => {
    //   console.log("Callback data from Native Method: ",res);
    // });
    createCalendarPromise();
  };

  const createCalendarPromise = async () => {
    try {
      const eventId = await CalendarModule.createCalendarPromise(
        "Party",
        "My House"
      );
      console.log(`Created a new event with id ${eventId}`);
    } catch (e) {
      console.error("native module promise error: ", e);
    }
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {/* <RCTHeatMap borderRadius={30} style={{width: '90%',height: 300, backgroundColor: 'red'}}/> */}
      <View
        style={{
          display: "flex",
          borderWidth: 2,
          width: "100%",
          maxHeight: "40%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MyView />
      </View>
      <Text style={{ fontSize: 20 }}>App Testing</Text>
      <Button title="Increment" onPress={handleIncrimentButton} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
});

export default App;
