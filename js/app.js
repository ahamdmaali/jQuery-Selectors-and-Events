'use stricr'

function Horn(horn){
    this.image_url=horn.image_url;
    this.title=horn.title;
    this.description=horn.description;
    this.keyword=horn.keyword;
    this.horns=horn.horns;
};

Horn.prototype.render = function (){
    let option=document.createElement('option');
    option.textContent=this.keyword;
    option.setAttribute('id',this.keyword);
    $('select').append(option);
   
    let hornClone = $('#photo-template').clone();
    $('main').append(hornClone);
    hornClone.find('h2').text(this.title);
    hornClone.find('img').attr('src', this.image_url);
    hornClone.find('p').text(this.description);
    hornClone.attr('id', this.title);
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
        console.log(horn);
        horn.render()
    });
});
};

$(()=>Horn.readJson());