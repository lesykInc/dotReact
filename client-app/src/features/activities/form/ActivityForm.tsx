import React, {FormEvent, useContext, useState} from 'react'
import {Button, Form, Segment } from 'semantic-ui-react'
import {IActivity} from "../../../app/models/activity";
import  {v4 as uuid} from 'uuid';
import ActivityStore from '../../../app/stores/activityStore';

interface IProps {
    activity: IActivity;
}

const ActivityForm: React.FC<IProps> = (
    {  
        activity: initialFormState
    }) => {
    
    const activityStore = useContext(ActivityStore);
    const {createActivity, editActivity, submitting, cancerFormOpen} = activityStore;
    
    
    const intializeForm = () => {
        if (initialFormState) {
            return initialFormState
        } else {
            return {
                id: '',
                title: '',
                category: '',
                decription: '',
                date: '',
                city: '',
                venue: ''
            };
        }
    };
    
    const [activity, setActivity] = useState<IActivity>(intializeForm);
    
    const handleSubmit = () => {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            }
            createActivity(newActivity);
        } else {
            editActivity(activity);
        }
    };
    
    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.currentTarget;
        setActivity({...activity, [name]: value})
    };
    
    
    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input onChange={handleInputChange} 
                            name='title' 
                            placeholder='Title' 
                            value={activity.title}
                />
                <Form.TextArea onChange={handleInputChange}
                               name='decription' rows={2} 
                               placeholder='Description' 
                               value={activity.decription}
                />
                <Form.Input onChange={handleInputChange}
                            name='category' 
                            placeholder='Category' 
                            value={activity.category}
                />
                <Form.Input onChange={handleInputChange}
                            name='date'
                            type='datetime-local' 
                            placeholder='Date' 
                            value={activity.date}
                />
                <Form.Input onChange={handleInputChange}
                            name='city'
                            placeholder='City' 
                            value={activity.city}
                />
                <Form.Input onChange={handleInputChange}
                            name='venue' 
                            placeholder='Venue' 
                            value={activity.venue}
                />
                <Button loading={submitting} floated='right' positive type='submit' content='Submit' />
                <Button onClick={cancerFormOpen} 
                        floated='left' 
                        type='button' 
                        content='Cancel' />
            </Form>
        </Segment>
    )
}

export default ActivityForm