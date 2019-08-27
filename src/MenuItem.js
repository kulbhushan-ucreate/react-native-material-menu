import React from 'react';

import PropTypes from 'prop-types';
import {
  Platform,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
  Dimensions,
  TouchableNativeFeedback,
  View,
} from 'react-native';

const Touchable = Platform.select({
  android: TouchableNativeFeedback,
  default: TouchableHighlight,
});

function MenuItem({
  children,
  disabled,
  disabledTextColor,
  ellipsizeMode,
  onPress,
  style,
  textStyle,
  checkedIcon,
  uncheckedIcon,
  selectedItem,
  withCheckBoxes,
  ...props
}) {
  const touchableProps =
    Platform.OS === 'android'
      ? { background: TouchableNativeFeedback.SelectableBackground() }
      : {};

  return (
    <Touchable
      disabled={disabled}
      onPress={onPress}
      {...touchableProps}
      {...props}
    >
      <View style={[styles.container, style]}>
        <Text
          ellipsizeMode={ellipsizeMode}
          numberOfLines={1}
          style={[
            styles.title,
            disabled && { color: disabledTextColor },
            textStyle,
          ]}
        >
          {children}
        </Text>
        {withCheckBoxes && selectedItem ?
              <Image source={checkedIcon} style={{ height: 15, width: 15 }} /> :
              <Image source={uncheckedIcon} style={{ height: 15, width: 15 }} />}
      </View>
    </Touchable>
  );
}

MenuItem.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  disabledTextColor: PropTypes.string,
  ellipsizeMode: PropTypes.string,
  onPress: PropTypes.func,
  style: TouchableHighlight.propTypes.style,
  textStyle: Text.propTypes.style,
  underlayColor: TouchableHighlight.propTypes.underlayColor,
};

MenuItem.defaultProps = {
  disabled: false,
  withCheckBoxes: false,
  selectedItem: false,
  disabledTextColor: '#bdbdbd',
  ellipsizeMode: Platform.OS === 'ios' ? 'clip' : 'tail',
  underlayColor: '#e0e0e0',
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 48,
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    maxWidth: Dimensions.get('screen').width * 0.85,
    minWidth: Dimensions.get('screen').width * 0.3,
  },
  title: {
    fontSize: 14,
    fontWeight: '400',
    paddingRight: 10,
  },
});

export default MenuItem;
