'use strict';
//array holds the keyword for each object.
const keywordARR= [];
// const selectedHorns= [];
// function constructor
function Horns (item) {
  this.title = item.title;
  this.image_url = item.image_url;
  this.description = item.description;
  this.keyword = item.keyword;
  this.horns = item.horns;
}
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

// render the object to the screen
// here the render function should be prototype to (this) key word to refer to the constructor attributes.
Horns.prototype.renderObject = function () {
  let templateHtml = $('#photo-template').html();
  let mergedObject =Mustache.render(templateHtml , this);
  $('main').append(mergedObject);
};

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

//  read json data
function readJson () {
  const ajaxSettings = {
    method:'get',
    dataType: 'json'
  };
  // get data from the json file
  $.ajax('data/page-1.json' , ajaxSettings).then(afterReadRender);
}
readJson();

// do this after done from getting data from the json file

function afterReadRender (HornData) {
  // console.log({data});// this is to make sure the we have the data from the json file
  HornData.forEach((item) => {
    let newHorn = new Horns(item);
    newHorn.renderObject();
    // for filter using keyword
    // to check and push the keyword to the (keyword arr) if its not already has been pushed
    if (!keywordARR.includes(newHorn.keyword)){
      keywordARR.push(newHorn.keyword);
    }
  });
  // here we want to remove the empty first child
  // also we can use eq0 to target the first child
  $('#photo-template').first().remove();
  renderKeywordOptions();
}

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////

//to render the items based on the keywords the object have.
function renderKeywordOptions() {
  keywordARR.forEach((item) => {
    // get option by its class and delete it after we done to make sure its render for one time
    let $optionkey = $('.option').clone();
    $optionkey.text(item);
    $optionkey.attr({
      value:`${item}`,
      class:`${item}`
    });
    $('select').append($optionkey);
    $optionkey.removeClass('option');
    // or we can use this way :
    // let optionTag = `<option value ${item}>${item}</option>`;
    // $('select').append(optionTag);
  });
}

// here we target any change to the select 'option' and based on that action we fillter our data

$('select').on('change' , filteraction);
function filteraction() {
  let selectedOption = $(this).val(); //has the option value
  if (selectedOption === 'default'){
    //to make the horns data render again when we click the first option//
    $('div').show();
  }else {
  // so what happens here is that (this) is refer to the parents and this value method refer to the selected value in the select tag
  // also can be writtne like this
  // let select = $(this).children('option:selected').val();
    $('div').hide();
    $(`.${selectedOption}`).show();
    //another soultion to display selected item is to give all  the option inside the div  with value === to the selected option aclass has the display none and then we remove that class from the selected option
    // $('main').children().addClass( 'hide');
    // $(`.${selectedOption}`).removeClass('hide');

  }
}



