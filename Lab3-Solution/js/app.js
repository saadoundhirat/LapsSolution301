'use strict';
// GLOBAL ARRAYS
const objectsOneArray = [];
const objectsTwoArray= [];
const jsonOnekeywordArray = [];
const jsonTwokeywordArray = [];
let workingPageId = 'buttonOne';
let selectValueForSorting = 'default';

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
  workingPageId = $('#buttonOne').attr('id');// GET WORKNIG PAPGE ID FOR SORTING
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
  workingPageId = $('#buttonTwo').attr('id');// GET WORKNIG PAPGE ID FOR SORTING
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

// FILTER BASED ON SELECT ITEMS :
$('#filterSelect').on('change' , filterAction);
function filterAction() {
  let selectValue = $(this).val();// THIS IS REFERS TO THE SELECT ELEMENT CHILDS => EVENT
  selectValueForSorting = selectValue;
  if (selectValue === 'default'){
    $('div').show();
  }else {
    $('main').children('div').hide();
    $(`.${selectValue}`).show();
  }
}

// SORTING BASED ON (TITEL AND #NUMBER OF HORNS)
$('#sortSelect').on('change' , sortinItems);
function sortinItems() {
  let sortSelectValue = $(this).val();// HOLD SORT SELECT VALUE (defult / titel /numberofhorns)
  if(sortSelectValue === 'default' && workingPageId === 'buttonOne'){
    $('main').children('div').remove();
    objectsOneArray.forEach((element) => {
      element.renderToHtml();
    });
  }else if(sortSelectValue === 'default' && workingPageId === 'buttonTwo'){
    $('main').children('div').remove();
    objectsTwoArray.forEach((element) => {
      element.renderToHtml();
    });
  }else if (sortSelectValue ==='title' && workingPageId ==='buttonOne'){ // SORT FOR PAGE 1
    objectsOneArray.sort((a,b) => {
      if(a.title.toUpperCase() < b.title.toUpperCase()){
        return -1;
      }else if(a.title.toUpperCase() > b.title.toUpperCase()){
        return 1;
      }else {
        return 0;
      }
    });
    $('main').children('div').remove();
    objectsOneArray.forEach((element) => {
      element.renderToHtml();
    });
    if (selectValueForSorting === 'default'){
      $('div').show();
    }else {
      $('main').children('div').hide();
      $(`.${selectValueForSorting}`).show();
    }
  }else if (sortSelectValue ==='title' && workingPageId ==='buttonTwo'){ // SORT FOR PAGE 1
    objectsTwoArray.sort((a,b) => {
      if(a.title.toUpperCase() < b.title.toUpperCase()){
        return -1;
      }else if(a.title.toUpperCase() > b.title.toUpperCase()){
        return 1;
      }else {
        return 0;
      }
    });
    $('main').children('div').remove();
    objectsTwoArray.forEach((element) => {
      element.renderToHtml();
    });
    if (selectValueForSorting === 'default'){
      $('div').show();
    }else {
      $('main').children('div').hide();
      $(`.${selectValueForSorting}`).show();
    }
  }else if (sortSelectValue ==='numberofhorns' && workingPageId ==='buttonOne'){ // SORT FOR PAGE 2
    objectsOneArray.sort((a,b) => {
      if(a.horns > b.horns){
        return -1;
      }else if(a.horns < b.horns){
        return 1;
      }else {
        return 0;
      }
    });
    $('main').children('div').remove();
    objectsOneArray.forEach((element) => {
      element.renderToHtml();
    });
    if (selectValueForSorting === 'default'){
      $('div').show();
    }else {
      $('main').children('div').hide();
      $(`.${selectValueForSorting}`).show();
    }
  }else if (sortSelectValue ==='numberofhorns' && workingPageId ==='buttonTwo'){ // SORT FOR PAGE 2
    objectsTwoArray.sort((a,b) => {
      if(a.horns > b.horns){
        return -1;
      }else if(a.horns < b.horns){
        return 1;
      }else {
        return 0;
      }
    });
    $('main').children('div').remove();
    objectsTwoArray.forEach((element) => {
      element.renderToHtml();
    });
    if (selectValueForSorting === 'default'){
      $('div').show();
    }else {
      $('main').children('div').hide();
      $(`.${selectValueForSorting}`).show();
    }
  }
}// end function
