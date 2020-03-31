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
                            <div class="time"> ${timeFormat(time)}</div>
                        </div>
                        <i class="fa fa-ellipsis-h"></i>
                </div>`;
    return HTMLas;
}

function renderPostContent(content){
    let HTMLas = `<div class="content">`;
    
    if (content.text) {
        HTMLas += renderPostContentText(content);
    }
    if (content.img) {
        HTMLas += renderPostContentGallery(content.img);
    }
                    
    HTMLas += `</div>`;
    return HTMLas;
}
function renderPostContentText (content) {
    let HTMLas = ``;
    let text = content.text;
    const textMax = 250;
    const textMin = 30;
    let style =``;

    if(text.length < textMin){
        style += `largeFontText`;
    }
    if(content.background){
        if(!content.img || content.img.length === 0){
            style += ` `+content.background;
        }
    }
    if(text.length >= textMax){
        text = text.substring(0, textMax);
        let skip = 0;
        for(let i = textMax-1; i>=0; i--){
            if(text[i]===` `){
                break;
            }
            skip++;
        }
        text = text.substring(0, textMax-1-skip);
        text += `<span class="more"> ... See More</span>`;
    }


    HTMLas = `<p class="${style}" data-fulltekstas="${content.text}">${text}</p>`;
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
function timeFormat(time) {
    const timeStamp = Date.now() - time;
    let sec = Math.round(timeStamp / 1000);
    if (sec<15){
        return "Just now";
    }
    if (sec<60) {
        return sec + " sec.";
    }
    let min = Math.round(sec / 60);
    if (min<60){
        return min+" min."
    }
    let hours = Math.floor(min / 60);
    if (hours<24){
        return hours+" h."
    }
    let days = Math.floor(hours / 24);
    if (days<7){
        return days+" days."
    }
    let weeks = Math.floor(days / 7);
    if (days<30.4){
        return weeks+" weeks."
    }
    let month = Math.floor(days / 30.4);
    if (month<12){
        return month+" month."
    }
    let year = Math.floor(days / 365);
        return year+" years."
    
}

renderFeed( feed);




const readMores = document.querySelectorAll(`.post p > .more`);

for(let i = 0; i<readMores.length; i++){
    readMores[i].addEventListener(`click`, readMoreClick);    
}
function readMoreClick( event ) {
    const p =  event.target.closest(`p`);
   
    return p.innerText = p.dataset.fulltekstas;
}