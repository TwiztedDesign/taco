HTMLHeadingElement.prototype.expose = function(){
    return {text : 'innerText', color : {path : 'style.color', ui : 'color'}};
};
HTMLSpanElement.prototype.expose = function(){
    return {text : 'innerText'};
};
HTMLParagraphElement.prototype.expose = function(){
    return {text : 'innerText'};
};
HTMLImageElement.prototype.expose = function(){
    return {source : 'src'};
};
