import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import {Container, Menu, Button } from 'semantic-ui-react';
import ActivityStore from '../../app/stores/activityStore';
import { useStore } from '../../app/stores/store';


const NavBar: React.FC = () => {
    
    const activityStore = useContext(ActivityStore);

    return (
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item as={NavLink} exact to='/' header >
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
                    dotReact
                </Menu.Item>
                <Menu.Item as={NavLink} to='/activities' name='Activities' />
                <Menu.Item>
                    <Button as={NavLink} to='/createActivity' positive content='Create Activity' />
                </Menu.Item>
                <Menu.Item as={NavLink} to='/posts' name='Posts'/>
            </Container>
        </Menu> 
    );
};


export default observer(NavBar)