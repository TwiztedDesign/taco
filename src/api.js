api.go = function(target, time){
    sendMessage('taco-go',{
        target : target,
        time : time
    });
};

api.next = function(){};
api.previous = function(){};
api.home = function(){};


api.onUpdate = function(cb){
    updateCB = cb;
};

api.addTemplate = function(name, data){
    tacoData[name] = data;
    tacoProxyData[name] = new Proxy(data, onChange);
    sendMessage('taco-addtemplate',{
        channel : name,
        data    : data
    });
    return tacoProxyData[name];
};



module.exports = {
      go : go,
};
