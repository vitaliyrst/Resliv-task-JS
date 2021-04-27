import React from "react";
import "./EmployeeCard.css";

class EmployeeCard extends React.Component {
    constructor(props) {
        super(props)
    }

    handleRemove = (id) => {
        this.props.onRemove(id);
    }

    render() {
        return (
            <li className='employee_card'>
                {this.props.fullName}
                <span
                    className='employee_card_remove'
                    onClick={this.handleRemove.bind(null, this.props.id)}
                />
            </li>
        );
    }
}

export default EmployeeCard;