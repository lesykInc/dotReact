import React, {useState, useEffect, Fragment, SyntheticEvent, useContext} from 'react';
import {Container, Header, Icon, List } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { IActivity } from '../models/activity';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import agent from '../api/agent';
import LoadingComponent from "./LoadingComponent";
import {observer} from 'mobx-react-lite';
import ActivityStore from '../stores/activityStore';

const App = () => {
    
    const activityStore = useContext(ActivityStore);
    const [activities, setActivities] = useState<IActivity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [target, setTarget]= useState('');
    
    
    const handleDeleteActivity = (event: SyntheticEvent<HTMLButtonElement>,id: string) => {
        setSubmitting(true);
        setTarget(event.currentTarget.name)
        agent.Activities.delete(id).then(() => {
            setActivities([...activities.filter(a => a.id !== id)]) 
        }).then(() => setSubmitting(false))
    }
    
    useEffect(() => {
        activityStore.loadActivities();
    }, [activityStore])
  
    if (activityStore.loadingInitial) return <LoadingComponent content='Loading activities...' />

  return (
    <Fragment>
        <NavBar />
        <Container style={{marginTop: '7em'}}>
            <ActivityDashboard
                deleteActivity={handleDeleteActivity}
                submitting={submitting}
                target={target}
            />
        </Container>
    </Fragment>
  );
};

export default observer(App);
