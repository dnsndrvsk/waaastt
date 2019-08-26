import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Rate, { AndroidMarket } from 'react-native-rate';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Icon } from 'react-native-elements';

import { removeRateScreen, temporaryHideRateScreen } from '../../../actions/misc';

import PleaseRateUsImage from '../../../assets/rate/please_rate_us.png';
import RateImage from '../../../assets/rate/rate.png';
import NeverShowImage from '../../../assets/rate/never_show_again.png';

import colors from '../../../styles/colors';
import shadows from '../../../styles/shadows';

import config from '../../../config';

class RateUs extends React.Component {
  rateApp = () => {
    const name = __DEV__ ? 'com.dnsndrvsk.wallz' : config.appPackageName;
    const options = {
      AppleAppID: name,
      GooglePackageName: name,
      AmazonPackageName: name,
      OtherAndroidURL: `https://play.google.com/store/apps/details?id=${name}`,
      preferredAndroidMarket: AndroidMarket.Google,
      preferInApp: false,
      openAppStoreIfInAppFails: true,
      fallbackPlatformURL: `https://play.google.com/store/apps/details?id=${name}`,
    };

    Rate.rate(options, success => {
      if (success) {
        // this technically only tells us if the user successfully went to the Review Page. Whether they actually did anything, we do not know.
        this.props.removeRateScreen();
      }
    });
  };

  onClose = () => {
    this.props.temporaryHideRateScreen();
  };

  render() {
    const { neverShowRateScreen, temporaryHideRateScreen, userActionsCount } = this.props.misc;

    if (neverShowRateScreen) return null;
    if (temporaryHideRateScreen) return null;
    if (userActionsCount === 0 || userActionsCount % config.popupShowRates.rateUs) return null;

    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.topImageContainer}>
            <Image source={PleaseRateUsImage} style={styles.image} resizeMode="contain" />
          </View>
          <TouchableOpacity onPress={this.rateApp}>
            <Image source={RateImage} style={styles.image} resizeMode="contain" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.props.removeRateScreen}
            style={styles.bottomImageContainer}
          >
            <Image source={NeverShowImage} style={styles.image} resizeMode="contain" />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onClose} style={styles.closeIconContainer}>
            <Icon
              size={23}
              name="close"
              type="material-community"
              color={colors.WHITE}
              containerStyle={styles.closeIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 1000,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    position: 'relative',
    width: 250,
    height: 300,
    backgroundColor: colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    ...shadows.shadowSmall,
  },
  topImageContainer: {
    position: 'absolute',
    top: 0,
  },
  bottomImageContainer: {
    position: 'absolute',
    bottom: -20,
  },
  image: {
    width: 200,
  },
  closeIconContainer: {
    position: 'absolute',
    right: -21,
    top: -21,
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: colors.BLUE,
  },
  closeIcon: {
    position: 'absolute',
    bottom: 5,
    left: 5,
  },
});

const mapStateToProps = state => ({
  misc: state.misc,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      removeRateScreen,
      temporaryHideRateScreen,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RateUs);
