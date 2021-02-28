import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import {Link, NavLink } from 'react-router-dom';
import {Container, Menu, Button, Dropdown, Image } from 'semantic-ui-react';
import { RootStoreContext } from '../../app/stores/rootStore';

const NavBar: React.FC = () => {
    
    const rootStore = useContext(RootStoreContext);
    const {user, logout} = rootStore.userStore;
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
                {/*<Menu.Item as={NavLink} to='/posts' name='Posts' />*/}
                {/*    <Menu.Item position={"right"}>*/}
                {/*        <Button as={NavLink} to='/createPost' positive content='Create Post'/>*/}
                {/*</Menu.Item>*/}
                {user && (
                    <Menu.Item position='right'>
                        <Image avatar spaced='right' src={user.image || '/assets/user.png'} />
                        <Dropdown pointing='top left' text={user.displayName}>
                            <Dropdown.Menu>
                                <Dropdown.Item
                                    as={Link}
                                    to={`/profile/username`}
                                    text='My profile'
                                    icon='user'
                                />
                                <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>
                )}
            </Container>
        </Menu> 
    );
};


export default observer(NavBar)