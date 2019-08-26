import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import firebase from 'react-native-firebase';

import config from '../../../config';

class InterstitialComponent extends React.Component {
  componentDidUpdate(prevProps) {
    const { userActionsCount } = this.props.misc;
    if (
      userActionsCount !== 0 &&
      prevProps.misc.userActionsCount !== userActionsCount &&
      !(userActionsCount % config.popupShowRates.interstitialAd)
    ) {
      const adUnitId = this.getAdUnitId();
      this.showAd(adUnitId);
    }
  }

  getAdUnitId = () => {
    if (__DEV__) return config.ads.test.interstitial;
    const interstitials = config.ads.interstitials;
    const random = Math.floor(Math.random() * interstitials.length);
    return interstitials[random];
  };

  showAd = adUnitId => {
    const advert = firebase.admob().interstitial(adUnitId);
    const AdRequest = firebase.admob.AdRequest;
    const request = new AdRequest();
    advert.loadAd(request.build());

    advert.on('onAdLoaded', () => {
      advert.show();
    });
  };

  render() {
    return null;
  }
}

const mapStateToProps = state => ({
  misc: state.misc,
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InterstitialComponent);
