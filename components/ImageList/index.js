import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';

import Image from './components/Image';

import config from '../../config';

ImageList.propTypes = {
  images: PropTypes.array.isRequired,
  favorites: PropTypes.array.isRequired,
  likes: PropTypes.shape({
    user: PropTypes.arrayOf(
      PropTypes.shape({
        public_id: PropTypes.string.isRequired,
      }),
    ).isRequired,
    all: PropTypes.arrayOf(
      PropTypes.shape({
        public_id: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }),
  onPress: PropTypes.func.isRequired,
  onLikePress: PropTypes.func.isRequired,
  onHeartPress: PropTypes.func.isRequired,
  onPhonePress: PropTypes.func.isRequired,
  onCropPress: PropTypes.func.isRequired,
  onSavePress: PropTypes.func.isRequired,
  onEndReached: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired,
  refreshing: PropTypes.bool.isRequired,
  allHearted: PropTypes.bool,
};

export default function ImageList({
  allHearted,
  images,
  favorites,
  likes,
  onPress,
  onLikePress,
  onHeartPress,
  onSavePress,
  onPhonePress,
  onCropPress,
  onEndReached,
  onRefresh,
  refreshing,
}) {
  let favoritesArray = [];
  if (!allHearted) {
    favoritesArray = favorites.map(x => x.public_id);
  }

  return (
    <FlatList
      data={images}
      keyExtractor={(item, index) => JSON.stringify(index)}
      renderItem={({ item, index }) => {
        const imageUrl = `${config.cloudinary.domain}/${config.cloudinary.username}/${
          config.cloudinary.images.preview
        }/${item.public_id}.${item.format}`;
        const hearted = allHearted || favoritesArray.indexOf(item.public_id) !== -1;
        const liked = likes.user.map(x => x.public_id).indexOf(item.public_id) !== -1;
        const likedItem = likes.all.filter(x => x.public_id === item.public_id)[0];
        const likesCount = likedItem ? likedItem.likes : 0;
        // const imageStyle = item.height && item.height < item.width ? styles.itemHorizontal : styles.itemVertical;
        const dimensions = Dimensions.get('window');
        const imageWidth = dimensions.width;
        const divisionUnit = item.width / imageWidth;
        const imageHeight = item.height / divisionUnit;
        const imageStyle = { width: imageWidth, height: imageHeight };

        return (
          <View
            onPress={() => {
              onPress(item);
            }}
            style={imageStyle}
            columnWrapperStyle={{}}
            contentContainerStyle={{}}
          >
            <Image
              imageUrl={imageUrl}
              imageData={{
                public_id: item.public_id,
                format: item.format,
                height: item.height,
                width: item.width,
              }}
              onLikePress={onLikePress}
              onHeartPress={onHeartPress}
              onSavePress={onSavePress}
              onPhonePress={onPhonePress}
              onCropPress={onCropPress}
              liked={liked}
              likesCount={likesCount}
              hearted={hearted}
              index={index}
            />
          </View>
        );
      }}
      onEndReached={onEndReached}
      onRefresh={onRefresh}
      refreshing={refreshing}
    />
  );
}

const styles = StyleSheet.create({
  itemVertical: {
    width: '100%',
    height: 520,
  },
  itemHorizontal: {
    width: '100%',
    height: 320,
  },
});
