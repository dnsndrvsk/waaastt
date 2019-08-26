import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, Dimensions } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { Icon } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'react-native-fetch-blob';

import { accessStorage } from '../../actions/permissions';
import {
  loadImages,
  downloadImage,
  setupWallpaper,
  preSetupWallpaper,
  likeImage,
  dislikeImage,
} from '../../actions/images';
import { addFavorite, removeFavorite } from '../../actions/favorites';

import config from '../../config';

import colors from '../../styles/colors';

import Tab from './components/Tab';

class Tabs extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'new', title: 'New' },
      { key: 'top', title: 'Top Rated' },
      { key: 'favorites', title: 'Favorites' },
    ],
  };

  componentDidMount() {
    this.props.accessStorage();
    this.props.loadImages({ tag: 'superhero' });
  }

  renderTabIcon = ({ route, focused }) => {
    let size;
    let type;
    let name;
    if (route.key === 'new') {
      size = 24;
      type = 'material-community';
      name = 'new-box';
    } else if (route.key === 'top') {
      size = 18;
      type = 'material-community';
      name = 'trophy';
    } else {
      size = 20;
      type = 'entypo';
      name = 'heart';
    }
    return <Icon size={size} name={name} type={type} color={focused ? colors.WHITE : 'grey'} />;
  };

  renderTabScene = ({ route }) => (
    <Tab
      {...this.props}
      type={route.key}
      onSavePress={this.onSavePress}
      onPhonePress={this.onPhonePress}
      onCropPress={this.onCropPress}
      onHeartPress={this.onHeartPress}
      onLikePress={this.onLikePress}
      onRefresh={route.key === 'new' ? this.onNewListRefresh : () => {}}
      needLikesUpdate={this.props.likes.updating}
    />
  );

  getImageUrl = imageData => {
    return `${config.cloudinary.domain}/${config.cloudinary.username}/${
      config.cloudinary.images.source
    }/${imageData.public_id}.${imageData.format}`;
  };

  onSavePress = imageData => {
    if (!this.props.permissions.storage) {
      return this.props.accessStorage();
    }

    const url = this.getImageUrl(imageData);
    const imageId = imageData.public_id.split('/')[1];

    this.props.downloadImage({ url, imageId });
  };

  onPhonePress = imageData => {
    if (!this.props.permissions.storage) {
      return this.props.accessStorage();
    }
    const url = this.getImageUrl(imageData);

    this.props.preSetupWallpaper();
    setTimeout(() => {
      this.props.setupWallpaper(url);
    }, 1500);
  };

  onCropPress = imageData => {
    if (!this.props.permissions.storage) {
      return this.props.accessStorage();
    }
    const url = this.getImageUrl(imageData);
    const image = this.props.images.data.filter(x => x.public_id === imageData.public_id)[0];
    const imageCropData = {
      url,
      height: image.height,
      width: image.width,
    };
    const pictureDir = RNFetchBlob.fs.dirs.PictureDir;

    RNFetchBlob.fs.isDir(pictureDir).then(isDir => {
      if (isDir) {
        this.openImageCropper(imageCropData);
      } else {
        RNFetchBlob.fs.mkdir(pictureDir).then(() => {
          if (__DEV__) console.log('Created Pictures directory');
          this.openImageCropper(imageCropData);
        });
      }
    });
  };

  openImageCropper = ({ url, height, width }) => {
    ImagePicker.openCropper({
      path: url,
      width,
      height,
      freeStyleCropEnabled: true,
      cropperToolbarTitle: 'Select Area',
    })
      .then(image => {
        if (__DEV__) console.log(image);
        this.props.preSetupWallpaper();
        setTimeout(() => {
          this.props.setupWallpaper(image.path);
        }, 1500);
      })
      .catch(error => {
        if (__DEV__) console.log(error);
      });
  };

  onHeartPress = image => {
    const index = this.props.favorites.data.map(x => x.public_id).indexOf(image.public_id);
    if (index === -1) this.props.addFavorite(image);
    else this.props.removeFavorite(image);
  };

  onLikePress = image => {
    if (!this.props.likes.busy) {
      const index = this.props.likes.user.map(x => x.public_id).indexOf(image.public_id);
      if (index === -1) this.props.likeImage(image);
      else this.props.dislikeImage(image);
    }
  };

  onNewListRefresh = () => {
    this.props.loadImages({ tag: 'superhero' });
  };

  render() {
    const { images } = this.props;
    if (!images.data || !images.data.length) return null;

    return (
      <TabView
        navigationState={this.state}
        renderScene={this.renderTabScene}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={props => (
          <TabBar
            {...props}
            tabStyle={{ padding: 0, minHeight: 30 }}
            renderIcon={this.renderTabIcon}
            renderLabel={() => null}
          />
        )}
      />
    );
  }
}

const styles = StyleSheet.create({});

const mapStateToProps = state => ({
  images: state.images,
  favorites: state.favorites,
  likes: state.likes,
  permissions: state.permissions,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      accessStorage,
      loadImages,
      addFavorite,
      removeFavorite,
      downloadImage,
      setupWallpaper,
      preSetupWallpaper,
      likeImage,
      dislikeImage,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tabs);
