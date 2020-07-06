let titles=[];
let movies={};

// take input from user
let suggestions=document.querySelector(".suggestions");
const search=document.querySelector("input");
search.addEventListener('input',(e)=>{    // this event for taking input and call endpoint api
    e.preventDefault();
    if(e.target.value.length<=2)
    suggestions.innerHTML='';
    apiCall(e.target.value);
});
search.addEventListener('click',(e)=>{   // this event for clicking on input field as it has any input data or not
    e.preventDefault();
    if(e.target.value.length<=2)         // as api does not response for the title of length less than 2
    suggestions.innerHTML='';
    apiCall(e.target.value);
});

const apiCall=((searchValue)=>{   // this fatch the movie data according to input data
  
    const url=`http://www.omdbapi.com/?apikey=8b79eba7&s=${searchValue}`;
    fetch(url)
       .then(res=>res.json())
       .then(data=>{
            titles=[];
           for(let index in data['Search']){
               titles.push(data['Search'][index]['Title']);
           }
           //console.log(titles);
           fetchDirector();        // call an another endpoint to fetch the director of the movie as it is said to shown in the project

       })
       .catch(err=>console.log(err));
});

const fetchDirector=(()=>{        // fetching the data of director of input matched movie
    html="";  
   
    for(let title of titles){
           const url=`http://www.omdbapi.com/?apikey=8b79eba7&t=${title}`;
           fetch(url)
             .then((res)=>res.json())
             .then(dir=>{
                 let movie={};
                 movie['Title']=title;
                 movie['Director']=dir['Director'];
                 movies={...movie};
                html+= ` <ul class="suggestion-list">
                 <li>
                     <h2>${title}</h2>
                     <h4>${dir['Director']}</h4>
                 </li>
             </ul>`
           showList(html);              // show all the matched movie data with name of the director of the movie
           const inputDatas=document.querySelectorAll(".suggestion-list");
           inputDatas.forEach((listNumber) => {   // this event  for selecting the movie name from the list
                 listNumber.addEventListener('click',(e)=>{
                     search.value=listNumber.children[0].children[0].innerText;
                 });
               });
           })

       }
    let btn=document.getElementById("btn");
    btn.addEventListener('click',(e)=>{  // this event for adding the movie name from input to above table as a pill
        e.preventDefault();
        let table=document.querySelector("table");
        let html=table.innerHTML;
        let input=document.querySelector("input");
        if(input.value.length>2&&localStorage.length==5){  // use local storage for taking maximum 5 input from user
            html+=` <tr>   
            <td>${localStorage.length+1}</td>
            <td>${"can't add more"}</td>
        </tr>`
            table.innerHTML=html;
        }
        if(input.value.length>2&&localStorage.length<5){   // if valid movie name then add
        html+=` <tr>
        <td>${localStorage.length+1}</td>
        <td>${input.value} <span><button class="del">x</button></span></td>
    </tr>`
        table.innerHTML=html;
        localStorage.setItem(localStorage.length+1,input.value);
    
    }
        input.value='';
    });

    document.onclick=(()=>{      // if click outside of the list then it will remove the matched list
        suggestions.innerHTML='';
    });
   
});



const showList=((html)=>{   // showing the matched movie in the list
    suggestions.innerHTML=html;
})




let del=document.querySelectorAll(".del");  
console.log(del.length);                       
if(del.length>0){
del[0].addEventListener('click',(e)=>{    // deleting the movie from the table
    e.preventDefault();
    console.log(e);
})
}