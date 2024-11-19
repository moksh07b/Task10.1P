
import { tutorials } from "./articleTutorialList"
import { Article } from "./Article"
import { useSearch } from "../../context/SearchContext";

function Tutorials(){
    const {search} = useSearch();
    const filtertutorial = tutorials.filter((tutorial)=>{
        return tutorial.title.toLowerCase().includes(search.toLowerCase())
    })
    return(
        <div className="all-articles">
        {filtertutorial.map((tutorial, index)=>(
            <Article key={index} article={tutorial}/>
        ))}
        </div>
    )
}

export default Tutorials