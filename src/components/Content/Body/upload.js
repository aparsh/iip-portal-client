import { React, useState, useEffect } from 'react'
import './Body.css';
import axios from 'axios'
import { config } from '../../../global/config'
import download from 'downloadjs'
import {buffertoBlob} from '../../../global/fileBlob'
const Body = () => {
    const [name, setName] = useState("")
    const [file, setfile] = useState()
    const [savFile, setSavFile] = useState()

    const uploadFile = async () => {
        const data = new FormData();
        data.append("name", name);
        data.append("file", file);

        const resp = await axios.post(config.BASE_URL + "file/upload", data)
        console.log(resp.data)
        setSavFile(resp.data.file)
    };

    const downloadFile = async () => {
        
        // const blob = await buffertoBlob(savFile.buffer, savFile.contentType)
        // const blob = new Blob([new Uint8Array(savFile.buffer)]);
        const blob = await buffertoBlob(savFile.buffer, savFile.contentType)
        download(blob , 'savFile.pdf', "application/pdf");
    };

    return (
        <div className="bodyContainer">
            <form>
                <label htmlFor="file"></label>
                <input type="file"
                    id="file"
                    accept=".pdf"
                    onChange={event => setfile(event.target.files[0])}></input>
            </form>
            <button onClick={uploadFile}>Upload</button>
            <button onClick={downloadFile}>Download</button>
        </div>
    )
}
