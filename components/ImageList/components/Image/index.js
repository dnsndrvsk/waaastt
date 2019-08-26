import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, ImageBackground, StyleSheet, ActivityIndicator } from 'react-native';

import RoundIcon from '../../../../components/RoundIcon';

import colors from '../../../../styles/colors';
import shadows from '../../../../styles/shadows';

export default class Image extends React.Component {
  static propTypes = {
    imageUrl: PropTypes.string.isRequired,
    imageData: PropTypes.shape({
      public_id: PropTypes.string.isRequired,
      format: PropTypes.string.isRequired,
    }),
    onLikePress: PropTypes.func.isRequired,
    onHeartPress: PropTypes.func.isRequired,
    onPhonePress: PropTypes.func.isRequired,
    onCropPress: PropTypes.func.isRequired,
    onSavePress: PropTypes.func.isRequired,
    liked: PropTypes.bool.isRequired,
    likesCount: PropTypes.number.isRequired,
    hearted: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
  };

  state = {
    loading: true,
  };

  // shouldComponentUpdate() {
  //   return this.state.loading;
  // }

  render() {
    const modIndex = this.props.index % 3;
    let spinnerColor;
    if (modIndex === 0) spinnerColor = colors.BLUE;
    else if (modIndex === 1) spinnerColor = colors.YELLOW;
    else spinnerColor = colors.RED;

    return (
      <View style={[styles.container, modIndex === 0 || modIndex === 2 ? styles.even : styles.odd]}>
        <ImageBackground
          source={{ uri: this.props.imageUrl }}
          style={[styles.image]}
          onLoadEnd={() => {
            this.setState({ loading: false });
          }}
        />
        {this.state.loading && (
          <View style={styles.spinnerContainer}>
            <ActivityIndicator size="small" color={spinnerColor} />
          </View>
        )}
        {!this.state.loading && (
          <View style={styles.actionsBar}>
            <View style={styles.actionsBarInner}>
              <RoundIcon
                type="material-icons"
                size={31}
                name="phone-android"
                color={colors.BLUE}
                onPress={() => {
                  this.props.onPhonePress(this.props.imageData);
                }}
                containerStyle={{ marginRight: 10 }}
              />
              <RoundIcon
                type="ionicons"
                size={31}
                name="crop"
                color={colors.BLUE}
                onPress={() => {
                  this.props.onCropPress(this.props.imageData);
                }}
                containerStyle={{ marginRight: 10 }}
              />
              <View style={styles.likeButtonContainer}>
                <RoundIcon
                  type="antdesign"
                  size={30}
                  name={this.props.liked ? 'like1' : 'like2'}
                  color={colors.RED}
                  onPress={() => {
                    this.props.onLikePress(this.props.imageData);
                  }}
                  containerStyle={{}}
                />
                {this.props.likesCount > 0 && (
                  <View
                    style={[
                      styles.floatingTextContainer,
                      this.props.likesCount >= 1000 && { width: 55 },
                    ]}
                  >
                    <Text style={styles.text}>{this.props.likesCount}</Text>
                  </View>
                )}
              </View>
              <RoundIcon
                type="material-community"
                size={35}
                name={this.props.hearted ? 'heart' : 'heart-outline'}
                color={colors.RED}
                onPress={() => {
                  this.props.onHeartPress(this.props.imageData);
                }}
                containerStyle={{ marginRight: 10 }}
              />
              <RoundIcon
                type="material-community"
                size={35}
                name="download"
                color={colors.YELLOW}
                onPress={() => {
                  this.props.onSavePress(this.props.imageData);
                }}
                containerStyle={{ marginRight: 10 }}
              />
            </View>
            <View style={styles.actionsBarOverlay} />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: '100%',
    width: '100%',
    borderLeftWidth: 2,
    borderLeftColor: colors.BLUE,
    borderRightWidth: 2,
    borderRightColor: colors.YELLOW,
    borderBottomWidth: 2,
    borderBottomColor: colors.RED,
  },
  even: {
    borderRightColor: colors.YELLOW,
    borderLeftColor: colors.BLUE,
  },
  odd: {
    borderRightColor: colors.BLUE,
    borderLeftColor: colors.YELLOW,
  },
  spinnerContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  actionsBar: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    paddingVertical: 10,
  },
  actionsBarInner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    zIndex: 2,
  },
  actionsBarOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: '#000',
    opacity: 0.3,
    zIndex: 1,
  },
  likeButtonContainer: {
    marginRight: 10,
    position: 'relative',
    alignItems: 'center',
  },
  floatingTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -35,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    backgroundColor: colors.WHITE,
    ...shadows.shadowSmall,
  },
  text: {
    color: 'red',
    fontWeight: '700',
    fontSize: 16,
  },
});
