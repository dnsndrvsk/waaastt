import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, StyleSheet } from 'react-native';

import ToastItem from './components/ToastItem';

import { deleteToast } from '../../actions/toasts';

class Toast extends Component {
  componentDidUpdate(prevProps) {
    const { toasts } = this.props;
    if (prevProps.toasts.length !== toasts.length) {
      clearInterval(this.deleteIntervalId);
      if (toasts.length) this.startDeleteInterval();
    }
  }

  startDeleteInterval = () => {
    const { deleteToast, toasts } = this.props;
    this.deleteIntervalId = setInterval(() => {
      if (toasts.length) {
        toasts.forEach(x => {
          if (Date.now() > x.time) deleteToast(x.id);
        });
      }
    }, 150);
  };

  render() {
    const { toasts, deleteToast } = this.props;

    return (
      <View style={styles.container}>
        {toasts &&
          !!toasts.length &&
          toasts.map((x, i) => (
            <ToastItem
              key={i}
              {...x}
              onClick={() => {
                deleteToast(x.id);
              }}
            />
          ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 20,
    right: 20,
    top: 80,
  },
});

const mapStateToProps = state => ({
  ...state.toasts,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      deleteToast,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Toast);
