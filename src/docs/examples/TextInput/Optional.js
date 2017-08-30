import React,{Component} from "react";
import TextInput from "components/TextInput";

/** Optional input example */
export default class Optional extends Component {
    render() {
        return (
            <TextInput
                htmlId="example-optional"
                name="firstname"
                label="First Name"
                required={false}
            />
        )
    }
}