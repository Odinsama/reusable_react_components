import React,{Component} from "react";
import TextInput from "components/TextInput";

/** Required input example with error */
export default class Error extends Component {
    render() {
        return (
            <TextInput
                htmlId="example-error"
                name="firstname"
                label="First Name"
                required
                error="First name is required."
            />
        )
    }
}