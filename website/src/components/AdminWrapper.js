import React, { Component } from 'react'

export default class AdminWrapper extends Component {
    render() {
        return (
            <div id="admin-page">
                {this.props.children}
            </div>
        )
    }
}
