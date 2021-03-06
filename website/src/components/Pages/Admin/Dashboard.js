import React, { Component } from 'react';
import { connect } from 'react-redux';

class Dashboard extends Component {
    render() {
        return (
            <h1>You are logged in with token: {this.props.auth.token}</h1>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

const mapDispatchProps = dispatch => {
    return {}
}

export default connect(
    mapStateToProps,
    mapDispatchProps
)(Dashboard);