import React, { Component } from 'react'
import { Box, Button, Heading, Layer, Text } from 'grommet'
import axios from 'axios';

class DeleteModal extends Component {
  onClose = (refresh) => this.props.showDeleteModal(false, refresh);

  doDelete = () => {
    axios.delete(`${process.env.REACT_APP_SERVICE_URL}/entries/${this.props.selectedEntry._id}`, {
      headers: { 'Authorization': 'bearer ' + localStorage.jwt }
    }).then((result) => {
      console.log('Deleted entry:', result.data.body.entry._id);
      this.onClose(true);
    }).catch((e) => {
      console.log(e);
    });
  }

  render() {
    return(
      <Box>
        {this.props.isOpen && (
          <Layer
            position="center"
            modal
            onClickOutside={this.onClose}
            onEsc={this.onClose}
            responsive={false}
          >
            <Box pad="medium" gap="small" width="medium">
              <Heading level={3} margin="none">
                Confirm
              </Heading>
              <Text>Are you sure you want to delete this entry?</Text>
              <Box
                as="footer"
                gap="small"
                direction="row"
                align="center"
                justify="end"
                pad={{ top: "medium", bottom: "small" }}
              >
                <Button
                  label="Cancel"
                  onClick={this.onClose}
                />
                <Button
                  label={
                    <Text color="white">
                      <strong>Delete</strong>
                    </Text>
                  }
                  onClick={this.doDelete}
                  primary
                  color="status-critical"
                />
              </Box>
            </Box>
          </Layer>
        )}
      </Box>
    )
  }
}

export default DeleteModal;