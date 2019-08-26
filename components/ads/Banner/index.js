import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'react-native-firebase';

import config from '../../../config';

export default class BannerComponent extends React.Component {
  static propTypes = {
    unitId: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
  };

  state = {
    error: false,
  };

  onAdFailedToLoad = () => {
    this.setState({ error: true });
  };

  onAdLoaded = () => {};

  render() {
    const { error } = this.state;
    if (error) return null;

    const AdRequest = firebase.admob.AdRequest;
    const request = new AdRequest();
    const Banner = firebase.admob.Banner;
    const unitId = __DEV__ ? config.ads.test.banner : this.props.unitId;

    return (
      <Banner
        unitId={unitId}
        size={this.props.size}
        request={request.build()}
        onAdLoaded={this.onAdLoaded}
        didFailToReceiveAdWithError={error}
        onAdFailedToLoad={this.onAdFailedToLoad}
      />
    );
  }
}
