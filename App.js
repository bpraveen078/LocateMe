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
  Dimensions,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Geolocation from '@react-native-community/geolocation';
import MapView, {PROVIDER_GOOGLE, Polyline} from 'react-native-maps';

const {width, height} = Dimensions.get('window');
const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;
const LATTITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATTITUDE_DELTA * ASPECT_RATIO;
const GOOGLE_MAPS_APIKEY = 'AIzaSyCpEfZlDu19vdwe0JGlxZmEHpAU-X_BMw4';
const App: () => React$Node = () => {
  const initialPosition = {
    latitude: 0,
    longitude: 0,
    longitudeDelta: 0,
    latitudeDelta: 0,
  };
  const markerPosition = {
    latitude: 0,
    longitude: 0,
  };

  const [getLocation, setLocation] = useState('');
  const [getPosition, setPosition] = useState(initialPosition);
  const [getMarkPosition, setMarkPosition] = useState(markerPosition);
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
          Geolocation.getCurrentPosition((postion) => {
            console.log(postion);
            const lat = parseFloat(postion.coords.latitude);
            const long = parseFloat(postion.coords.longitude);
            const region = {
              latitude: lat,
              longitude: long,
              latitudeDelta: LATTITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            };
            setPosition(region);
            setMarkPosition(region);
            setLocation(postion);
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
            <View style={styles.container}>
              <MapView style={styles.map} region={getPosition}>
                <MapView.Marker coordinate={getMarkPosition} />
              </MapView>
            </View>
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
    height: 1000,
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
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
});

export default App;
