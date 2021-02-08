import React, {useState, useEffect, Fragment} from 'react';
import axios from 'axios';
import {Container, Header, Icon, List } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { IActivity } from '../models/activity';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

const App = () => {
    const [activities, setActivities] = useState<IActivity[]>([]);
 
    useEffect(() => {
          axios.get<IActivity[]>('http://localhost:5000/api/activities')
              .then((response) => {
                setActivities(response.data)
              });
    }, [])
  
  // on way change activities -> setState
  // componentDidMount() {
  //   axios.get<IActivity[]>('http://localhost:5000/api/activities')
  //       .then((response) => {
  //         this.setState({
  //           activities: response.data
  //         });
  //       });
  // }

  return (
    <Fragment>
        <NavBar />
        <Container style={{marginTop: '7em'}}>
            <ActivityDashboard activities={activities} />
        </Container>
    </Fragment>
  );
}

export default App;
