import React, {useRef, useState} from 'react';
import Select, {components} from 'react-select';


import arrow from '../Icons/caret-down.svg';
import close from '../Icons/VisualEditor_-_Icon_-_Close_-_white.svg';

const DropdownIndicator = props => {
	return (
		<components.DropdownIndicator {...props}>
			<img src={arrow} alt=""/>
		</components.DropdownIndicator>
	);
};

const CampaignFilterDropdown = ({options, name, onChange}) => {
	const selectInputRef = useRef();
	const [hasValue, setHasValue] = useState(false)


	const colorStyles = {
		control: (styles) => {
			return {
				...styles,
				backgroundColor: '#FAFAFB',
				boxSizing: 'border-box',
				height: 32,
				minHeight: 32,
				width: 184,
				marginTop: 8,
				cursor: 'pointer',
				border: '1px solid #BFBFBF',
				boxShadow: 'none',
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
				paddingBottom: 7,
				color: 'rgba(56, 56, 56, 0.45)',
			}

		},

		option: (styles, {isFocused}) => {
			return {
				...styles,
				// background: isFocused ? '#E3E3E3' : '#FFFFFF',
				borderBottom: '1px solid #E3E3E3',
				cursor: isFocused ? 'pointer' : '',
				lineHeight: 2,
				borderRadius: '3px',
				// color: '#383838',
				fontSize: 14,
				fontFamily: 'Helvetica Neue, sans-serif',
				'&:active': {
					background: '#E3E3E3'
				},
			};
		},

	};

	const onClear = () => {
		selectInputRef.current.select.clearValue();
		setHasValue(false)
		onChange(name, '')
	};

	const onSelect = (e) => {
		if (e && e.value) {
			setHasValue(true)
			onChange(name, e.value)
		}
	}

	return (
		<div style={{display: 'flex', alignItems: 'center'}}>
			<Select
				components={{
					IndicatorSeparator: () => null, DropdownIndicator
				}}
				options={options}
				name={name}
				// onSelect={onSelect}
				onChange={(e) => onSelect(e)}
				styles={colorStyles}
				placeholder={'Select...'}
				isSearchable={false}
				ref={selectInputRef}
			/>

			{
				hasValue? <div style={{position: 'relative', width: 0, height: 0, bottom: '10px'}}>
						<div style={{borderRadius: '50%', backgroundColor: 'grey', padding: '1px', height: '15px', width: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '5px', marginTop: '6px', cursor: 'pointer'}} onClick={onClear}><img src={close} alt={'close'} width={'15px'}/></div> </div>
					: ''
			}

		</div>
	)
}
export default CampaignFilterDropdown;

