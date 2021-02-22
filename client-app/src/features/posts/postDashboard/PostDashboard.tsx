import React from "react";
import {observer} from "mobx-react-lite";
import {Grid} from "semantic-ui-react";
import PostList from "../PostList";

const PostDashboard: React.FC = () => {

    return (
        <Grid>
            <Grid.Column>
                <PostList />
            </Grid.Column>
        </Grid>
    );
};

export default observer(PostDashboard);