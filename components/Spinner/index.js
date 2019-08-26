import React from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';

import SpinnerImage from '../../assets/spinner_icon.png';

export default class Spinner extends React.Component {
  spinValue = new Animated.Value(0);

  componentDidMount() {
    Animated.loop(
      Animated.timing(this.spinValue, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }

  render() {
    const { containerStyle, imageStyle } = this.props;
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    return (
      <View style={[styles.container, containerStyle && containerStyle]}>
        <Animated.Image
          style={[{ transform: [{ rotate: spin }] }, styles.image, imageStyle && imageStyle]}
          source={SpinnerImage}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  image: {
    width: 50,
    height: 50,
  },
});
