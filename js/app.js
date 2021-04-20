'use stricr'

let hornArr=[];
let hornOptions=[];
function Horn(horn){
    this.image_url=horn.image_url;
    this.title=horn.title;
    this.description=horn.description;
    this.keyword=horn.keyword;
    this.horns=horn.horns;
    hornArr.push(this)
};

Horn.prototype.render = function (){
    let hornClone = $('.photo-template').clone();
    
     if(!hornOptions.includes(this.keyword)){
        hornOptions.push(this.keyword)
        let option=document.createElement('option');
        option.textContent=this.keyword;
        option.setAttribute('class',this.keyword);
        $('select').append(option)
       } 
    hornClone.find('img').attr('src', this.image_url);
    hornClone.find('h2').text(this.title);
    hornClone.find('p').text(this.description);
    hornClone.attr('class', this.keyword);
    $('main').append(hornClone);
  };

Horn.readJson=()=>{
const ajaxsettings= {
    method:'get',
    dataType:'json'
};

$.ajax('./data/page-1.json',ajaxsettings)
.then(data=>{
    data.forEach(item => {
        let horn = new Horn(item);
        horn.render(); 
    });
});
};
$('select').on('change',function(event){
    event.preventDefault();
   let select=$(this).children('option:selected').val();
   $('main').children().addClass('hide');
   $(`.${select}`).removeClass('hide')
  
})

console.log(hornOptions)
$(()=>Horn.readJson());
