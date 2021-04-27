import React from "react";
import "./EmployeeFormAdd.css";

class EmployeeFormAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            validation: {
                firstName: false,
                lastName: false,
            },
            validationMessage: {},
            disabled: true
        }
    }

    handleUserInput = (eo) => {
        const name = eo.target.name;
        const value = eo.target.value;
        const validation = {...this.state.validation};
        const validationMessage = {...this.state.validationMessage};

        if (value.length < 6 || value.length > 20) {
            validationMessage[name] = 'Length must be 6-20 symbols';
            validation[name] = false;
        } else if (value[0] !== value[0].toUpperCase()) {
            validationMessage[name] = 'The first character must be uppercase';
            validation[name] = false;
        } else {
            validationMessage[name] = '';
            validation[name] = true;
        }

        this.setState({
            [name]: value,
            validation: validation,
            validationMessage: validationMessage,
            disabled: Object.keys(validation).some(item => validation[item] === false),
        });
    }

    handleSave = () => {
        const data = {
            first_name: this.state.firstName,
            last_name: this.state.lastName
        }

        this.props.onSave(data);
        this.setState({firstName: '', lastName: '', disabled: true});
    }

    render() {
        return (
            <div className='employee_form_container'>
                <form className='employee_form'>
                    <div className='employee_form_group'>
                        <label htmlFor='firstName'>First Name:</label>
                        <input
                            type='text'
                            name='firstName'
                            value={this.state.firstName}
                            onChange={this.handleUserInput}
                        />
                        <span className='employee_form_error'>{this.state.validationMessage.firstName}</span>
                    </div>
                    <div className='employee_form_group'>
                        <label htmlFor='lastName'>Last Name:</label>
                        <input
                            type='text'
                            name='lastName'
                            id='lastName'
                            value={this.state.lastName}
                            onChange={this.handleUserInput}
                        />
                        <span className='employee_form_error'>{this.state.validationMessage.lastName}</span>
                    </div>
                    <div className='employee_form_button'>
                        <button
                            type='button'
                            onClick={this.handleSave}
                            disabled={this.state.disabled}
                        >Save
                        </button>
                        <button
                            type='button'
                            onClick={this.props.onCancel}
                        >Cancel
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default EmployeeFormAdd;