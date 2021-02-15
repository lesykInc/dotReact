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
// import { useStore } from '../stores/store';

const App = () => {
    
  return (
    <>
        <NavBar />
        <Container style={{marginTop: '7em'}}>
            <Route exact path='/' component={HomePage}/>
            <Route path='/activiteis' component={ActivityDashboard}/>
            <Route path='/createActivity' component={ActivityForm}/>
            <ActivityDashboard />
        </Container>
    </>
  );
};

export default observer(App);
