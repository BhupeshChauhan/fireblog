import { Box, Grid, Tab, Tabs, Typography } from '@mui/material'
import { GridToolbarQuickFilter } from '@mui/x-data-grid';
import React from 'react'
import { Button } from 'react-bootstrap';
import DataTable from '../../Components/DataTable';
import FullScreenDialog from '../../Components/FullScreenDialog';
import StandardTextField from '../../Components/StandardTextField';
import { useFirebase } from '../../Context/FirebaseContext';
import { useMainContext } from '../../Context/MainContext';
import { useUserAuth } from '../../Context/UserAuthContext';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            {children}
          </Box>
        )}
      </div>
    );
}

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  function Toolbar() {

    const {  
        setFullScreenDialogOpen, 
    } = useMainContext();

    const handleClicksetFullScreenDialogOpen = () => {
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
        <Button variant="warning" onClick={handleClicksetFullScreenDialogOpen} style={{marginLeft: "5px", padding: "9px 15px"}}>Add New</Button>
      </Box>
    );
}
function ActionButtons1() {
    const { user } = useUserAuth();
    const {  
        setFullScreenDialogOpen, 
        CategoryTitle, 
        UpdateCategory, 
        setUpdateCategory, 
        CategoryID, 
        setCategoryID, 
        CategoryDescription, 
        setCategoryTitle 
    } = useMainContext();
    const {  CategoryData, setCategory, updateCategory } = useFirebase();
    const handlesetFullScreenDialogClose = () => {
        setUpdateCategory(false);
        setFullScreenDialogOpen(false);
        setCategoryID("");
        setCategoryTitle("");
    };
    const handlePublishCategory = () => {
        const uid = CategoryData.length + 1;
        const date = new window.Date();
        const data = {
            id: uid,
            CategoryTitle: CategoryTitle,
            CategoryDescription: CategoryDescription,
            addedBy: user.Username,
            DateTime: date
        }
        setCategory(uid.toString(), data)
        setFullScreenDialogOpen(false);
    }
    const handleUpdateCategory = () => {
        const data = {
            CategoryTitle: CategoryTitle,
            CategoryDescription: CategoryDescription,
        }
        updateCategory(CategoryID.toString(), data)
        setUpdateCategory(false);
        setCategoryID("");
        setCategoryTitle("");
        setFullScreenDialogOpen(false);
    }
    return (
        <>
            <Button variant="outline-dark" onClick={handlesetFullScreenDialogClose} style={{marginRight: "10px"}}>
              Cancel
            </Button>
            {UpdateCategory === false ? <Button variant="dark" onClick={handlePublishCategory} style={{marginRight: "10px"}}>
              Publish Category
            </Button> : <Button variant="dark" onClick={handleUpdateCategory} style={{marginRight: "10px"}}>
              Update Category
            </Button>}
            
        </>
    );
}
function ActionButtons2() {

    const { user } = useUserAuth();
    const {  setFullScreenDialogOpen, TagTitle, UpdateTag, setUpdateTag, TagID, setTagID, setTagTitle } = useMainContext();
    const {  TagData, setTag, updateTag } = useFirebase();
    const handlesetFullScreenDialogClose = () => {
        setUpdateTag(false);
        setFullScreenDialogOpen(false);
        setTagID("");
        setTagTitle("");
    };
    const handlePublishTag = () => {
        const uid = TagData.length + 1;
        const date = new window.Date();
        const data = {
            id: uid,
            TagTitle: TagTitle,
            addedBy: user.Username,
            DateTime: date
        }
        setTag(uid.toString(), data)
        setFullScreenDialogOpen(false);
    }
    const handleUpdateTag = () => {
        const data = {
            TagTitle: TagTitle,
        }
        updateTag(TagID.toString(), data)
        setUpdateTag(false);
        setTagID("");
        setTagTitle("");
        setFullScreenDialogOpen(false);
    }
    return (
        <>
            <Button variant="outline-dark" onClick={handlesetFullScreenDialogClose} style={{marginRight: "10px"}}>
              Cancel
            </Button>
            {UpdateTag === false ? <Button variant="dark" onClick={handlePublishTag} style={{marginRight: "10px"}}>
              Publish Tag
            </Button> : <Button variant="dark" onClick={handleUpdateTag} style={{marginRight: "10px"}}>
              Update Tag
            </Button>}
            
        </>
    );
}
function AddNewCategory() {
    const { 
        CategoryTitle,
        OnCategoryTitleChange,
        CategoryDescription, 
        OnsetCategoryDescriptionChange,
    } = useMainContext();

    return (
      <Box
        sx={{
          p: 1,
          pt: 3,
          pb: 0,
        }}
      >
            <Grid container spacing={2}>
                <Grid item xs={9} style={{width: "70%"}}>
                    <StandardTextField label="Category Title" value={CategoryTitle} onChange={OnCategoryTitleChange} fullWidth />
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
                        <StandardTextField label="Category Description" value={CategoryDescription} onChange={OnsetCategoryDescriptionChange} fullWidth multiline rows={4} />
                    </Box>
                </Grid>
            </Grid>  
        </Box>
    );
}

function AddNewTag() {
    const {
        TagTitle,
        OnTagTitleChange,
    } = useMainContext();
    return (
      <Box
        sx={{
          p: 1,
          pt: 3,
          pb: 0,
        }}
        style={{width: "70%"}}
      >
            <StandardTextField label="Tag Title" value={TagTitle} onChange={OnTagTitleChange} fullWidth />
        </Box>
    );
}

const BlogSettings = () => {
    const { 
        setFullScreenDialogOpen, 
        setCategoryTitle, 
        setUpdateCategory, 
        setCategoryID,
        setTagTitle, 
        setUpdateTag, 
        setTagID,
        setCategoryDescription,
    } = useMainContext();
    const { CategoryData, deleteCategory, TagData, deleteTag } = useFirebase();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const columns1 = [
        { field: 'id', width: 100,headerName: 'Category ID', },
        { 
            field: 'Actions', 
            headerName: 'Actions', 
            flex: 1,
            minWidth: 200,
            renderCell: (params) => {
                const category = params.row
                const handleEditClick = () => {
                    setCategoryID(category.id)
                    setCategoryTitle(category.CategoryTitle)
                    setCategoryDescription(category.CategoryDescription)
                    setUpdateCategory(true)
                    setFullScreenDialogOpen(true)
                }
                const handleDelClick = () => {
                    deleteCategory(category.id.toString())
                }
                return (
                    <>
                    <Button variant="warning" onClick={handleEditClick} style={{marginRight: "5px"}}>Edit</Button>
                    <Button variant="outline-danger" onClick={handleDelClick}>Delete</Button>
                    </>
                )
            }, 
        },
        { field: 'CategoryTitle', flex: 1, minWidth: 200, maxWidth: 300, headerName: 'Category Title'}, 
        { field: 'addedBy', flex: 1, minWidth: 200, maxWidth: 300, headerName: 'Added By'}
    ]

    const columns2 = [
        { field: 'id', width: 100,headerName: 'Tag ID', },
        { 
            field: 'Actions', 
            headerName: 'Actions', 
            flex: 1,
            minWidth: 200,
            renderCell: (params) => {
                const Tag = params.row
                const handleEditClick = () => {
                    setTagID(Tag.id)
                    setTagTitle(Tag.TagTitle)
                    setUpdateTag(true)
                    setFullScreenDialogOpen(true)
                }
                const handleDelClick = () => {
                    deleteTag(Tag.id.toString())
                }
                return (
                    <>
                    <Button variant="warning" onClick={handleEditClick} style={{marginRight: "5px"}}>Edit</Button>
                    <Button variant="outline-danger" onClick={handleDelClick}>Delete</Button>
                    </>
                )
            }, 
        },
        { field: 'TagTitle', flex: 1, minWidth: 200, maxWidth: 300, headerName: 'Tag Title'}, 
        { field: 'addedBy', flex: 1, minWidth: 200, maxWidth: 300, headerName: 'Added By'}
    ]
    return (
        <div>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Blog Categories" {...a11yProps(0)} />
                <Tab label="Blog Tags" {...a11yProps(1)} />
            </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Box sx={{ height: 700}}>
                    <FullScreenDialog title="Add a New Category" ActionButtons={<ActionButtons1 />}>
                        <AddNewCategory />
                    </FullScreenDialog>
                    <DataTable rows={CategoryData} columns={columns1} Toolbar={Toolbar}/>
                </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Box sx={{ height: 700}}>
                    <FullScreenDialog title="Add a New Tag" ActionButtons={<ActionButtons2 />}>
                        <AddNewTag />
                    </FullScreenDialog>
                    <DataTable rows={TagData} columns={columns2} Toolbar={Toolbar}/>
                </Box>
            </TabPanel>
            <TabPanel value={value} index={2}>
            Item Three
            </TabPanel>
        </div>
    )
}

export default BlogSettings