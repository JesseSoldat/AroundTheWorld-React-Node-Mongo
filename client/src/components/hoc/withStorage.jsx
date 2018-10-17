import React, { Component } from "react";

const storageExists = () => {
  const testKey = "test";
  try {
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

const withStorage = WrappedComponent => {
  class HOC extends Component {
    load = key => {
      if (storageExists()) {
        return localStorage.getItem(key);
      }
      return null;
    };

    save = (key, data) => {
      if (storageExists()) {
        localStorage.setItem(key, data);
      }
    };

    remove = key => {
      if (storageExists()) {
        localStorage.removeItem(key);
      }
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          load={this.load}
          save={this.save}
          remove={this.remove}
        />
      );
    }
  }

  return HOC;
};

export default withStorage;
