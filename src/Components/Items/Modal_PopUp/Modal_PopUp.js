import React, {useRef, useState} from "react";
import Modal from 'react-modal';

import BrandService from "../../../Services/brand.service";
import plus from "../../../img/Create_Campaign/Icon.svg";
import classes from "../../Create_Campaign/Create_Campaign.module.css";
import classesModal from '../Modal_PopUp/Modal.module.css';
import {INFO} from "../../../Constants/messages";

Modal.setAppElement('#root');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        width: '432px',
        height: '319px',
        transform: 'translate(-50%, -50%)',
        borderRadius: '6px',
        overflow: 'hidden'

    },
    overlay: {
        position: 'fixed',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }
};

const Modal_PopUp = ({ loadBrands } ) => {
    const fileInput = useRef(null);
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [values, setValues] = useState({
        logo: '',
    });
    const [errors, setErrors] = useState({})

    const handleNameChange = (e) => {
        e.preventDefault();
        const value = e.target.value
        let er = errors;
        if (!value || value === '') {
            er.name = INFO.EMPTY_FIELD;
        } else if(er.name) {
            delete er.name;
        }

        setErrors({...er})
        setValues({...values, name: value})
    };

    const selected = (e) => {
        let img = e.target.files[0];
        if (!img) {
            setValues({...values, avatar: ''})
            return
        }
        img.preview = URL.createObjectURL(img)
        setValues({...values, [e.target.name]: img})
    }

    const send = async (e) => {
        e.preventDefault()
        const formData = new FormData();

        if (values['logo'] === "") {
            delete values['logo']
        }

        for (const value in values) {
            formData.append(value, values[value])
        }

        let av = values['logo'] ? values['logo'] : "";
        setValues({...values, logo: av})

        if(!errors.name && !errors.logo) {
            const result = await BrandService.postBrands(formData)
            if (result) {
                if (result.status === 200) {
                    await loadBrands();
                    setModalIsOpen(false);
                    return;
                }
                if (typeof result.data !== "undefined") {
                    if (result.data.customCode === 40010) {
                        setErrors({name: INFO.BRAND_ALREADY_EXIST})
                        return;
                    }
                    if (result.data.customCode === 4005) {
                        setErrors({logo: INFO.TOO_BIG_PHOTO})
                        return;
                    }
                }

                if (result.status === 500) {
                    setErrors({name: INFO.SERVER_ERROR});
                    console.log(result);
                    return
                }

                if (result.status !== 200) {
                    setErrors({name: INFO.UNKNOWN_ERROR});
                    console.log(result);
                }
            }
        }

    }


    return (
        <div className={'modal'}>
            <div onClick={() => setModalIsOpen(true)}>
                <img src={plus} alt={'plus'}/>
                <label className={classes.orangeText}>Add New Brand</label>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                style={customStyles}
            >
                <p className={classesModal.pStyle}>Add new Brand</p>
                <label className={classes.input_title}>Name</label>
                <input className={classes.input_info_valid}
                       type='text'
                       name='name'
                       onInput={(e) => handleNameChange(e)}
                />

                {errors.name && errors.name.length ?
                    <div className={classes.errorDiv}>{errors.name}</div> : ''}

                <p className={classes.profile}>Logo</p>
                <input type='file'
                       name='logo'
                       style={{display: 'none'}}
                       onChange={(e) => selected(e)}
                       ref={fileInput}

                />
                <button className={classes.avatar} onClick={() => fileInput.current.click()}>
                    {values.logo ? <img src={values.logo.preview} style={{
                        width: 64,
                        height: 64,
                        borderRadius: 50
                    }} alt={'alt'}/> : '+'}
                </button>

                {errors.logo && errors.logo.length ?
                    <div className={classes.errorDiv}>{errors.logo}</div> : ''}

                <div className={classesModal.modalFlex}>
                    <div className={classesModal.orange} onClick={(e) => send(e)}><span>Create Brand</span></div>
                    <div className={classesModal.grey} onClick={() => setModalIsOpen(false)}><span>Cancel</span></div>
                </div>
            </Modal>
        </div>
    );
}

export default Modal_PopUp;
