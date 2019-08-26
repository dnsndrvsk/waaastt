import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import noConnectionImage from '../../assets/waiting_for_connection.png';
import preparingApplicationImage from '../../assets/preparing_application.png';
import downloadingImage from '../../assets/downloading.png';
import savingImage from '../../assets/saving.png';
import settingUpWallpaperImage from '../../assets/setting_wallpaper.png';

import Spinner from '../Spinner';

import colors from '../../styles/colors';

class BusyOverlay extends React.Component {
  types = {
    noConnection: {
      image: noConnectionImage,
      width: 250,
    },
    preparingApplication: {
      image: preparingApplicationImage,
      width: 230,
    },
    downloading: {
      image: downloadingImage,
      width: 160,
    },
    savingImage: {
      image: savingImage,
      width: 90,
    },
    settingUpWallpaper: {
      image: settingUpWallpaperImage,
      width: 210,
    },
  };

  renderTemplate = type => {
    return (
      <View style={styles.container}>
        <Spinner grey containerStyle={styles.spinnerContainer} imageStyle={styles.spinner} />
        <View style={styles.imageContainer}>
          <Image
            source={this.types[type].image}
            style={{ width: this.types[type].width }}
            resizeMode="contain"
          />
        </View>
      </View>
    );
  };

  renderOverlay = () => {
    const { tasks, network, images } = this.props;

    if (!network.isConnected) {
      return this.renderTemplate('noConnection');
    } else if (images.loading && (!images.data || !images.data.length)) {
      return this.renderTemplate('preparingApplication');
    } else if (tasks.downloadingImage) {
      return this.renderTemplate('downloading');
    } else if (tasks.savingImage) {
      return this.renderTemplate('savingImage');
    } else if (tasks.settingUpWallpaper) {
      return this.renderTemplate('settingUpWallpaper');
    }

    return null;
  };

  render() {
    return this.renderOverlay();
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
    backgroundColor: colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinnerContainer: {
    opacity: 0.1,
    position: 'absolute',
  },
  spinner: {
    width: 300,
    height: 300,
  },
  imageContainer: {
    height: 100,
  },
});

const mapStateToProps = state => ({
  tasks: state.tasks,
  network: state.network,
  images: state.images,
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BusyOverlay);
