import RegistrationForm from "components/RegistrationForm";
import React,{Component} from "react";

export default class ExampleRegisterForm extends Component {
    onSubmit = (user) => {
        console.log(user);
    };

    render() {
        return <RegistrationForm onSubmit={this.onSubmit}/>
    }
}