import React from 'react';
import PropTypes from 'prop-types';
import Label from "../Label";

/** Opinionated Text input to enforce consistency */
function TextInput({htmlId, name, label, type = "text", required = false, onChange, placeholder, value, error, children, ...props}) {
    return (
        <div style={{marginBottom: 16}}>
            <Label htmlFor={htmlId} label={label} required={required}/>
            <input
                id={htmlId}
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                style={error && {border: 'solid 1px red'}}
                {...props}/>
            {children}
            {error && <div className="error" style={{color: 'red'}}>{error}</div>}
        </div>
    );
}

TextInput.propTypes = {
    /** Unique HTML ID. Used for tying label to html input. */
    htmlId: PropTypes.string.isRequired,

    /** Input name, should match the objects' property */
    name: PropTypes.string.isRequired,

    /** Input label */
    label: PropTypes.string.isRequired,

    /** Input type */
    type: PropTypes.oneOf(['text', 'number', 'password']),

    /** Mark with asterisk if true */
    required: PropTypes.bool,

    /** function that triggers when change occurs int the input field */
    onChange: PropTypes.func,

    /** Default value to display when empty */
    placeholder: PropTypes.string,

    value: PropTypes.any,

    /** String to display if errors occur */
    error: PropTypes.string,

    /** Child component(s) that might be passed in with the other props */
    children: PropTypes.node
};

export default TextInput;