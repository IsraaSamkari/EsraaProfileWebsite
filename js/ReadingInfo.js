// Reading information from json file to index page of `ES profile`
var interfaceLanguage = "./js/data_ar.json";

function ChangeInterface(lang){
  if(lang == "ar")
    interfaceLanguage = "./js/data_ar.json";
  else
    interfaceLanguage = "./js/data_en.json";

  FetchingData();
}

function FetchingData(){
  fetch(interfaceLanguage)
  .then(response => response.json())
  .then(data => {
    ChangeHeaderInfo(data.header);
    ChangeAboutSection(data.aboutSec);
    ChangeEduSection(data.eduSec);
    ChangeExpSection(data.expSec);
    ChangeProjSection(data.projSec);
    ChangeSkillSection(data.skillSec);
  })
  .catch(error => console.log(error));
}

function ChangeHeaderInfo(data){
  // main header info
  document.title = data.title;
  document.getElementById('name').textContent = data.name;
  document.getElementById('state').textContent = data.state;

  // sections names
  var secElements = document.getElementById('mainSections').children;
  var secNames = data.sections;

  // the no. of elements must be the same as the no. of sections names.
  if(secElements.length != secNames.length){
    console.error("sections tags is not the same as the sections names in json file");
    return;
  }

  // link the sections elements (tags) with names 
  for(var i = 0; i < secElements.length; i++){
    secElements[i].textContent = secNames[i];
  }
}

// TODO: try to clean the code by make the function with small size, nearly 10-20 lines per function
function ChangeAboutSection(data){
  // aboutme section
   let keys = []; // store json keys
   let values = []; // store json values

  for(var k in data){
    keys.push(k);
    values.push(data[k]);
  } 
  
  // change the content
  for(var i = 0; i < keys.length; i++){
    document.getElementById(keys[i]).textContent = values[i];
  }
}

// TODO: try to clean the code by make the function with small size, nearly 10-20 lines per function
function ChangeEduSection(data){
  // change div's title 
  document.getElementById('education').textContent = data.title;

  // change div's content
  let eduMainDiv = data.MainDiv; // data from jason file
  let mainDivElement = document.getElementById("eduMainDiv");

  // clear the div before creating and adding new elements in it
  mainDivElement.replaceChildren();

  // for each block data, create and element and link it with its info
  for(var i = 0; i < eduMainDiv.length; i++){
    // creating sub div
    const divNode = document.createElement("div");
    divNode.className = "row p-3 bg-white text-dark  m-2";
    
    // creating the header of sub div
    const headerNode = document.createElement("h4");
    const textHeaderNode = document.createTextNode(eduMainDiv[i].Header);
    headerNode.appendChild(textHeaderNode);

    // creating the body of sub div
    const bodyNode = document.createElement("p");
    const textbodyNode = document.createTextNode(eduMainDiv[i].Body);
    bodyNode.appendChild(textbodyNode);

    // link the header and body to sub div
    // then link the sub div to main div
    divNode.appendChild(headerNode);
    divNode.appendChild(bodyNode);
    mainDivElement.appendChild(divNode);
  } 

}

// TODO: try to clean the code by make the function with small size, nearly 10-20 lines per function
function ChangeExpSection(data){
  // change div's title 
  document.getElementById('experience').textContent = data.title;

  // change div's content
  let MainDiv = data.MainDiv; // data from jason file
  let mainDivElement = document.getElementById("expMainDiv");

  // clear the div before creating and adding new elements in it
  mainDivElement.replaceChildren();

  // for each block data, create and element and link it with its info
  for(var i = 0; i < MainDiv.length; i++){
    // creating sub div
    const divNode = document.createElement("div");
    divNode.className = "col-sm-4";
    
    // creating 2*sub div
    const divCardNode = document.createElement("div");
    divCardNode.className = "card"; 
    
    // creating 3*sub div
    const divCardBodyNode = document.createElement("div");
    divCardBodyNode.className = "card-body mb-3 bg-white text-dark"; 

    // creating the header of 3*sub div
    const headerNode = document.createElement("h4");
    headerNode.className = "card-title mt-3"; 
    const textHeaderNode = document.createTextNode(MainDiv[i].Header);
    headerNode.appendChild(textHeaderNode);

    // creating the body of 3*sub div
    const bodyNode = document.createElement("p");
    bodyNode.className = "card-text"; 
    const textbodyNode = document.createTextNode(MainDiv[i].Body);
    bodyNode.appendChild(textbodyNode);

    // link the header and body to sub div
    // then link the subs divs to main div
    divCardBodyNode.appendChild(headerNode);
    divCardBodyNode.appendChild(bodyNode);
    divCardNode.appendChild(divCardBodyNode);
    divNode.appendChild(divCardNode);
    mainDivElement.appendChild(divNode);
  } 
}

// TODO: try to clean the code by make the function with small size, nearly 10-20 lines per function
function ChangeProjSection(data){
  // change div's title 
  document.getElementById('projects').textContent = data.title;

  // change div's content
  let MainDiv = data.MainDiv; // data from jason file
  let mainDivElement = document.getElementById("projMainDiv");

  // clear the div before creating and adding new elements in it
  mainDivElement.replaceChildren();

  // for each block data, create and element and link it with its info
  for(var i = 0; i < MainDiv.length; i++){
    // creating sub div
    const divNode = document.createElement("div");
    divNode.className = "col-sm-4 m-2 col-lg-3";
    
    // creating 2*sub div
    const divCardNode = document.createElement("div");
    divCardNode.className = "card h-100"; 
    
    // creating 3*sub div
    const divCardBodyNode = document.createElement("div");
    divCardBodyNode.className = "card-body mb-3 bg-white text-dark"; 

    // creating the header of 3*sub div
    const headerNode = document.createElement("h4");
    headerNode.className = "card-title mt-3"; 
    const textHeaderNode = document.createTextNode(MainDiv[i].Header);
    headerNode.appendChild(textHeaderNode);

    // creating the body of 3*sub div
    const bodyNode = document.createElement("p");
    bodyNode.className = "card-text"; 

    // append the link with its text
    for(var j=0; j < MainDiv[i].Body.length ; j++){
      if(MainDiv[i].Body[j].link != ""){
        const a = document.createElement('a');
        a.href = MainDiv[i].Body[j].link;
        a.target = "_blank";
        a.appendChild(document.createTextNode(MainDiv[i].Body[j].item));
        a.style = "color: black;";
        bodyNode.appendChild(a);
      }else{
        bodyNode.appendChild(document.createTextNode(MainDiv[i].Body[j].item));
      }
      // add new line after each item
      bodyNode.appendChild(document.createElement("br"));
    }

    // link the header and body to sub div
    // then link the subs divs to main div
    divCardBodyNode.appendChild(headerNode);
    divCardBodyNode.appendChild(bodyNode);
    divCardNode.appendChild(divCardBodyNode);
    divNode.appendChild(divCardNode);
    mainDivElement.appendChild(divNode);
  } 
}

function ChangeSkillSection(data){
  // change div's title 
  document.getElementById('skils').textContent = data.title;

  // TODO: let's fix it later by make it dynamic with DOM .. now to sleep 
  document.getElementById('softSkill').textContent = data.MainDiv[0].Header;
  document.getElementById('hardSkill').textContent = data.MainDiv[1].Header;

  document.getElementById('s1').textContent = data.MainDiv[0].Body[0].item;
  document.getElementById('s2').textContent = data.MainDiv[0].Body[1].item;
  document.getElementById('s3').textContent = data.MainDiv[0].Body[2].item;
  document.getElementById('s4').textContent = data.MainDiv[0].Body[3].item;
}
