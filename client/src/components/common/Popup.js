import React, { Component } from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { closePopup } from '../../actions';

class Popup extends Component {
    render() {
      const popupReducer = this.props.popupReducer;
      const header = popupReducer.header? popupReducer.header: "Delete";
      const prompt = popupReducer.prompt? popupReducer.prompt: "Do you want to delete?";
      const yesColor = popupReducer.yesColor? popupReducer.yesColor: "danger";
      const noColor = popupReducer.noColor? popupReducer.noColor: "secondary";
      const noCallBack = popupReducer.noCallBack? popupReducer.noCallBack : this.props.closePopup;
      const yesCallBack = popupReducer.yesCallBack;
      return (
          <Modal isOpen={ popupReducer.isOpen } toggle={ this.props.closePopup }>
            <ModalHeader>{ header }</ModalHeader>
            <ModalBody>{ prompt }</ModalBody>
            <ModalFooter>
              <Button color={ noColor } onClick={ noCallBack } >No</Button>
              <Button color={ yesColor } onClick={ yesCallBack } >Yes</Button>
            </ModalFooter>
          </Modal>
      );
    }
}

function mapReducerToState(state) {
  return { popupReducer: state.popupReducer };
}

const actions = {
  closePopup
};
 
export default connect(mapReducerToState, actions)(Popup);