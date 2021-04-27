import React from "react";
import "./Employees.css";
import EmployeeCard from "./EmployeeCard";
import EmployeeFormAdd from "./EmployeeFormAdd";

class Employees extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isFetching: true,
            data: [],
            isFormAdd: false
        }
    }

    componentDidMount() {
        fetch('https://reqres.in/api/users?per_page=12')
            .then(response => response.json())
            .then(result => this.setState({data: result.data, isFetching: false}))
            .catch(error => this.setState({isFetching: false, error: error}))
    }

    handleAdd = () => {
        this.setState({isFormAdd: true})
    }

    handleSave = (data) => {
       let id = this.state.data.reduce((acc, item) => item.id > acc ? item.id : acc, 0);
       data.id = ++id;

       const employees = [...this.state.data];
       employees.push(data);

       this.setState({data: employees})
    }

    handleCancel = () => {
        this.setState({isFormAdd: false});
    }

    handleRemove = (id) => {
        const filteredData = this.state.data.filter(item => {
            return (item.id !== id);
        });

        this.setState({data: filteredData})
    }

    render() {
        const {data, isFetching, error} = this.state;

        if (isFetching) {
            return <div>Loading...</div>
        }

        if (error) {
            return <div>{`Error: ${error}`}</div>
        }

        const employees = data.map(item =>
            <EmployeeCard
                key={item.id}
                id={item.id}
                fullName={`${item['first_name']} ${item['last_name']}`}
                onRemove={this.handleRemove}
            />
        );

        return (
            <div className='main_employees_container'>
                <div className='employees_list_container'>
                    <h2>Employees:</h2>
                    <ul className='employees_list'>
                        {employees}
                    </ul>
                    <button
                        type='button'
                        className='employees_button_add'
                        onClick={this.handleAdd}
                    >Add New Employee
                    </button>
                </div>
                <div className='employees_form_container'>
                    {this.state.isFormAdd && <EmployeeFormAdd onSave={this.handleSave} onCancel={this.handleCancel}/>}
                </div>
            </div>
        );
    }
}

export default Employees;