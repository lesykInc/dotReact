import React, { Component } from 'react';
// @ts-ignore
import { CKEditor } from '@ckeditor/ckeditor5-react';
// @ts-ignore
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {useField} from "formik";
import {Form, Label} from "semantic-ui-react";

interface Props {
    placeholder: any;
    name: string;
    rows: number;
    label?: string;
}

export default function Editor(props: Props){
    const [field, meta] = useField(props.name);
        // @ts-ignore
        return (
            <Form.Field error={meta.touched && !!meta.error}>
                <label>{props.label}</label>
                <textarea {...field} {...props}/>
                <CKEditor
                    editor={ ClassicEditor }
                />
                {meta.touched && meta.error ? (
                    <Label basic color='red'>{meta.error}</Label>
                ) : null}
            </Form.Field>
                
        );
}