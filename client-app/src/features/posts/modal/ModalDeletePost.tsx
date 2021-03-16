import React, { useState } from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

export default function ModalDeletePost() {
    
    const [open, setOpen] = useState(false)

    return (
        <Modal
            basic
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            size='small'
            trigger={<Button>Basic Modal</Button>}
        >
            <Header icon>
                <Icon name='delete' />
                Delete Post?
            </Header>
            <Modal.Content>
                <p>
                    Are you sure you really want to delete the post?
                </p>
            </Modal.Content>
            <Modal.Actions>
                <Button basic color='red' inverted onClick={() => setOpen(false)}>
                    <Icon name='remove' /> No
                </Button>
                <Button color='green' inverted onClick={() => setOpen(false)}>
                    <Icon name='checkmark' /> Yes
                </Button>
            </Modal.Actions>
        </Modal>
    )
}
