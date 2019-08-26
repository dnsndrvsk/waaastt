import React from 'react';
import { StatusBar } from 'react-native';

import colors from '../../styles/colors';

export default function StatusBarComponent() {
  return <StatusBar backgroundColor={colors.BLUE} barStyle={'light-content'} />;
}
