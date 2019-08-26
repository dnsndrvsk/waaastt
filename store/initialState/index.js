export default {
  images: {
    loading: false,
    data: [],
    error: null,
  },
  favorites: {
    data: [],
  },
  likes: {
    all: [],
    user: [],
    busy: false,
    updating: false,
  },
  tasks: {
    downloadingImage: false,
    savingImage: false,
    settingUpWallpaper: false,
  },
  toasts: {
    toasts: [],
    count: 0,
  },
  misc: {
    neverShowRateScreen: false,
    temporaryHideRateScreen: false,
    userActionsCount: 0,
  },
  permissions: {
    storage: false,
  },
};
