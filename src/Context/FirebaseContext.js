import { createContext, useContext, useEffect, useState } from "react";
import { db, storage } from "../Firebase";
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

const FirebaseContext = createContext();

export function FirebaseContextProvider({ children }) {
    const [CategoryData, setCategoryData] = useState([])
    const [TagData, setTagData] = useState([])
    const [BlogData, setBlogData] = useState([])
    const [ImageData, setImageData] = useState([])
    const [ImageSrc, setImageSrc] = useState("")
    const [ImageLoading, setImageLoading] = useState(false)
    const [PopupGallery, setPopupGallery] = useState(false)


    const getCategory = async () => { 
        const CategoryDoc = collection(db, "Categories")
        const CategoryData = await getDocs(CategoryDoc).then((docs) => {
            var rowsdocs = []
            docs.forEach((doc) => {
                const data = doc.data()
                rowsdocs = [...rowsdocs, data]
            });
            return rowsdocs
        });
        setCategoryData(CategoryData)
    }

    const setCategory = (id, setData) => {
        console.log(id, setData, "setcategory")
        const CategoryDoc = doc(db, "Categories", id)
        setDoc(CategoryDoc, setData)
        getCategory()
    }
    const updateCategory = (id, setData) => {
        const CategoryDoc = doc(db, "Categories", id)
        updateDoc(CategoryDoc, setData)
        getCategory()
    }
    const deleteCategory = (id) => {
        const CategoryDoc = doc(db, "Categories", id)
        deleteDoc(CategoryDoc)
        getCategory()
    }

    const getTag = async () => { 
        const TagDoc = collection(db, "Tags")
        const TagData = await getDocs(TagDoc).then((docs) => {
            var rowsdocs = []
            docs.forEach((doc) => {
                const data = doc.data()
                rowsdocs = [...rowsdocs, data]
            });
            return rowsdocs
        });
        setTagData(TagData)
    }

    const setTag = (id, setData) => {
        console.log(id, setData, "setTag")
        const TagDoc = doc(db, "Tags", id)
        setDoc(TagDoc, setData)
        getTag()
    }
    const updateTag = (id, setData) => {
        const TagDoc = doc(db, "Tags", id)
        updateDoc(TagDoc, setData)
        getTag()
    }
    const deleteTag = (id) => {
        const TagDoc = doc(db, "Tags", id)
        deleteDoc(TagDoc)
        getTag()
    }

    const getBlog = async () => { 
        const BlogDoc = collection(db, "Blogs")
        const BlogData = await getDocs(BlogDoc).then((docs) => {
            var rowsdocs = []
            docs.forEach((doc) => {
                const data = doc.data()
                rowsdocs = [...rowsdocs, data]
            });
            return rowsdocs
        });
        setBlogData(BlogData)
    }

    const setBlog = (id, setData) => {
        console.log(id, setData, "setBlog")
        const BlogDoc = doc(db, "Blogs", id)
        setDoc(BlogDoc, setData)
        getBlog()
    }
    const updateBlog = (id, setData) => {
        const BlogDoc = doc(db, "Blogs", id)
        updateDoc(BlogDoc, setData)
        getBlog()
    }
    const deleteBlog = (id) => {
        const BlogDoc = doc(db, "Blogs", id)
        deleteDoc(BlogDoc)
        getBlog()
    }

    const getImage = async () => { 
        const ImageDoc = collection(db, "Images")
        const ImageData = await getDocs(ImageDoc).then((docs) => {
            var rowsdocs = []
            docs.forEach((doc) => {
                const data = doc.data()
                rowsdocs = [...rowsdocs, data]
            });
            return rowsdocs
        });
        setImageData(ImageData)
    }

    const uploadImage = () => {
        if(ImageSrc == "") return;
        const uuid = v4()
        const filename = `${ImageSrc.name + uuid}`
        const ImageRef = ref(storage, `gallery/${filename}`)
        setImageLoading(true)
        uploadBytes(ImageRef, ImageSrc).then(async (item) => {
            await getDownloadURL(item.ref).then((url) => {
                console.log(filename)
                const setData = {
                    fileName: filename,
                    fileUrl: url,
                    DateTime: new window.Date(),
                    uid: uuid,
                }
                const ImageDoc = doc(db, "Images", uuid)
                setDoc(ImageDoc, setData)
                getImage()
                setImageLoading(false)
                setImageSrc("")
            })
        })
    }
    const updateImage = (id, setData) => {
        const ImageDoc = doc(db, "Images", id)
        updateDoc(ImageDoc, setData)
        getImage()
    }
    const deleteImage = (id) => {
        const ImageDoc = doc(db, "Images", id)
        deleteDoc(ImageDoc)
        getImage()
    }
    
    const OnImageSrcChange = (e) => {
        setImageSrc(e.target.files[0])
    }

    useEffect(() => {
        const CategoryDoc = collection(db, "Categories")
        const getCategory = async () => { 
            const CategoryData = await getDocs(CategoryDoc).then((docs) => {
                var rowsdocs = []
                docs.forEach((doc) => {
                    const data = doc.data()
                    rowsdocs = [...rowsdocs, data]
                });
                return rowsdocs
            });
            setCategoryData(CategoryData)
        }
        const getTag = async () => { 
            const TagDoc = collection(db, "Tags")
            const TagData = await getDocs(TagDoc).then((docs) => {
                var rowsdocs = []
                docs.forEach((doc) => {
                    const data = doc.data()
                    rowsdocs = [...rowsdocs, data]
                });
                return rowsdocs
            });
            setTagData(TagData)
        }
        const getBlog = async () => { 
            const BlogDoc = collection(db, "Blogs")
            const BlogData = await getDocs(BlogDoc).then((docs) => {
                var rowsdocs = []
                docs.forEach((doc) => {
                    const data = doc.data()
                    rowsdocs = [...rowsdocs, data]
                });
                return rowsdocs
            });
            setBlogData(BlogData)
        }
        const getImage = async () => { 
            const ImageDoc = collection(db, "Images")
            const ImageData = await getDocs(ImageDoc).then((docs) => {
                var rowsdocs = []
                docs.forEach((doc) => {
                    const data = doc.data()
                    rowsdocs = [...rowsdocs, data]
                });
                return rowsdocs
            });
            setImageData(ImageData)
        }
        return () => {
            getCategory()
            getTag()
            getBlog()
            getImage()
        };
    }, []);

    return (
        <FirebaseContext.Provider
        value={{ 
            CategoryData, 
            setCategory, 
            updateCategory, 
            deleteCategory, 
            TagData, 
            setTag, 
            updateTag, 
            deleteTag,
            BlogData, 
            setBlog, 
            updateBlog, 
            deleteBlog,
            ImageSrc,
            OnImageSrcChange,
            uploadImage,
            ImageData,
            ImageLoading, 
            PopupGallery,
            setPopupGallery,
            setBlog
        }}
        >
        {children}
        </FirebaseContext.Provider>
    );
}

export function useFirebase() {
  return useContext(FirebaseContext);
}