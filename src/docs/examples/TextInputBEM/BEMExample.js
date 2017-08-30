import React,{Component} from "react";
import TextInputBEM from "components/TextInputBEM";

/** Required input example with error and BEM css */
export default class BEMExample extends Component {
    render() {
        return (
            <TextInputBEM
                htmlId="example-error"
                name="firstname"
                label="First Name"
                required
                error="First name is required."
            />
        )
    }
}