/**
 * Created by brenden on 11/2/2015.
 */
L.TileLayer.CanvasImageLayer = L.TileLayer.extend({
    _createTile: function () {
        var tile = L.DomUtil.create('canvas');
        tile.style.position = "absolute";
        tile.width = tile.height = this._getTileSize();

        tile.imageHolder = L.DomUtil.create("img");
        tile.imageHolder.style.width = tile.imageHolder.style.height = this._getTileSize() + 'px';
        tile.imageHolder.tile = tile;

        tile.onselectstart = tile.onmousemove = L.Util.falseFn;

        if (L.Browser.ielt9 && this.options.opacity !== undefined) {
            L.DomUtil.setOpacity(tile, this.options.opacity);
        }
        // without this hack, tiles disappear after zoom on Chrome for Android
        // https://github.com/Leaflet/Leaflet/issues/2078
        if (L.Browser.mobileWebkit3d) {
            tile.style.WebkitBackfaceVisibility = 'hidden';
        }
        return tile;
    },
    //probably keep this?
    _loadTile: function (tile, tilePoint) {
        console.log("load tile");
        tile.imageHolder._layer  = this;
        tile.imageHolder.onload  = this._tileOnLoad;
        tile.imageHolder.onerror = this._tileOnError;

        this._adjustTilePoint(tilePoint);
        tile.imageHolder.src     = this.getTileUrl(tilePoint);

        this.fire('tileloadstart', {
            tile: tile,
            url: tile.src
        });
    },
    _tileOnLoad: function () {
        var layer = this._layer;

        //Only if we are loading an actual image
        if (this.src !== L.Util.emptyImageUrl) {
            L.DomUtil.addClass(this, 'leaflet-tile-loaded');

            layer.fire('tileload', {
                tile: this,
                url: this.src
            });
        }

        layer._tileLoaded();
    },

});
L.TileLayer.canvasImageLayer = function (url, options) {
    return new L.TileLayer.CanvasImageLayer(url, options);
};