var siteName = document.querySelector("#name");
var siteUrl = document.querySelector("#url");
var submit = document.querySelector("#submit");
var tbody = document.querySelector("tbody");
var deletebtn = document.querySelector("#deletebtn");
var updatebtn = document.querySelector("#updatebtn");
var updatebtnnn = document.querySelector("#updatebtnnn");
var search = document.querySelector("#search");
var namealert = document.querySelector("#namealert");


var globalindex ;
var sitesList;

if(localStorage.getItem("sitesList")){
    sitesList = JSON.parse(localStorage.getItem("sitesList"))
    displaySite(sitesList)
}else{
    sitesList = [];
}

var exists ;
submit.addEventListener("click" , function() {

    addProduct()    
    emptySiteNameValidation()
    
})








updatebtn.addEventListener("click" , function(e) {
    UpdateList()
})

search.addEventListener("input" , function(e) {
    searchList()
})
siteName.addEventListener("input" , function(e) {
    siteNameValidation()
    existSiteNameValidation()
    emptySiteNameValidation()
})
siteUrl.addEventListener("input" , function(e) {
    siteUrlValidation(siteUrl.value)
})

function addProduct() {

    
        var siteInfo = {
        Name: siteName.value ,
        Url: siteUrl.value ,
        }
        sitesList.push(siteInfo);
        displaySite(sitesList);
        saveToLocalStorage();

}



function addProduct() {

    var exists = sitesList.some( siteInfo => siteInfo.Name === siteName.value);
    
    if (exists) {
        existSiteNameValidation()
    } else {
        var siteInfo = {
        Name: siteName.value ,
        Url: siteUrl.value ,
        }
        sitesList.push(siteInfo);
        displaySite(sitesList);
        saveToLocalStorage()
    }

}



function existSiteNameValidation() {

    var exists = sitesList.some(siteInfo => siteInfo.Name === siteName.value);
    
    if (exists) {
        namealert.classList.replace("d-none" , "d-flex");
        
    }else{
      
        namealert.classList.replace( "d-flex"  , "d-none" );
    }
}






function emptySiteNameValidation() {
    if (siteName.value == "") {
        emptyerror.classList.replace("d-none" , "d-flex");
        
    }else{
        emptyerror.classList.replace( "d-flex"  , "d-none" );
        
    }
}

function siteNameValidation() {
    var regex = /^[A-Z][a-z]{2,15}$/;
    if (regex.test(siteName.value)) {
        nameerror.classList.replace( "d-flex"  , "d-none" )
        siteName.classList.add("is-valid")
        siteName.classList.remove("is-invalid")
    }else{
        nameerror.classList.replace("d-none" , "d-flex")
        siteName.classList.add("is-invalid")
        siteName.classList.remove("is-valid")
    }
}

function siteUrlValidation(url) {
    var regex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (regex.test(siteUrl.value)) {
        urlerror.classList.replace( "d-flex"  , "d-none" )
        siteUrl.classList.add("is-valid")
        siteUrl.classList.remove("is-invalid")
    }else{
        urlerror.classList.replace("d-none" , "d-flex")
        siteUrl.classList.add("is-invalid")
        siteUrl.classList.remove("is-valid")
    }
}






function displaySite(SList , term=0) {
    
    if (SList.length > 0) {
        var cartoona = "";
        for (let i = 0; i < SList.length; i++) {

        var index = SList.indexOf(sitesList[i]) ;
        cartoona += `<tr class="container-fluid">
                    <td>${index+1}</td> 
                    <td class="text-secondary">${term ? SList[i].Name.toLowerCase().replace(term , `<span class="bg-warning fw-bolder">${term}</span>`): SList[i].Name}</td> 
                    <td>  <a href="${SList[i].Url}">  <button type="button" class="btn btn-success"> <i class="fa-solid fa-eye" style="color: #ffffff;"></i> Visit</button>  </a>  </td> 
                    <td>  <button onclick="deleteSite(${i})"  id="deletebtn" type="button" class=" btn btn-danger"> <i class="fa-solid fa-trash" style="color: #ffffff;"></i> Delete</button>   </td> 
                    <td>  <button onclick="setFormToUpdate(${i})"  id="updatebtnnn" type="button" class="updatebtnnn btn btn-warning"> <i class="fa-solid fa-pen" style="color: #ffffff;"></i> Update</button>   </td> 
                    </tr>`
        globalindex = i ;
        tbody.innerHTML = cartoona ; 
        
        }

    }else{

        tbody.innerHTML = `<tr></tr>` ;
    }
    
    
}




// function to delete site
function deleteSite(index) {

    sitesList.splice(index , 1)
    displaySite(sitesList);
    saveToLocalStorage()

}


// function to Update site
function setFormToUpdate(index) {
    globalindex = index;
    siteName.value = sitesList[index].Name;
    siteUrl.value = sitesList[index].Url;
    submit.classList.replace("d-flex" , "d-none")
    updatebtn.classList.replace("d-none" , "d-flex")
    

}
function UpdateList() {
    
    sitesList[globalindex].Name = siteName.value ;
    sitesList[globalindex].Url = siteUrl.value ;
    submit.classList.replace("d-none" , "d-flex")
    updatebtn.classList.replace("d-flex" , "d-none")
    saveToLocalStorage()
    displaySite(sitesList);

}

function searchList() {
    var term = search.value ;
    var searchList = []
    for (let i = 0; i < sitesList.length; i++) {
        if (sitesList[i].Name.toLowerCase().includes(term.toLowerCase())) {
            searchList.push(sitesList[i])
        
        }else{
            console.log("Not Match");
        }
        
    }
    
    displaySite(searchList , term);

}








// function to save in localstorage
function saveToLocalStorage() {
    localStorage.setItem("sitesList" , JSON.stringify(sitesList))
    
}
