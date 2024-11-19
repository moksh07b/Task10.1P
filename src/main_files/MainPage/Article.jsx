import { articles } from "./articleTutorialList";
import { useSearch } from "../../context/SearchContext";

function Article({article}){
    
    return(
    <div className="article-body">
        <img src={article.src} alt={article.alt} />
        <h2>{article.title}</h2>
        <div className="article-body-text">
            <p>{article.description}</p>
            <hr></hr>
            <div className="star-rating">
                <img src="./images/star.png" alt="star" />
                <h5>{article.rating}</h5>
                <h4>{article.author_name}</h4>

            </div>
        </div>
    </div>
    
    )
    
}


function ArticleReact(){
    const {search} = useSearch();
    const filterarticles = articles.filter((article)=>{
        return article.title.toLowerCase().includes(search.toLowerCase())
        
    })

    return(
        <div className="all-articles">
            {filterarticles.map((article, index) =>(
                <Article key={index} article={article}/>
                
            ))}
        </div>
    )
}

export {Article, ArticleReact };
