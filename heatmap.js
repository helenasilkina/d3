// import d3.js

(function() {
  var heatMap = {};
  
  heatMap.create = function(data) {
    console.log('create heat map');
  };
  
  heatMap.update = function(data) {
    if (data.changed) {
      heatMap.create(data);
    }
    console.log('update heat map');
  }
})()
