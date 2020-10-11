/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Alert,
  PermissionsAndroid,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Geolocation from '@react-native-community/geolocation';

const App: () => React$Node = () => {
  const [getLocation, setLocation] = useState('');
  useEffect(() => {
    try {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location permission',
          message: 'test',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      ).then((granted) => {
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the Location');
          const locationConfig = {
            skipPermissionRequests: false,
            authorizationLevel: 'whenInUse',
          };
          debugger;
          Geolocation.setRNConfiguration(locationConfig);
          Geolocation.getCurrentPosition((info) => {
            console.log(info);
            setLocation(info);
          });
        } else {
          console.log('Location permission denied');
          Alert('Location permission denied');
        }
      });
    } catch (err) {
      console.warn(err);
    }
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          {/* <Header /> */}

          <View style={styles.body}>
            <Text>Locate Me</Text>
            <Text>{getLocation && JSON.stringify(getLocation)}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
