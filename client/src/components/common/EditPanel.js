import { Component } from 'react';
import _ from 'lodash';
 
class EditPanel extends Component {
  constructor(props) {
    super(props);
    this.blurToState = this.blurToState.bind(this);
    this.tryGetState = this.tryGetState.bind(this);
    this.tryGetProp = this.tryGetProp.bind(this);
  }

  blurToState(propName, converter=null) {
    const blur = (event) => {
      const newState = _.cloneDeep(this.state);
      const value = converter == null ? event.target.value: converter(event.target.value);
      _.set(newState, propName, value);
      this.setState(newState);
    };
    return blur.bind(this);
  }

  blurToProp(propName, converter=null) {
    const blur = (event) => {
      const newValue = converter==null? event.target.value: converter(event.target.value);
      _.set(this, propName, newValue);
    };
    return blur.bind(this);
  }

  inputToProp(propName, converter=null) {
    const blur = (event) => {
      const newValue = converter==null? event.target.value: converter(event.target.value);
      _.set(this, propName, newValue);
    };
    return blur.bind(this);
  }

  assignToProp(path) {
    const assign = (value) => {
      _.set(this, path, value);
    };
    return assign.bind(this);
  }

  tryGetState(path, defaultValue, converter=null) {
    const value = _.get(this.state, path);
    if (value !== undefined) return converter == null ? value : converter(value);
    return defaultValue;
  }

  tryGetProp(path, defaultValue, converter=null) {
    const value = _.get(this, path);
    if (value) return converter == null ? value : converter(value);
    return defaultValue;
  }
}
 
 
export default EditPanel;