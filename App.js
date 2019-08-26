import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { StyleSheet, View, NetInfo } from 'react-native';
import { Provider } from 'react-redux';
import { offlineActionTypes } from 'react-native-offline';
import firebase from 'react-native-firebase';

import configureStore from './store/configureStore';

import Tabs from './screens/Tabs';

import StatusBar from './components/StatusBar';
import Header from './components/Header';
import BusyOverlay from './components/BusyOverlay';
import Toast from './components/Toast';
import Banner from './components/ads/Banner';
import Interstitial from './components/ads/Interstitial';

import RateUs from './components/offers/RateUs';

import config from './config';

import colors from './styles/colors';

const store = configureStore();

export default class App extends React.Component {
  componentDidMount() {
    console.disableYellowBox = true;
    this.initFirebase();
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
  }

  componentWillUnmount = () => {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
  };

  handleConnectionChange = isConnected => {
    store.store.dispatch({
      type: offlineActionTypes.CONNECTION_CHANGE,
      payload: isConnected,
    });
  };

  initFirebase() {
    const firebaseConfig = { ...config.firebase };
    // check if there is an instance of running app with use of firebase.apps
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  render() {
    return (
      <Provider store={store.store}>
        <PersistGate loading={null} persistor={store.persistor}>
          <View style={styles.container}>
            <StatusBar />
            {/* <Header /> */}
            <Tabs />
            <Banner size="SMART_BANNER" unitId="" />
            <Interstitial />
            <BusyOverlay />
            <Toast />
            <RateUs />
          </View>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});
