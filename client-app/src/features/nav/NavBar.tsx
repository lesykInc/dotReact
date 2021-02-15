import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import {Container, Menu, Button } from 'semantic-ui-react';
import ActivityStore from '../../app/stores/activityStore';
import { useStore } from '../../app/stores/store';


// const NavBar: React.FC = () => {
    
export default function NavBar() {
    
 //   const activityStore = useContext(ActivityStore);
    const {activityStore} = useStore();
    
    return (
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item as={NavLink} exact to='/' header>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
                    dotReact
                </Menu.Item>
                <Menu.Item as={NavLink} to='/activities' name='Activities' />
                <Menu.Item>
                    <Button as={NavLink} to='/createActivity' onClick={activityStore.openCreateForm} positive content='Create Activity' />
                </Menu.Item>
            </Container>
        </Menu> 
    );
};


//export default observer(NavBar)