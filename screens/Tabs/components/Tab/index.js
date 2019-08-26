import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { Icon } from 'react-native-elements';

import ImageList from '../../../../components/ImageList';
import Spinner from '../../../../components/Spinner';

import colors from '../../../../styles/colors';

export default class Tab extends React.Component {
  static propTypes = {
    type: PropTypes.string.isRequired,

    images: PropTypes.object.isRequired,
    favorites: PropTypes.object.isRequired,
    likes: PropTypes.object.isRequired,

    onSavePress: PropTypes.func.isRequired,
    onPhonePress: PropTypes.func.isRequired,
    onCropPress: PropTypes.func.isRequired,
    onHeartPress: PropTypes.func.isRequired,
    onLikePress: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,

    needLikesUpdate: PropTypes.bool,
  };

  state = {
    sortedImagesByLikes: [],
  };

  componentDidUpdate(prevProps) {
    if (this.props.type === 'top' && (prevProps.needLikesUpdate && !this.props.needLikesUpdate)) {
      this.sortImagesByLikes();
    }
  }

  sortImagesByLikes = () => {
    if (__DEV__) console.log('sorting images by likes...');
    const { likes, images } = this.props;
    if (likes.all && !!likes.all.length) {
      const sorted = [];
      for (let i = 0; i < images.data.length; i++) {
        let image = images.data[i];
        const same = likes.all.filter(x => x.public_id === image.public_id)[0];
        if (same) image.likes = same.likes;
        else image.likes = 0;
        sorted.push(image);
      }

      sorted.sort((a, b) => b.likes - a.likes);

      if (sorted && !!sorted.length) {
        this.setState({ sortedImagesByLikes: sorted });
      }
    }
  };

  renderImageList = () => {
    const { images, favorites, likes, type } = this.props;
    const { sortedImagesByLikes } = this.state;
    const skipFilter = type === 'new';
    const allHearted = type === 'favorites';
    const refreshing = type === 'new' && images.loading;
    const onRefresh = type === 'top' ? this.sortImagesByLikes : this.props.onRefresh;
    let renderData = [];
    if (type === 'new') renderData = images.data;
    if (type === 'favorites') renderData = favorites.data;
    if (type === 'top') renderData = this.state.sortedImagesByLikes;

    // preventing render
    if (type === 'favorites' && (!favorites.data || !favorites.data.length)) {
      return null;
    } else if (type === 'top' && (!sortedImagesByLikes || !sortedImagesByLikes.length)) {
      return null;
    }

    return (
      <ImageList
        allHearted={allHearted}
        skipFilter={skipFilter}
        images={renderData}
        favorites={favorites.data}
        likes={likes}
        onLikePress={this.props.onLikePress}
        onHeartPress={this.props.onHeartPress}
        onSavePress={this.props.onSavePress}
        onPhonePress={this.props.onPhonePress}
        onCropPress={this.props.onCropPress}
        onRefresh={onRefresh}
        refreshing={refreshing}
        onPress={() => {}}
        onEndReached={() => {}}
      />
    );
  };

  renderFavoritesEmpty = () => {
    const { favorites, type } = this.props;
    if (type === 'favorites' && (!favorites.data || !favorites.data.length)) {
      return (
        <View style={styles.iconsContainer}>
          <View style={styles.iconsInnerContainer}>
            <FontAwesome5Icon size={60} name="cat" color="lightgrey" style={styles.catIcon} />
            <View style={styles.poopIcon}>
              <Icon size={20} type="material-community" name="emoticon-poop" color="lightgrey" />
            </View>
            <View style={styles.maskIcon}>
              <Icon size={20} type="entypo" name="mask" color={colors.RED} />
            </View>
          </View>
        </View>
      );
    }
  };

  renderTopEmpty = () => {
    const { sortedImagesByLikes } = this.state;
    if (this.props.type === 'top' && (!sortedImagesByLikes || !sortedImagesByLikes.length)) {
      return (
        <View style={styles.spinnerContainer}>
          <Spinner imageStyle={{ opacity: 0.1 }} />
        </View>
      );
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderImageList()}
        {this.renderTopEmpty()}
        {this.renderFavoritesEmpty()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  spinnerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconsInnerContainer: {
    position: 'relative',
    flexDirection: 'row',
  },
  poopIcon: {
    position: 'absolute',
    left: -21,
    bottom: -20,
    opacity: 0.7,
  },
  maskIcon: {
    position: 'absolute',
    right: 1,
    top: 10,
  },
  catIcon: {
    opacity: 0.7,
  },
});
