import { CKEditor } from '@ckeditor/ckeditor5-react';
import React, { useState } from 'react'
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { storage } from '../Firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

class MyUploadAdapter {
    constructor(loader) {
      this.loader = loader;
    }
    // Starts the upload process.
    upload() {
      return this.loader.file.then(
        file =>
          new Promise((resolve, reject) => {
            const filename = `${file.name}`
            const ImageRef = ref(storage, `blogImages/${filename}`)
            uploadBytes(ImageRef, file).then(async (item) => {
                await getDownloadURL(item.ref).then((url) => {
                    resolve({
                        default: url
                    });
                })
          }).catch((err) => {
            reject(err)
          })
    }))
  }
}
  

const RichtextBox = ({setEditorState, EditorState}) => {
    return (
        <div className="App">
            <CKEditor
                    editor={ ClassicEditor }
                    data={EditorState}
                    onReady={editor => {
                        editor.plugins.get("FileRepository").createUploadAdapter = loader => {
                            return new MyUploadAdapter(loader);
                        };
                    }}
                    onChange={ ( e, editor ) => {
                        const data = editor.getData();
                        setEditorState(data)
                    } }
                />
        </div>
    );
}


export default RichtextBox;