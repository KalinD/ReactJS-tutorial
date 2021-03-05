import React, { Component } from 'react';

class Field extends Component {
    render() {
        return (
            <div className={this.props.elementName === 'input' ? "form-group" : "form-group form-group-textarea mb-md-0"}>
                {this.props.elementName === 'input' ?
                    <input
                        value={this.props.value}
                        onChange={(e) => this.props.onChange(e)}
                        className="form-control"
                        id={this.props.name}
                        type={this.props.type}
                        placeholder={this.props.placeholder}
                        required="required"
                        data-validation-required-message="Please enter your name." />
                    :
                    <textarea
                        value={this.props.value}
                        onChange={(e) => this.props.onChange(e)}
                        className="form-control"
                        id={this.props.name}
                        placeholder={this.props.placeholder}
                        required="required"
                        data-validation-required-message="Please enter a message." />
                }
            </div>
        );
    }
}

export default Field;