var Defined = {
    api: 'lampac',
    localhost: 'http://showy.online/',
    apn: 'https://apn.watch/',
    anitube: 'https://anitube.in.ua/',
    uanime: 'https://uanime.org/',
    animan: 'https://animan.ua/',
    nmani: 'https://nmani.example.com/',
    gwean: 'https://gwean.example.com/',
    ukrdub: 'https://ukrdub.example.com/',
    fanvoxua: 'https://fanvoxua.example.com/'
};

function component(object) {
    var network = new Lampa.Reguest();
    var scroll = new Lampa.Scroll({
        mask: true,
        over: true
    });
    var items = [];
    var html = Lampa.Template.get('online');
    var body = html.find('.online__body');
    var info;
    var choice = {
        season: 0,
        voice: 0,
        quality: 0,
        episode: 0,
        voice_name: '',
        quality_name: ''
    };

    this.create = function() {
        info = getFileInfo(object);
        this.activity.loader(true);
        this.activity.toggle();
        scroll.minus();
        scroll.append(body);
        this.search(object);
        scroll.onEnd = this.next;
        return this.render();
    };

    this.search = function(object) {
        var _this = this;
        var search = object.search || object.query;
        var url = Defined.api + '/search?query=' + encodeURIComponent(search);

        network.clear();
        network.timeout(15 * 1000);
        network.native(url, function(json) {
            if (json.Results.length > 0) {
                _this.append(json.Results);
            } else {
                _this.empty();
            }
        }, function() {
            _this.error();
        });

        var ukrPlatforms = [
            Defined.anitube,
            Defined.uanime,
            Defined.animan,
            Defined.nmani,
            Defined.gwean,
            Defined.ukrdub,
            Defined.fanvoxua
        ];

        ukrPlatforms.forEach(function(platform) {
            var platformUrl = platform + '/search?query=' + encodeURIComponent(search);
            network.native(platformUrl, function(json) {
                if (json.Results && json.Results.length > 0) {
                    _this.append(json.Results);
                }
            });
        });
    };

    this.append = function(results) {
        var _this = this;
        results.forEach(function(element) {
            var card = Lampa.Template.get('card', element);
            card.on('hover:enter', function() {
                _this.open(element);
            });
            scroll.append(card);
            items.push(card);
        });
        this.activity.loader(false);
    };

    this.open = function(element) {
        var _this = this;
        var url = Defined.api + '/details?id=' + element.id;

        network.clear();
        network.timeout(15 * 1000);
        network.native(url, function(json) {
            _this.details(json);
        }, function() {
            _this.error();
        });
    };

    this.details = function(json) {
        var _this = this;
        var data = json.Data;
        var player = Lampa.Player.open(data.url, data.title);

        player.on('ready', function() {
            _this.activity.toggle();
        });
    };

    this.error = function() {
        this.activity.loader(false);
        this.activity.toggle();
        Lampa.Noty.show(Lampa.Lang.translate('server_noconnect'));
    };

    this.empty = function() {
        this.activity.loader(false);
        this.activity.toggle();
        Lampa.Noty.show(Lampa.Lang.translate('empty_title'));
    };

    this.next = function() {
        // Підвантаження наступних результатів (якщо є)
    };

    this.render = function() {
        return html;
    };

    function getFileInfo(object) {
        return {
            season: object.season || 1,
            episode: object.episode || 1,
            imdb_id: object.imdb_id || '',
            kp_id: object.kp_id || ''
        };
    }

    this.create();
}

var resolutions = {
    'rezka': '2160p',
    'anitube': '2160p',
    'uanime': '2160p',
    'animan': '2160p',
    'nmani': '2160p',
    'gwean': '2160p',
    'ukrdub': '2160p',
    'fanvoxua': '2160p',
    'default': '1080p'
};
