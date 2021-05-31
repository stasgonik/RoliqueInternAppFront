import Modal from 'react-modal';
import Select from "react-select";
import React, {useRef, useState} from "react";
import plus from "../../../img/Create_Campaing/Icon.svg";
import classes from "../../Create_Campaign/Create_Campaign.module.css";
import classesModal from '../Modal_PopUp/Modal.module.css';

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
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }
};

function Modal_PopUp() {
    const fileInput = useRef(null);
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [values, setValues] = useState({
        avatar: '',
    });

    const selected = (e) => {
        let img = e.target.files[0];
        if (!img) {
            setValues({...values, avatar: ''})
            return
        }
        img.preview = URL.createObjectURL(img)
        setValues({...values, [e.target.name]: img})
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
                />
                <p className={classes.profile}>Logo</p>
                <input type='file'
                       name='avatar'
                       style={{display: 'none'}}
                       onChange={(e) => selected(e)}
                       ref={fileInput}

                />
                <button className={classes.avatar} onClick={() => fileInput.current.click()}>
                    {values.avatar ? <img src={values.avatar.preview} style={{
                        width: 64,
                        height: 64,
                        borderRadius: 50
                    }} alt={'alt'}/> : '+'}
                </button>
                <div className={classesModal.modalFlex}>
                    <div className={classesModal.orange}><span>Create Brand</span></div>
                    <div className={classesModal.grey} onClick={() => setModalIsOpen(false)}><span>Cancel</span></div>
                </div>
            </Modal>
        </div>
    );
}

export default Modal_PopUp;
