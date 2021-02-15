import { observer } from 'mobx-react-lite';
import React, {useContext, useEffect} from 'react'
import { Grid } from 'semantic-ui-react';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from "./ActivityList";
import ActivityStore from '../../../app/stores/activityStore';
import LoadingComponent from "../../../app/layout/LoadingComponent";

const ActivityDashboard: React.FC = () => {
    
    const activityStore = useContext(ActivityStore);
    const {editMode, selectedActivity} = activityStore;

//    const activityStore = useContext(ActivityStore);
    // const {activityStore} = useStore();

    useEffect(() => {
        activityStore.loadActivities();
    }, [activityStore])

    if (activityStore.loadingInitial) return <LoadingComponent content='Loading activities...' />
    
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width={6}>
                {selectedActivity && !editMode && (
                    <ActivityDetails />
                    )}
                {editMode && (
                <ActivityForm 
                    key={(selectedActivity && selectedActivity.id) || 0}
                    activity={selectedActivity!}
                /> 
                )}
            </Grid.Column>
        </Grid>    
    );
};

export default observer(ActivityDashboard)