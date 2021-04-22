'use strict';
// GLOBAL ARRAYS
const objectsOneArray = [];
const objectsTwoArray= [];
const jsonOnekeywordArray = [];
const jsonTwokeywordArray = [];

// CONSTRUCTOR
function Horns (item) {
  this.title = item.title;
  this.image_url = item.image_url;
  this.description = item.description;
  this.keyword = item.keyword;
  this.horns = item.horns;
}

// RENDER FUNCTION
Horns.prototype.renderToHtml = function() {
  let htmlTemplat =$('#mustachTemplate').html();
  let mergedHtmlObject = Mustache.render(htmlTemplat , this);
  $('main').append(mergedHtmlObject);
};
Horns.prototype.renderTotml = function() {
  let htmlTemplat =$('#mustachTemplate').html();
  let mergedHtmlObject = Mustache.render(htmlTemplat , this);
  $('main').append(mergedHtmlObject);
};

// READ DATA
function readJson () {
  const ajaxSettings = {
    method:'get',
    dataType:'json'
  };
  // get data from the json file
  $.ajax('data/page-1.json' , ajaxSettings).then(afterReadJsonOne);
  $.ajax('data/page-2.json' , ajaxSettings).then(afterReadJsonTwo);
}
readJson();

// AFTER GETTING THE DATA
function afterReadJsonOne (objectData){
  objectData.forEach(element => {
    let newObject = new Horns (element);
    newObject.renderToHtml(); // RENDER THE FIRST JSON OBJECTS FIRST
    objectsOneArray.push(newObject);
    //ForKeyWords
    if (!jsonOnekeywordArray.includes(newObject.keyword)){
      jsonOnekeywordArray.push(newObject.keyword);
    }
  });
  renderOptions(jsonOnekeywordArray); // TO RENDER FIRST JSON OBJECTS OPTION (KEYWORDS)
}
function afterReadJsonTwo (objectData){
  objectData.forEach(element => {
    let newObject = new Horns (element);
    // newObject.renderToHtml(); // DETLTED
    objectsTwoArray.push(newObject);
    //ForKeyWords
    if (!jsonTwokeywordArray.includes(newObject.keyword)){
      jsonTwokeywordArray.push(newObject.keyword);
    }
  });
}

// RENDER BASED ON SELECTED BUTTON (PAGE):
$('#buttonOne').on('click' , renderPageOne);
function renderPageOne (){
  $('main').children().remove();
  objectsOneArray.forEach((element) => {
    element.renderToHtml();
  });
  // HERE CALLING RENDER OPTION
  $('#filterSelect').children('#objectOptionsRemove').remove();//check if this work
  renderOptions(jsonOnekeywordArray);
}

$('#buttonTwo').on('click' ,renderPageTwo);
function renderPageTwo (){
  $('main').children().remove();
  objectsTwoArray.forEach((element) => {
    element.renderToHtml();
  });
  $('#filterSelect').children('#objectOptionsRemove').remove();
  renderOptions(jsonTwokeywordArray);
}
// RENDER OPTIONS
function renderOptions(keyWords) {
  let template = $('#optionScript').html();
  keyWords.forEach(item => {
    let object = { keywordValue:item};
    let filterMergedTemplate = Mustache.render(template, object);
    $('#filterSelect').append(filterMergedTemplate);
  });
}
