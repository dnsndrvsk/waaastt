import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';

import SaveImage from '../../../../assets/image_saved.png';
import WallpaperSetImage from '../../../../assets/wallpaper_set.png';
import PermissionErrorImage from '../../../../assets/permission_error.png';

import colors from '../../../../styles/colors';
import shadows from '../../../../styles/shadows';

export default class ToastItem extends Component {
  static propTypes = {
    type: PropTypes.string,
    action: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  images = {
    success: {
      type: 'antdesign',
      name: 'checkcircle',
    },
    warning: {
      type: 'entypo',
      name: 'warning',
    },
    error: {
      type: 'antdesign',
      name: 'closecircle',
    },
    info: {
      type: 'antdesign',
      name: 'infocirlce',
    },
  };

  render() {
    const { type, action, onClick } = this.props;
    let image;
    if (action === 'save') image = SaveImage;
    else if (action === 'set') image = WallpaperSetImage;
    else if (action === 'storage') image = PermissionErrorImage;
    else image = SaveImage;

    return (
      <TouchableWithoutFeedback onPress={onClick}>
        <View style={[styles.container, styles[action]]}>
          <Image
            source={image}
            style={[{ width: 120, height: 50 }, action === 'storage' && { width: 160 }]}
            resizeMode="contain"
          />
          <Icon
            name={this.images[type].name}
            type={this.images[type].type}
            size={25}
            iconStyle={styles[type]}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    flex: 1,
    marginBottom: 5,
    borderLeftWidth: 10,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: colors.WHITE,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    opacity: 0.95,
    ...shadows.shadowSmall,
  },
  info: {
    color: colors.BLUE,
  },
  error: {
    color: colors.RED,
  },
  success: {
    color: colors.GREEN,
  },
  warning: {
    color: colors.BLUE,
  },
  save: {
    borderLeftColor: colors.YELLOW,
  },
  set: {
    borderLeftColor: colors.BLUE,
  },
  storage: {
    borderLeftColor: '#444',
  },
  image: {
    width: 100,
  },
});
