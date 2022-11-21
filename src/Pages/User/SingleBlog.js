import { Grid } from '@mui/material';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import VerticalCard from '../../Components/VerticalCard'
import { useFirebase } from '../../Context/FirebaseContext';
import { db } from '../../Firebase';

const SingleBlog = () => {
    const [BlogDoc, setBlogDoc] = useState("")
    const { BlogData } = useFirebase();
    const path = window.location.pathname;
    const uid = path.replace('/Blog/', '');
    console.log(uid)
    useEffect(() => {
        const getBlog = async () => { 
            const BlogDoc = doc(db, "Blogs", uid)
            getDoc(BlogDoc).then((docs) => {
                setBlogDoc(docs.data())
            });
        }
        return () => {
            getBlog()
        };
    }, []);

  return (
    <div>
        <div className='BlogToolBar'>
            
        </div>
        <div className='container' 
            style={{
                marginTop: "30px",
                marginBottom: "30px",
            }}
        >
            <Grid container>
                <Grid 
                    item 
                    xs={12} 
                >
                    <img 
                        src={BlogDoc?.FeatureImage?.fileUrl}  
                        width="100%" 
                        height="440px" 
                        style={{
                            marginTop: "30px",
                            marginBottom: "30px",
                        }}
                    />
                    <h1>{BlogDoc.BlogTitle}</h1>
                    <p 
                        style={{
                            marginBottom: "50px",
                            fontSize: "10px !important",
                        }}
                    >{BlogDoc.BlogDescription}</p>
                    <div dangerouslySetInnerHTML={{ __html: BlogDoc.BlogContent }} 
                    />
                </Grid>
            </Grid>
        </div>
    </div>
  )
}

export default SingleBlog