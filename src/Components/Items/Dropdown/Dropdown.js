import React from 'react';
import Select, { components } from 'react-select';
import Label from '../Label/Label';

import arrow from '../Icons/caret-down.svg';

const DropdownIndicator = props => {
    return (
        <components.DropdownIndicator {...props}>
            <img src={arrow} alt=""/>
        </components.DropdownIndicator>
    );
};

const Dropdown = ({label, style, options, name, onChange, defaultValue, valid = false }) => {

    const colorStyles = {
        control: (styles) => {
            return {
                ...styles,
                backgroundColor: '#FAFAFB',
                boxSizing: 'border-box',
                height: 32,
                minHeight: 32,
                width: 408,
                marginTop: '8px',
                marginBottom: '14px',
                border: valid ? '1px solid #BFBFBF' : '1px solid #DA1414',
                padding: '0 0 3px',
                boxShadow: 'none',
                cursor: 'pointer',
                outline: 'none',
                '&:active': {
                    outline: 0,
                    outlineOffset: 0
                },
                '&:hover': {
                    outline: 0,
                    outlineOffset: 0
                },
                '&:focus': {
                    outline: 0,
                    outlineOffset: 0
                }
            }
        },

        placeholder: (styles,) => {
            return {
                ...styles,
                paddingBottom: '3px',
            }

        },

        option: (styles, { isFocused }) => {
            return {
                ...styles,
                background: isFocused ? '#E3E3E3' : '#FFFFFF',
                cursor: isFocused ? 'pointer' : '',
                lineHeight: 2,
                borderRadius: '3px',
                color: '#383838',
                fontSize: 14,
                fontFamily: 'Helvetica Neue, sans-serif',
                '&:active': {
                    background: '#E3E3E3'
                },
            };
        },

    };

    return (
        <div>
            <Label label={label}/>
            <Select
                components={{
                    IndicatorSeparator: () => null, DropdownIndicator
                }}
                options={options}
                name={name}
                onChange={onChange}
                styles={colorStyles}
                style={style}
                placeholder={defaultValue}
                isSearchable={false}
            />
        </div>
    )
}
export default Dropdown;

