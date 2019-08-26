import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import colors from '../../styles/colors';

RoundIcon.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  iconStyle: PropTypes.object,
  onPress: PropTypes.func,
  containerStyle: PropTypes.object,
};

export default function RoundIcon({ type, name, size, color, iconStyle, onPress, containerStyle }) {
  return (
    <TouchableOpacity onPress={onPress ? onPress : () => {}}>
      <View style={[styles.container, containerStyle && containerStyle]}>
        <View style={styles.circle} />
        <Icon
          size={size}
          name={name}
          type={type}
          color={color}
          iconStyle={[styles.icon, iconStyle && iconStyle]}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    borderRadius: 50,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    backgroundColor: colors.WHITE,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  icon: {
    zIndex: 10,
  },
});
