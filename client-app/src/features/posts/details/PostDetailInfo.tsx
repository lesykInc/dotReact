import { observer } from 'mobx-react-lite';
import React from 'react'
import { Segment, Grid, Icon } from 'semantic-ui-react'
import {format} from 'date-fns';
import { Post } from '../../../app/models/post';

interface Props {
    post: Post
}

export default observer(function PostDetailInfo({ post }: Props) {
    return (
        <Segment.Group>
            <Segment attached='top'>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal' name='info' />
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>{post.title}</p>
                        <p>{post.content}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={15}>
                        <span>
                            {format(post.date!, 'dd MMM yyyy h:mm aa')}
                        </span>
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    )
})