import { observer } from 'mobx-react-lite';
import React  from 'react';
import { Grid } from 'semantic-ui-react';
import ProfileHeader from './ProfileHeader';

export default observer(function ProfilePage() {
   
    return (
        <Grid>
            <Grid.Column width={16}>
                <ProfileHeader />
            </Grid.Column>
        </Grid>
    )
})