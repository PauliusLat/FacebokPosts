"use strict";

function renderFeed(data) {
    if(!Array.isArray(data)){
    return console.error(`Turi buti Array tipo!`);
    }
    let HTMLas = ``;
    for (let i = 0; i < data.length; i++) {
        const postData = data[i];
        HTMLas += renderPost(postData);
    }
    return document.querySelector(`.feed`).innerHTML = HTMLas;
    
}
function renderPost(data) {
    console.log("-----------------");

    let HTMLas = `<div class="post">
                    ${renderPostHeader(data.author, data.postTime)}
                    ${renderPostContent(data.content)}
                    ${renderPostFooter()}
                </div>`;
    return HTMLas;
}

function renderPostHeader(author, time){

    let HTMLas = ``;
    HTMLas = `<div class="header">
                        <img src="./img/${author.img}" alt="face">
                        <div class="texts"> 
                            <div class="title">
                                <a href="${author.link}">${author.name} ${author.surname} </a>
                            </div>
                            <div class="time"> ${time}</div>
                        </div>
                        <i class="fa fa-ellipsis-h"></i>
                </div>`;
    return HTMLas;
}

function renderPostContent(content){
    let HTMLas = `<div class="content">`;
    
    if (content.text) {
        HTMLas += renderPostContentText(content.text, content.textBackground);
    }
    if (content.img) {
        HTMLas += renderPostContentGallery(content.img);
    }
                    
    HTMLas += `</div>`;
    return HTMLas;
}
function renderPostContentText (text, background) {
    let HTMLas = ``;
    HTMLas = `<p>${text}</p>`;
    return HTMLas;
}

function renderPostContentGallery(images) {
    let HTMLas = ``;
    let imgCounter = 0;
    let galleryClass = 0;
    let moreHTML =``;
    let imgHTML = ``;


    if (!Array.isArray(images) ||
        images.length === 0 ) {
        return '';
    }

    for (let i = 0; i < images.length; i++){
        if(images[i].length>=5 &&
            typeof(images[i]) === `string`){
            imgCounter++;

            if (imgCounter<=4){
                imgHTML += `<img src="./img/${images[i]}" alt="Pic">`
            }
        }
    }
    galleryClass = imgCounter;
    if(imgCounter>4){
        galleryClass = 4;
        moreHTML = `<div class="more">+${imgCounter - 4 }</div>`;
    }
    HTMLas = `<div class="gallery gallery-${galleryClass}">
                   ${imgHTML}
                   ${moreHTML} 
            </div>`;
    
    if (imgCounter === 0) {
        return '';  
    }

    return HTMLas;
}

function renderPostFooter(){
    return `<div class="footer">
                <div class="row">
                    <div class="col">
                        <i class="fa fa-thumbs-up"></i>
                        <div class="text">Like</div>
                    </div>
                    <div class="col">
                        <i class="fa fa-comment-o"></i>
                        <div class="text">Comment</div>
                    </div>
                </div>
                <div class="row"> 
                    <img src="./img/mark.jpg">
                    <div class="comment-form">
                        <textarea placeholder="Write a comment..."></textarea>
                        <div class="actions">
                        <i class="fa fa-smile-o"></i>
                        <i class="fa fa-camera"></i>
                        <i class="fa fa-file-image-o"></i>
                        <i class="fa fa-user-secret"></i>
                        </div>
                    </div>
                </div>
            </div>`;

}

renderFeed( feed);