(function () {
    'use strict';

    var preferredResolution = '1080p';
    var searchList = [
        {
            title: 'AniTube.in.ua',
            url: 'https://anitube.in.ua/',
            search: '/?do=search&subaction=search&story=',
            video: {
                list: '.baseblock',
                title: '.title a',
                link: '.title a',
                quality: '.quality'
            },
            onLoad: function (data, element) {
                var results = $(data).find(this.video.list);
                var items = [];
                results.each((index, item) => {
                    var title = $(item).find(this.video.title).text();
                    var link = $(item).find(this.video.link).attr('href');
                    var quality = $(item).find(this.video.quality).text() || preferredResolution;
                    items.push({ title, link, quality });
                });
                element.addItems(items);
            }
        },
        {
            title: 'UAnime.org',
            url: 'https://uanime.org/',
            search: '/search?query=',
            video: {
                list: '.post',
                title: '.post__title a',
                link: '.post__title a',
                quality: '.post__quality'
            },
            onLoad: function (data, element) {
                var results = $(data).find(this.video.list);
                var items = [];
                results.each((index, item) => {
                    var title = $(item).find(this.video.title).text();
                    var link = $(item).find(this.video.link).attr('href');
                    var quality = $(item).find(this.video.quality).text() || preferredResolution;
                    items.push({ title, link, quality });
                });
                element.addItems(items);
            }
        },
        {
            title: 'Animan.ua',
            url: 'https://animan.ua/',
            search: '/search/?query=',
            video: {
                list: '.block',
                title: '.block__title a',
                link: '.block__title a',
                quality: '.block__quality'
            },
            onLoad: function (data, element) {
                var results = $(data).find(this.video.list);
                var items = [];
                results.each((index, item) => {
                    var title = $(item).find(this.video.title).text();
                    var link = $(item).find(this.video.link).attr('href');
                    var quality = $(item).find(this.video.quality).text() || preferredResolution;
                    items.push({ title, link, quality });
                });
                element.addItems(items);
            }
        },
        {
            title: 'NMAni',
            url: 'https://nmani.com/',
            search: '/search/?query=',
            video: {
                list: '.movie',
                title: '.movie__title a',
                link: '.movie__title a',
                quality: '.movie__quality'
            },
            onLoad: function (data, element) {
                var results = $(data).find(this.video.list);
                var items = [];
                results.each((index, item) => {
                    var title = $(item).find(this.video.title).text();
                    var link = $(item).find(this.video.link).attr('href');
                    var quality = $(item).find(this.video.quality).text() || preferredResolution;
                    items.push({ title, link, quality });
                });
                element.addItems(items);
            }
        },
        {
            title: 'Gwean',
            url: 'https://gwean.com/',
            search: '/search/?query=',
            video: {
                list: '.content',
                title: '.content__title a',
                link: '.content__title a',
                quality: '.content__quality'
            },
            onLoad: function (data, element) {
                var results = $(data).find(this.video.list);
                var items = [];
                results.each((index, item) => {
                    var title = $(item).find(this.video.title).text();
                    var link = $(item).find(this.video.link).attr('href');
                    var quality = $(item).find(this.video.quality).text() || preferredResolution;
                    items.push({ title, link, quality });
                });
                element.addItems(items);
            }
        },
        {
            title: 'UkrDub',
            url: 'https://ukrdub.com/',
            search: '/search/?query=',
            video: {
                list: '.item',
                title: '.item__title a',
                link: '.item__title a',
                quality: '.item__quality'
            },
            onLoad: function (data, element) {
                var results = $(data).find(this.video.list);
                var items = [];
                results.each((index, item) => {
                    var title = $(item).find(this.video.title).text();
                    var link = $(item).find(this.video.link).attr('href');
                    var quality = $(item).find(this.video.quality).text() || preferredResolution;
                    items.push({ title, link, quality });
                });
                element.addItems(items);
            }
        },
        {
            title: 'FanVoxUA',
            url: 'https://fanvoxua.com/',
            search: '/search/?query=',
            video: {
                list: '.post',
                title: '.post__title a',
                link: '.post__title a',
                quality: '.post__quality'
            },
            onLoad: function (data, element) {
                var results = $(data).find(this.video.list);
                var items = [];
                results.each((index, item) => {
                    var title = $(item).find(this.video.title).text();
                    var link = $(item).find(this.video.link).attr('href');
                    var quality = $(item).find(this.video.quality).text() || preferredResolution;
                    items.push({ title, link, quality });
                });
                element.addItems(items);
            }
        }
    ];

    var element = {
        addItems: function (items) {
            // Function to handle the addition of items to the DOM or relevant component
            console.log(items);
        }
    };

    searchList.forEach(function (source) {
        var query = 'аниме';  // Replace with your search query
        $.ajax({
            url: source.url + source.search + encodeURIComponent(query),
            success: function (data) {
                source.onLoad(data, element);
            },
            error: function () {
                console.error('Failed to load data from', source.title);
            }
        });
    });
})();