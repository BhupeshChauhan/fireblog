import * as React from 'react';
import Box from '@mui/material/Box';
import { GridToolbarQuickFilter } from '@mui/x-data-grid';
import { useMainContext } from '../../Context/MainContext';
import { Button } from 'react-bootstrap';
import DataTable from '../../Components/DataTable';
import FullScreenDialog from '../../Components/FullScreenDialog';
import { Accordion, AccordionDetails, AccordionSummary, Alert, AlertTitle, FormControlLabel, FormGroup, Grid, IconButton, Switch, Typography } from '@mui/material';
import StandardTextField from '../../Components/StandardTextField';
import RichtextBox from '../../Components/RichtextBox';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useFirebase } from '../../Context/FirebaseContext';
import MultipleSelect from '../../Components/MultipleSelect';
import Media from './Media';
import StandardDialog from '../../Components/StandardDialog';
import { useUserAuth } from '../../Context/UserAuthContext';
import ToastAleart from '../../Components/ToastAleart';
import { v4 } from 'uuid';
import { Publish } from '@mui/icons-material';

function Toolbar() {

    const {  
        setFullScreenDialogOpen, 
        setEditorStateBlog,
        setBlogId,
        setBlogTitle,
        setBlogDescription,
        setFeatured,
        setFeatureImage,
        setCategories,
        setTags,
        setUpdateBlog
    } = useMainContext();

    const handleClicksetFullScreenDialogOpen = () => {
        setEditorStateBlog("<p>Enter text Here!</p>")
        setBlogId("")
        setBlogTitle("Enter Blog Title")
        setBlogDescription("Enter Blog Description")
        setFeatureImage(null)
        setFeatured(false)
        setCategories([])
        setTags([])
        setUpdateBlog(false)
        setFullScreenDialogOpen(true);
    };
    return (
      <Box
        sx={{
          p: 1,
          pt: 1.5,
          pb: 0,
        }}
        style={{textAlign: "right"}}
      >
        <GridToolbarQuickFilter style={{ border: "1px", borderStyle: "solid", borderRadius: "5px", padding: "5px", borderColor: "#c4c4c4"}}/>
        <Button variant="warning" onClick={handleClicksetFullScreenDialogOpen} style={{marginLeft: "5px", padding: "9px 15px"}}>Add New Blog</Button>
      </Box>
    );
}
function ActionButtons() {
    const {  
        setFullScreenDialogOpen, 
        EditorStateBlog, 
        BlogTitle, 
        BlogDescription, 
        FeatureImage, 
        Categories, 
        Tags, 
        Featured,
        setOpenToast,
        setToastTitle, 
        setToastDes, 
        UpdateBlog, 
        setUpdateBlog,
        BlogId,
    } = useMainContext();

    const handlesetFullScreenDialogClose = () => {
        setFullScreenDialogOpen(false);
        setUpdateBlog(false)
      };

    const { BlogData, setBlog, updateBlog } = useFirebase();
    const { user } = useUserAuth();

    const uuid = v4()
    const data = {
        id: BlogData.length + 1, 
        BlogTitle: BlogTitle,
        BlogContent: EditorStateBlog,
        BlogDescription: BlogDescription,
        FeatureImage: FeatureImage,
        FeatureImageUrl: FeatureImage?.fileUrl,
        Categories: Categories,
        Tags: Tags,
        Featured: Featured,
        Author: user.Username,
        DateTime: new window.Date(),
        uid: uuid,
        Status: "Published",
    }
    const data1 = {
        id: BlogData.length + 1, 
        BlogTitle: BlogTitle,
        BlogContent: EditorStateBlog,
        BlogDescription: BlogDescription,
        FeatureImage: FeatureImage,
        FeatureImageUrl: FeatureImage?.fileUrl,
        Categories: Categories,
        Tags: Tags,
        Featured: Featured,
        Author: user.Username,
        DateTime: new window.Date(),
        uid: uuid,
        Status: "Draft",
    }
    const data2 = {
        BlogTitle: BlogTitle,
        BlogContent: EditorStateBlog,
        BlogDescription: BlogDescription,
        FeatureImage: FeatureImage,
        FeatureImageUrl: FeatureImage?.fileUrl,
        Categories: Categories,
        Tags: Tags,
        Featured: Featured,
        Status: "Published",
    }
    const data3 = {
        BlogTitle: BlogTitle,
        BlogContent: EditorStateBlog,
        BlogDescription: BlogDescription,
        FeatureImage: FeatureImage,
        FeatureImageUrl: FeatureImage?.fileUrl,
        Categories: Categories,
        Tags: Tags,
        Featured: Featured,
        Status: "Draft",
    }
    const handleBlogPublish = () => {
        
        if(BlogTitle === "" || BlogTitle === "Enter Blog Title"){
            setToastTitle("Error")
            setToastDes("Please! Add a appropriate blog Title. ")
            setOpenToast(true)
        } else if(EditorStateBlog === "" || EditorStateBlog === "<p>Enter text Here!</p>"){
            setToastTitle("Error")
            setToastDes("Please! Add a appropriate blog content. ")
            setOpenToast(true)
        } else if(BlogDescription === "" || BlogDescription === "Enter Blog Description"){
            setToastTitle("Error")
            setToastDes("Please! Add a appropriate blog content. ")
            setOpenToast(true)
        } else if(FeatureImage === ""){
            setToastTitle("Error")
            setToastDes("Please! Select Feature Image ")
            setOpenToast(true)
        } else if(Categories.label === 0){
            setToastTitle("Error")
            setToastDes("Please! Select Categories ")
            setOpenToast(true)
        } else if(Tags.label === 0){
            setToastTitle("Error")
            setToastDes("Please! Select Tags")
            setOpenToast(true)
        }
        else {
            setBlog(uuid, data)
            handlesetFullScreenDialogClose()
        }
    }
    const handleBlogDraft = () => {
        if(BlogTitle === "" || BlogTitle === "Enter Blog Title"){
            setToastTitle("Error")
            setToastDes("Please! Add a appropriate blog Title. ")
            setOpenToast(true)
        } else if(EditorStateBlog === "" || EditorStateBlog === "<p>Enter text Here!</p>"){
            setToastTitle("Error")
            setToastDes("Please! Add a appropriate blog content. ")
            setOpenToast(true)
        } else if(BlogDescription === "" || BlogDescription === "Enter Blog Description"){
            setToastTitle("Error")
            setToastDes("Please! Add a appropriate blog content. ")
            setOpenToast(true)
        } else if(FeatureImage === ""){
            setToastTitle("Error")
            setToastDes("Please! Select Feature Image ")
            setOpenToast(true)
        } else if(Categories.label === 0){
            setToastTitle("Error")
            setToastDes("Please! Select Categories ")
            setOpenToast(true)
        } else if(Tags.label === 0){
            setToastTitle("Error")
            setToastDes("Please! Select Tags")
            setOpenToast(true)
        }
        else {
            setBlog(uuid, data1)
            handlesetFullScreenDialogClose()
        }
    }
    const handleEditBlogPublish = () => {
        updateBlog(BlogId, data2)
        setUpdateBlog(false)
        handlesetFullScreenDialogClose()
    }
    const handleEditBlogDraft = () => {
        updateBlog(BlogId, data3)
        setUpdateBlog(false)
        handlesetFullScreenDialogClose()
    }
    return (
        <>
            <Button variant="outline-dark" onClick={handlesetFullScreenDialogClose} style={{marginRight: "10px"}}>
              Cancel
            </Button>
            <Button variant="outline-dark" onClick={UpdateBlog === false ?  handleBlogDraft : handleEditBlogDraft} style={{marginRight: "10px"}}>
              Save as draft
            </Button>
            <Button variant="dark" onClick={UpdateBlog === false ? handleBlogPublish : handleEditBlogPublish} style={{marginRight: "10px"}}>
              Publish Blog Post
            </Button>
        </>
    );
}
function AddNewBlog() {
    const {  
        setEditorStateBlog, 
        BlogTitle,
        OnBlogTitleChange,
        BlogDescription,
        OnBlogDescriptionChange,
        Featured,
        OnFeaturedChange,
        FeatureImage,
        setStandardDialogOpen,
        setCategories,
        Categories,
        setTags,
        Tags,
        EditorStateBlog
    } = useMainContext();

    const { setPopupGallery, CategoryData, TagData, } = useFirebase();
    const [expanded, setExpanded] = React.useState('panel1');
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
      };
    const OnClickOpenGallery = () => {
        setPopupGallery(true)
        setStandardDialogOpen(true)
    }
    console.log(TagData, "tag")
    return (
      <Box
        sx={{
          p: 1,
          pt: 1.5,
          pb: 0,
        }}
      >
      <ToastAleart severity="error" />
            <Grid container spacing={2}>
                
                <Grid item xs={9}>
                    <StandardTextField label="Blog Title" value={BlogTitle} onChange={OnBlogTitleChange} fullWidth />
                    <div style={{marginTop: "10px"}}>
                    <p className='EditorLabel' >Write Your Blog Here!</p>
                    <RichtextBox setEditorState={setEditorStateBlog} EditorState={EditorStateBlog} />
                    </div>
                </Grid>
                <Grid item xs={3}>
                    <Box
                        sx={{
                        p: 1,
                        pt: 1.5,
                        pb: 2,
                        }}
                        style={{background: "#f7f7f7", borderRadius: "5px"}}
                    >
                        <StandardTextField label="Blog Description" value={BlogDescription} onChange={OnBlogDescriptionChange} fullWidth multiline rows={4} />
                    </Box>
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                            <Typography>Preview Image</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        {FeatureImage === null ? 
                        <img src="https://firebasestorage.googleapis.com/v0/b/reactfireauth-461a3.appspot.com/o/affd16fd5264cab9197da4cd1a996f820e601ee4.png?alt=media&token=912c2608-fa01-478f-a3bf-d982b04be366" style={{height: "150px", width: "200px"}}/> 
                        : 
                        <img src={FeatureImage.fileUrl} style={{height: "120px", width: "200px"}}/> 
                        }
                        
                        <br />
                        File Name: <span style={{color: "#0f0f0f", fontSize: "14px"}}>{FeatureImage?.fileName} </span>
                        <br />
                        <br />
                        <Button 
                            variant="outline-dark" 
                            onClick={OnClickOpenGallery} 
                            style={{marginRight: "10px"}}
                        >
                            Choose From Gallery
                        </Button>
                        <StandardDialog title="Image Gallery">
                            <Media />
                        </StandardDialog>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        >
                            <Typography>Categories</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <MultipleSelect title="Select" data={CategoryData} value={Categories} setValue={setCategories} name="CategoryTitle"/>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        >
                            <Typography>Tags</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <MultipleSelect title="Select" data={TagData} value={Tags} setValue={setTags} name="TagTitle"/>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        >
                            <Typography>Featured</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <FormGroup>
                                <FormControlLabel 
                                    control={<Switch checked={Featured} onChange={OnFeaturedChange} />} 
                                    label="Show Featured Blog Post" 
                                />
                            </FormGroup>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>   
        </Box>
    );
}
export default function BlogData() {
    const { 
        setFullScreenDialogOpen, 
        setBlogTitle, 
        setUpdateBlog,
        setEditorStateBlog,
        setBlogDescription,
        setFeatureImage,
        setCategories,
        setTags,
        setFeatured,
        setBlogId,
    } = useMainContext();
    const { BlogData, deleteBlog } = useFirebase();

    const columns = [
        { field: 'id', width: 70,headerName: 'Blog ID', },
        { 
            field: 'Actions', 
            headerName: 'Actions', 
            flex: 1,
            minWidth: 200,
            renderCell: (params) => {
                const blog = params.row
                const handleEditClick = () => {
                    setBlogTitle(blog.BlogTitle)
                    setEditorStateBlog(blog.BlogContent)
                    setBlogDescription(blog.BlogDescription)
                    setFeatureImage(blog.FeatureImage)
                    setCategories(blog.Categories)
                    setTags(blog.Tags)
                    setFeatured(blog.Featured)
                    setUpdateBlog(true)
                    setFullScreenDialogOpen(true)
                    setBlogId(blog.uid)
                }
                const handleDelClick = () => {
                    console.log("Edit Clicked")
                }
                return (
                    <>
                    <Button variant="warning" onClick={handleEditClick} style={{marginRight: "5px"}}>Edit</Button>
                    <Button variant="outline-danger" onClick={handleDelClick}>Delete</Button>
                    </>
                )
            }, 
        },
        {   field: 'FeatureImageUrl', 
            flex: 1, 
            minWidth: 200, 
            maxWidth: 300, 
            maxHeight: 100,
            headerName: 'Preview Image',
            renderCell: (params) => {
                const blog = params.row
                return (
                    <>
                    <img src={blog.FeatureImageUrl} alt={blog.FeatureImage.fileName} style={{height: "80px", width: "100px", padding: "5px"}}/>
                    </>
                )
            }, 
        }, 
        { field: 'Status', flex: 1, minWidth: 200, maxWidth: 300, headerName: 'Status'}, 
        { field: 'BlogTitle', width: 200,headerName: 'Blog Title' }, 
        { field: 'BlogDescription', width: 200,headerName: 'Blog Description' }, 
        { field: 'Featured', width: 200,headerName: 'Featured' }, 
        { field: 'Categories', width: 200, headerName: 'Categories' },
        { field: 'Tags', width: 200, headerName: 'Tags', }
    ]
    
    return (
        <Box sx={{ height: 700}}>
            <FullScreenDialog title="Add a New Blog" ActionButtons={<ActionButtons />}>
                <AddNewBlog />
            </FullScreenDialog>
            <DataTable rows={BlogData} columns={columns} Toolbar={Toolbar}/>
        </Box>
    );
}
