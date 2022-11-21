import { createContext, useContext, useState } from "react";

const MainContext = createContext();

export function MainContextProvider({ children }) {
  const [userData, setUserData] = useState([]);
  const [fullScreenDialogOpen, setFullScreenDialogOpen] = useState(false);
  const [StandardDialogOpen, setStandardDialogOpen] = useState(false);
  
  const [OpenToast, setOpenToast] = useState(false)
  const [ToastTitle, setToastTitle] = useState(false)
  const [ToastDes, setToastDes] = useState(false)

  const [EditorStateBlog, setEditorStateBlog] = useState("<p>Enter text Here!</p>");
  const [BlogId, setBlogId] = useState("");
  const [BlogTitle, setBlogTitle] = useState("Enter Blog Title");
  const [BlogDescription, setBlogDescription] = useState("Enter Blog Description");
  const [FeatureImage, setFeatureImage] = useState(null);
  const [Featured, setFeatured] = useState(false);
  const [Categories, setCategories] = useState([]);
  const [Tags, setTags] = useState([]);
  const [UpdateBlog, setUpdateBlog] = useState(false);

  const [CategoryID, setCategoryID] = useState("");
  const [CategoryTitle, setCategoryTitle] = useState("Enter Category Title");
  const [CategoryDescription, setCategoryDescription] = useState("Enter Category Description");
  const [UpdateCategory, setUpdateCategory] = useState(false);

  const [TagID, setTagID] = useState("");
  const [TagTitle, setTagTitle] = useState("Enter Tag Title");
  const [UpdateTag, setUpdateTag] = useState(false);

  const OnBlogTitleChange = (e) => {
    setBlogTitle(e.target.value)
  }
  const OnBlogDescriptionChange = (e) => {
    setBlogDescription(e.target.value)
  }
  const OnFeatureImageChange = (e) => {
    setFeatureImage(e.target.files[0])
  }
  const OnFeaturedChange = (e) => {
    setFeatured(!Featured)
  }
  const OnsetCategoryDescriptionChange = (e) => {
    setCategoryDescription(e.target.value)
  }
  const OnCategoryTitleChange = (e) => {
    setCategoryTitle(e.target.value)
  }
  const OnTagTitleChange = (e) => {
    setTagTitle(e.target.value)
  }
  return (
    <MainContext.Provider
        value={{ 
            userData, 
            setUserData, 
            fullScreenDialogOpen,  
            setFullScreenDialogOpen, 
            EditorStateBlog, 
            setEditorStateBlog,
            BlogTitle,
            setBlogTitle,
            OnBlogTitleChange,
            BlogDescription,
            setBlogDescription,
            OnBlogDescriptionChange,
            FeatureImage,
            setFeatureImage,
            OnFeatureImageChange,
            Featured,
            setFeatured,
            OnFeaturedChange,
            CategoryID, 
            setCategoryID,
            CategoryTitle,
            setCategoryTitle,
            CategoryDescription, 
            setCategoryDescription,
            OnsetCategoryDescriptionChange,
            OnCategoryTitleChange,
            UpdateCategory, 
            setUpdateCategory,
            TagID, 
            setTagID,
            TagTitle,
            setTagTitle,
            OnTagTitleChange,
            UpdateTag, 
            setUpdateTag,
            StandardDialogOpen, 
            setStandardDialogOpen,
            Categories,
            setCategories,
            Tags,
            setTags,
            OpenToast, 
            setOpenToast,
            ToastTitle, 
            setToastTitle, 
            ToastDes, 
            setToastDes,
            UpdateBlog, 
            setUpdateBlog, 
            BlogId, 
            setBlogId
        }}
    >
      {children}
    </MainContext.Provider>
  );
}

export function useMainContext() {
  return useContext(MainContext);
}