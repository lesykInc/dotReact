import React, { useEffect, Fragment, useContext} from 'react';
import { Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from "./LoadingComponent";
import ActivityStore from '../stores/activityStore';
import { observer } from 'mobx-react-lite';
import { Route } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import PostList from '../../features/posts/PostList';
import PostForm from '../../features/posts/PostForm';
import PostDashboard from '../../features/posts/postDashboard/PostDashboard';
// import { useStore } from '../stores/store';

const App = () => {
    
  return (
    <Fragment>
        <NavBar />
        <Container style={{marginTop: '7em'}}>
            <Route exact path='/' component={HomePage}/>
            <Route exact path='/activities' component={ActivityDashboard}/>
            <Route path='/activities/:id' component={ActivityDetails}/>
            <Route path='/createActivity' component={ActivityForm}/>
            <Route path='/posts' component={PostDashboard}/>
            <Route path='/createPost' component={PostForm} />
            {/*<ActivityDashboard />*/}
        </Container>
    </Fragment>
  );
};

export default observer(App);
