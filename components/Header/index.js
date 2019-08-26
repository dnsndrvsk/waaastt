import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

// import logo from '../../assets/logo.png';

export default class Header extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.iinerContainer}>
          {/* <Image source={logo} style={styles.logo} resizeMode="contain" /> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    height: 34,
  },
  iinerContainer: {
    position: 'relative',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
  },
  image: {
    position: 'absolute',
    right: -28,
    top: -10,
    width: 54,
    height: 54,
  },
});
