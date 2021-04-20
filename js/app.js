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

Horn.prototype.renderHorn = function (){
    // let hornClone = $('.photo-template').clone();
    
     
    let template = $('#horntembleting').html();
    let hornMergedTemplate = Mustache.render(template,this);
   
    $('#photo-template').append(hornMergedTemplate);
    let hornOption=Mustache.render(template,this);
    
    if(!hornOptions.includes(this.keyword)){
        hornOptions.push(this.keyword);
        $('select').append(hornOption);
       } 
  };

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
$('select').on('change',function(event){
    event.preventDefault();
   let select=$(this).children('option:selected').val();
   $('main').children().addClass('hide');
   $(`.${select}`).removeClass('hide')
  
})

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
    $('select').on('change',function(event){
        event.preventDefault();
       let select=$(this).children('option:selected').val();
       $('main').children().addClass('hide');
       $(`.${select}`).removeClass('hide')
      
    })

 $(()=>Horn.readJson1());

$('#page1').on('click',function (e) {
    e.preventDefault();
    $(()=>Horn.readJson1());
})
$('#page2').on('click',function (e) {
   
    e.preventDefault();
    $(()=>Horn.readJson2());
    $('main').children().addClass('hide');
    $(`.${select}`).removeClass('hide')
})