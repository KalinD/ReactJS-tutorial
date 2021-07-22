import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as AdminActions from '../../../store/actions/adminActions';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import { withFormik, Form } from 'formik';
import { FormikTextField } from 'formik-material-fields';
import * as Yup from 'yup';

const styles = theme => ({
    container: {
        margin: theme.spacing(3)
    },
    FormControl: {
        margin: theme.spacing()
    }
});

class AddPost extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <h1>Add Post</h1>
                <Form>
                    <FormikTextField
                        name="titles"
                        label="Title"
                        margin="normal"
                        value=""
                        onChange={e => this.props.setFieldValue('slug', e.target.value.toLowerCase().replace(/ /g, '_'))}
                        fullWidth
                    />
                    <FormikTextField
                        name="slug"
                        label="Slug"
                        margin="normal"
                    />
                    <FormikTextField
                        name="content"
                        label="Content"
                        margin="normal"
                        fullWidth
                    />
                </Form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    admin: state.admin
});

const mapDispatchToProps = dispatch => ({

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withFormik({
    mapPropsToValues: () => ({
        title: '',
        slug: '',
        createdAt: '',
        status: false,
        content: ''
    }),
    validationSchema: Yup.object().shape({
        title: Yup.string().required("Title is required"),
        sleg: Yup.string().required(),
        content: Yup.string().required()
    }),
    handleSubmit: (values, { setSubmitting }) => {

    }
})(withStyles(styles)(AddPost)));