"use strict";

function renderFeed(data) {
    if(!Array.isArray(data)){
    return console.error(`Turi buti Array!`);
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
    console.log(data);

    let HTMLas = `<div class="post">
                    ${renderPostHeader(data.author, data.time)}
                    ${renderPostContent(data.content)}
                    ${renderPostFooter()}
                </div>`;

    return HTMLas;
}

function renderPostHeader(author, time){
    let HTMLas = ``;
    HTMLas = `<div class="header">HEADER</div>`;
    return HTMLas;
}
function renderPostContent(content){
    let HTMLas = ``;
    HTMLas = `<div class="content">CONTENT</div>`;
    return HTMLas;

}
function renderPostFooter(){
    return `<div class="footer">FOOTER</div>`;

}

renderFeed( feed);