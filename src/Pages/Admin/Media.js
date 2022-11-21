import { Button, CircularProgress, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useFirebase } from '../../Context/FirebaseContext';
import { useMainContext } from '../../Context/MainContext';

const Media = () => {
    const {  
        FeatureImage,
        setFeatureImage,
        setStandardDialogOpen
    } = useMainContext();
    console.log(FeatureImage)
    const [SelectImage, setSelectImage] = useState(null)

    const { ImageSrc, OnImageSrcChange, uploadImage, ImageData, ImageLoading, PopupGallery } = useFirebase();

    console.log(ImageData)
    const onClickSelectImage = (item) => {
        setSelectImage(item)
    }
    const uploadSelectImage = () => {
        setFeatureImage(SelectImage)
        setStandardDialogOpen(false)
    }

    useEffect(() => {
      if(SelectImage === null) {
        setSelectImage(ImageData[0])
      }
    }, [])

  return (
    <Grid container style={{padding: 0}}>
        <Grid item xs={8} style={{height: "600px", background: "#f7f7f7", padding: "10px", border: "1px", borderStyle: "solid", borderColor: "#c4c4c4", borderRadius: "5px"}}>
            {ImageData.map((item) => (
                <Button key={item.uid} onClick={() => onClickSelectImage(item)}>
                    <img src={item.fileUrl} style={{height: "100px", width: "150px", margin: "0 10px 10px 0"}}/>
                </Button>
                )
            )}
        </Grid>
        <Grid item xs={4} style={{height: "600px", background: "#fff", padding: "10px"}}>
            Image Description
            <br />
            {SelectImage === null ? 
            <img src="https://firebasestorage.googleapis.com/v0/b/reactfireauth-461a3.appspot.com/o/affd16fd5264cab9197da4cd1a996f820e601ee4.png?alt=media&token=912c2608-fa01-478f-a3bf-d982b04be366" style={{height: "150px", width: "200px"}}/> 
            : 
            <img src={SelectImage.fileUrl} style={{height: "150px", width: "200px"}}/> 
            }
            
            <br />
            <br />
            File Name: <span style={{color: "#0f0f0f", fontSize: "14px"}}>{SelectImage?.fileName} </span>
            {PopupGallery === true ?
                <>
                <br />
                <div style={{marginTop: "10px", display: "flex", alignItems: "center"}}>
                    <Button variant='contained'  onClick={uploadSelectImage}>
                        {ImageLoading === true ? 
                        <CircularProgress style={{height: "15px", width: "15px", marginRight: "5px"}} /> 
                        : null}
                        Use This image
                    </Button>
                </div>
                </>
            : null}
            
            <br />
            <br />
            Upload Image
            <br />
            { ImageSrc !== "" ? <img src={URL.createObjectURL(ImageSrc)} style={{height: "150px", width: "200px"}}/> : <img src="https://firebasestorage.googleapis.com/v0/b/reactfireauth-461a3.appspot.com/o/affd16fd5264cab9197da4cd1a996f820e601ee4.png?alt=media&token=912c2608-fa01-478f-a3bf-d982b04be366" style={{height: "150px", width: "200px"}}/>}
            <br/>
            <div style={{marginTop: "10px", display: "flex", alignItems: "center"}}>
                <Button variant="outlined" component="label" sx={{mr: "10px"}}>
                    Select Image
                    <input hidden accept="image/*" multiple type="file" onChange={OnImageSrcChange}/>
                </Button>
                <Button variant='contained' disabled={ImageLoading} onClick={uploadImage}>
                    {ImageLoading === true ? 
                    <CircularProgress style={{height: "15px", width: "15px", marginRight: "5px"}} /> 
                    : null}
                    Upload Image
                </Button>
            </div>
        </Grid>
    </Grid>
  )
}

export default Media