function LeafletTileLayer() {

  function filter(cmds) {

    var tileLayer = this,
      sequencer = ImageSequencer(),
      className = 'leaflet-tile-filter-' + + new Date();

    tileLayer._container.classList.add('leaflet-tile-filter');
    tileLayer._container.classList.add(className);

    tileLayer.on('tileload', function(e) {

      $('.leaflet-tile-filter img').each(function(i, tile) {
        var tileEl = $(tile); // full jQuery interface
          if (!tileEl.hasClass('leaflet-tile-filter-filtered') && !tileEl.hasClass('leaflet-tile-filter-filtering')) {
 
            // save the original src
            tile.originalSrc = tile.src;
            tileEl.addClass('leaflet-tile-filter-filtering');
 
            sequencer.replaceImage(tileEl, cmds, {
              callback: function doneReplacing() {
                tileEl.removeClass('leaflet-tile-filter-filtering');
                tileEl.addClass('leaflet-tile-filter-filtered');
              }
            });
 
          }
      });

    });

    // refactor if there is a more approved way to access these
    tileLayer.revert = function revert() {
      $('.' + className + ' img.leaflet-tile-filter-filtered').each(function(i, img) {
        if (img.originalSrc) {
          img.src = img.originalSrc;
          img.originalSrc = false;
        }
      });
      tileLayer.off('tileload');
      return tileLayer;
    }

    return tileLayer;

  }

  L.TileLayer.include({filter: filter})

}

(function() {

  LeafletTileLayer();

})();
