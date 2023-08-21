const blogTitleField=document.querySelector('.title');
const articleFeild=document.querySelector('.article');
//banner
const bannerTmage=document.querySelector('#banner-upload');
const banner=document.querySelector(".banner");
let bannerPath;
const publishBtn=document.querySelector('.publish-btn');
const uploadInput=document.querySelector('#image-upload');
bannerImage.addEventListener('change',()=>{
    uploadImage(bannerImage,"banner");
});
const uploadImage=(uploadFile,uploadType)=>{
    const[file]=uploadFile.files;
    if(file && file.type.include("image")){
        const formdata=new FormData();
        formdata.append('image',file);
        fetch('/uploads',{
          method:'post',
          body:formdata
        }).then(res=>res.json())
        .then(data=>{
            bannerPath=`${location.origin}/${data}`;
            banner.style.backgroundImage=`url("${bannerPath}")`;
        })

    }
}