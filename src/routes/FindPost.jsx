import { useEffect, useState } from "react";
import { FilterMenu } from "../main_files/FindPost/filter_menu";
import { Post } from "../main_files/FindPost/Post";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db, imageDb } from "../init-firebase";
import { getDownloadURL, ref } from "firebase/storage";



export function FindPost(){

    const [filter, setFilter] = useState({
        tag:"",
        title:"",
        date:""
    })

    const [data, setData] = useState([])

    useEffect(() => {
        
        const fetchData = async () => {
            const postRef = collection(db, "posts");
          try {
            const querySnapshot = await getDocs(postRef);  
            const fetchedData = await Promise.all(
              querySnapshot.docs.map( async doc => {
              const docdata = doc.data()
              const imageID = docdata.imageID
              

              let imageURL = null
              if(imageID){
                const imageRef = ref(imageDb, '/files/posts/' + imageID)
                try{
                imageURL = await getDownloadURL(imageRef)
                }
                catch(error){
                  console.log("Error fetching image URL : " + error);
                }
              }
              return {id: doc.id, ...docdata, imageURL: imageURL}
          })
        );
            
            setData(fetchedData)
          } catch (error) {
            console.error("Error fetching data: ", error);
          }
          
        };
        fetchData();
      }, []);

    const DeletePost = async (id) =>{
      try{
        console.log(id)
        const docRef = doc(db, "posts", id)
        await deleteDoc(docRef)
        setData((prevData)=> prevData.filter((post)=> post !== id))
        console.log("Document Deleted with id : " + id)
        window.location.reload();
      }
      catch(error){
        console.error("error : " + error);
      }
    }

    const filteredPost = data.filter((post)=>{
        const matchTitle = post.title.toLowerCase().includes(filter.title.toLowerCase())
              
        const matchTags = filter.tag
          ? post.tags.some(
              (tag) => tag.label === filter.tag
            )
          : true;

          const matchDate = filter.date ? post.uploadDate.toDate().toLocaleDateString() === filter.date : true;
          
        return matchDate && matchTags && matchTitle
    })

    return(
        <div>
            <FilterMenu setFilter={setFilter}/>
            <div className="Question-List">
            {filteredPost.map((post, index)=>{
              return <Post key={index} data={post} onDelete={()=>DeletePost(post.id)} />
            })}
            </div>
            
        </div>
    )
}