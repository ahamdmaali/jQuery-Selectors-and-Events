'use stricr'

let templateId = '#horntembleting';
let hornOptions=[];
function Horn(horn){
    this.image_url=horn.image_url;
    this.title=horn.title;
    this.description=horn.description;
    this.keyword=horn.keyword;
    this.horns=horn.horns; 
};
let template = $('#horntembleting').html();
// let templatelist1 = $('#hornoption1').html();
let templatelist = $('#hornoption').html();
Horn.prototype.renderHorn = function (){
  let hornMergedTemplate = Mustache.render(template,this);
    $('.photo-template').append(hornMergedTemplate);

     if(!hornOptions.includes(this.keyword)){
        hornOptions.push(this.keyword);
        let hornOption=Mustache.render(templatelist,this);
        $('select').append(hornOption);
       }   
  };

$('select').on('change',function(event){
    event.preventDefault();
   let select=$('select').children('option:selected').val();
   $('div').addClass('hide')
   $(`.${select}`).removeClass('hide');
})
Horn.readJson1=()=>{
const ajaxsettings= {
    method:'get',
    dataType:'json'
};

$.ajax('./data/page-1.json',ajaxsettings)
.then(data=>{
    data.forEach(item => {
        let horn = new Horn(item);
        horn.renderHorn(); 
       
    });
    
});

};
Horn.readJson2=()=>{
    const ajaxsettings= {
        method:'get',
        dataType:'json'
    };
    
    $.ajax('./data/page-2.json',ajaxsettings)
    .then(data=>{
        data.forEach(item => {
            let horn = new Horn(item);
             horn.renderHorn(); 
             
        });
        
    });
    };



 $(()=>Horn.readJson1());

  $('#page1').on('click', function (e){
    e.preventDefault();
    $('.photo-template').children().remove();
   
    $('option').next().remove();
     hornOptions=[];
    $(()=>Horn.readJson1());
    
  });
  $('#page2').on('click', function (e){
    e.preventDefault();
    $('.photo-template').children().remove();
   
    $('option').next().remove();
    $(()=>Horn.readJson2());
    $('#page2').on('click')
  });

