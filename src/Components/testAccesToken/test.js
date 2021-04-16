import React, {Component} from 'react';
import './test.css';
import userService from '../../Services/userService';


class Test extends Component {
    state = {
        users: [],
        selectedFile: null,
        uploadFileName: null,
        imgUrl:null
    }

    // INPUT START
    selectedFile = elem => {
        let img = elem.target.files[0];
        img.preview = URL.createObjectURL(img)
        this.setState({
            selectedFile: img
        });
        this.setState({
            uploadFileName: elem.target.files[0]
        })
    }

    // INPUT END

    fileUploadButton = async () => {
        const fd = new FormData();
        fd.append('image', this.state.selectedFile,this.state.selectedFile.name);
        await userService.postUsers(fd);

    }

    checkBackground = () => {
        if (this.selectedFile) {
            this.setState({
                imgUrl: this.selectedFile.preview
            })
        }
    }

    componentDidMount() {
        userService.getUsers().then(value => this.setState({users: value}));
    }


    render() {
        let {selectedFile} = this.state
        return (
            <div className={'test-main-div'}>

                <input type={'file'}
                       style={{display:'none'}}
                       onChange={this.selectedFile}
                       ref={fileInput => this.fileInput = fileInput}
                />

                <button
                    className={'avatar'}
                    onClick={()=> this.fileInput.click()}>
                    {selectedFile? <img src={selectedFile.preview} style={{
                        width: 64,
                        height: 64,
                        borderRadius: 50
                    }}/> : '+'}
                </button>

                {/*SAVE CHANGES BUTTON*/}
                <button className={'save-changes'}
                        onClick={this.fileUploadButton}>
                    Save changes
                </button>

            </div>
        );
    }

}

export default Test;

// import React, { useState } from "react"
// import { useDropzone } from "react-dropzone"
//
// function App() {
//     const [files, setFiles] = useState([])
//     console.log(files)
//
//     const { getRootProps, getInputProps } = useDropzone({
//         accept: "image/*",
//         onDrop: (acceptedFiles) => {
//             setFiles(
//                 acceptedFiles.map((file) =>
//                     Object.assign(file, {
//                         preview: URL.createObjectURL(file),
//                     })
//
//                 )
//             )
//             console.log(files)
//         },
//     })
//
//     const images = files.map((file) => (
//         <div key={file.name}>
//             <div>
//                 <img src={file.preview} style={{ width: "200px" }} alt="preview" />
//             </div>
//         </div>
//     ))
//
//     return (
//
//         <div className="App">
//             <div {...getRootProps()}>
//                 <input {...getInputProps()} />
//                 <p>Drop files here</p>
//             </div>
//             <div>{images}</div>
//         </div>
//     )
// }
//
// export default App
