import React, { Component } from 'react';
import "./assets/css/admin.css";

export default class LoginWrapper extends Component {
    render() {
        return (
            <div id="admin-page">
                {this.props.children}
            </div>
        )
    }
}
