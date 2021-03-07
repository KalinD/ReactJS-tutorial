import React, { Component } from 'react';
import Field from '../Common/Field';
import { withFormik } from 'formik';
import * as Yup from 'yup';

const fields = {
    sections: [
        [
            { name: 'name', elementName: 'input', type: 'text', placeholder: 'Your Name *' },
            { name: 'email', elementName: 'input', type: 'email', placeholder: 'Your Email *' },
            { name: 'phone', elementName: 'input', type: 'text', placeholder: 'Your Phone *' }
        ],
        [
            { name: 'message', elementName: 'textarea', type: 'text', placeholder: 'Your Message *' }
        ]
    ]
};

class Contact extends Component {
    render() {
        return (
            <section className="page-section" id="contact">
                <div className="container">
                    <div className="text-center">
                        <h2 className="section-heading text-uppercase">Contact Us</h2>
                        <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
                    </div>
                    <form id="contactForm" name="sentMessage" noValidate="novalidate" onSubmit={this.props.handleSubmit}>
                        <div className="row align-items-stretch mb-5">
                            {fields.sections.map((section, index) => {
                                return (
                                    <div className="col-md-6" key={index}>
                                        {section.map((field, i) => {
                                            return (<Field
                                                {...field}
                                                key={i}
                                                value={this.props.values[field.name]}
                                                name={field.name}
                                                onChange={this.props.handleChange}
                                                onBlur={this.props.handleBlur}
                                                touched={this.props.touched[field.name]}
                                                errors={this.props.errors[field.name]}
                                            />
                                            );
                                        })}
                                    </div>
                                );
                            })}
                        </div>
                        <div className="text-center">
                            <div id="success"></div>
                            <button className="btn btn-primary btn-xl text-uppercase" id="sendMessageButton" type="submit">Send Message</button>
                        </div>
                    </form>
                </div>
            </section>
        );
    }

}

export default withFormik({
    mapPropsToValues: () => ({
        name: '',
        email: '',
        phone: '',
        message: ''
    }),
    validationSchema: Yup.object().shape({
        name: Yup.string()
            .min(3, 'Name must be at least 3 letters!')
            .required('You must enter a name!'),
        email: Yup.string()
            .email('Email is invalid!')
            .required("You must enter an email!"),
        phone: Yup.string()
            .min(10, 'Phone number is too short!')
            .max(15, 'Phone number is oto long!')
            .required('You must enter phone number!'),
        message: Yup.string()
            .required('You must enter a message')
    }),
    handleSubmit: (values, { setSubmitting }) => {
        console.log(values);
        alert("Form submitted");
    }
})(Contact);