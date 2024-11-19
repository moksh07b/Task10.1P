import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db, imageDb } from "../init-firebase";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import "./../css/post.css";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/xml/xml";
import "codemirror/mode/markdown/markdown";
import { Controlled as CodeMirror } from "react-codemirror2";
import ReactMarkdown from "react-markdown";
import Select from "react-select";

function Post() {
  const navigate = useNavigate();

  const language = [
    { value: "javascript", label: "Javascript" },
    { value: "xml", label: "HTML/XML" },
    { value: "markdown", label: "Markdown" },
  ];

  const [isImg, SetIsImg] = useState(false);

  const options = [
    { value: "React", label: "React" },
    { value: "Node", label: "Node" },
    { value: "Express", label: "Express" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "Firebase", label: "Firebase" },
];

  const [postData, setPostData] = useState({
    title: "",
    code: "",
    markdown: "",
    tags: "",
    img: null,
    language: "javascript",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(auth.currentUser);
    if (!auth.currentUser) {
      navigate("/login");
      alert("Please login to create a post");
      return;
    }

    try{

      var fileUid = null;
      if(isImg){
        fileUid = v4();
        const imageRef = ref(imageDb, 'files/posts/' + fileUid);
        await uploadBytes(imageRef, postData.img);
      }

      const post = {
        title: postData.title,
        code: postData.code,
        markdown: postData.markdown,
        tags: postData.tags,
        language: postData.language,
        userID : auth.currentUser.uid,
        author : auth.currentUser.displayName,
        createdAt: serverTimestamp(),
        likes: 0,
        comment : [],
        ...(isImg && {imageID : fileUid})
      }

      await addDoc(collection(db, "posts"), post);
      alert("Post created successfully!");

      navigate("/");
    }
    catch(error){
      console.error("Error adding document: ", error);
    }

  }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="post-container">
          <h2>Create a Post</h2>

          <div className="post title">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={postData.title}
              onChange={handleChange}
              placeholder="Enter Title..."
              required
            />
          </div>

          <div className="post img">
            <label>Add an Image</label>
            <input
              type="file"
              name="img"
              onChange={(e) => {
                setPostData({ ...postData, img: e.target.files[0] });
                SetIsImg(true);
              }}
            />
          </div>

          <div className="code-header">
            <label>Code Editor</label>
            <select
              name="language"
              value={postData.language}
              onChange={handleChange}
            >
              {language.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>

            <div className="code-editor">
              <CodeMirror
                value={postData.code}
                options={{
                  mode: postData.language,
                  theme: "material",
                  lineNumbers: true,
                  lineWrapping: true,
                }}
                onBeforeChange={(editor, data, value) => {
                  setPostData({ ...postData, code: value });
                }}
              />
            </div>
          </div>

          <div className="post markdown">
            <label> Description</label>
            <div className="markdown-container">
              <div className="markdown-editor">
                <textarea
                  name="markdown"
                  value={postData.markdown}
                  onChange={handleChange}
                  placeholder="Enter Description..."
                  required
                />
              </div>
              <div className="markdown-preview">
                <h4>Preview</h4>
                <div className="preview-content">
                  <ReactMarkdown>{postData.markdown}</ReactMarkdown>
                </div>
              </div>
            </div>
          </div>

          <div className="post tags">
            <label>Tags</label>
            <Select
              isMulti
              options={options}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={(e) => setPostData({ ...postData, tags: e })}
              placeholder="Select tags"
              required
            />
          </div>

          <div className="post submit">
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Post;
