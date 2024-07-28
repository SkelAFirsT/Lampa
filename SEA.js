window.onload = function () {
    const preferredResolution = '1080p';
    const sources = [
        {
            name: "AniTube.in.ua",
            url: "https://anitube.in.ua/index.php?do=search&subaction=search&story=",
            extractor: function (document) {
                const results = [];
                document.querySelectorAll('.baseblock').forEach(function (block) {
                    const titleElement = block.querySelector('.title a');
                    const qualityElement = block.querySelector('.quality');
                    if (titleElement) {
                        results.push({
                            title: titleElement.textContent.trim(),
                            url: titleElement.href,
                            quality: qualityElement ? qualityElement.textContent.trim() : preferredResolution
                        });
                    }
                });
                return results;
            }
        },
        {
            name: "UAnime.org",
            url: "https://uanime.org/search?query=",
            extractor: function (document) {
                const results = [];
                document.querySelectorAll('.post').forEach(function (post) {
                    const titleElement = post.querySelector('.post__title a');
                    const qualityElement = post.querySelector('.post__quality');
                    if (titleElement) {
                        results.push({
                            title: titleElement.textContent.trim(),
                            url: titleElement.href,
                            quality: qualityElement ? qualityElement.textContent.trim() : preferredResolution
                        });
                    }
                });
                return results;
            }
        },
        {
            name: "Animan.ua",
            url: "https://animan.ua/search/?query=",
            extractor: function (document) {
                const results = [];
                document.querySelectorAll('.block').forEach(function (block) {
                    const titleElement = block.querySelector('.block__title a');
                    const qualityElement = block.querySelector('.block__quality');
                    if (titleElement) {
                        results.push({
                            title: titleElement.textContent.trim(),
                            url: titleElement.href,
                            quality: qualityElement ? qualityElement.textContent.trim() : preferredResolution
                        });
                    }
                });
                return results;
            }
        },
        {
            name: "NMAni",
            url: "https://nmani.com/search/?query=",
            extractor: function (document) {
                const results = [];
                document.querySelectorAll('.movie').forEach(function (movie) {
                    const titleElement = movie.querySelector('.movie__title a');
                    const qualityElement = movie.querySelector('.movie__quality');
                    if (titleElement) {
                        results.push({
                            title: titleElement.textContent.trim(),
                            url: titleElement.href,
                            quality: qualityElement ? qualityElement.textContent.trim() : preferredResolution
                        });
                    }
                });
                return results;
            }
        },
        {
            name: "Gwean",
            url: "https://gwean.com/search/?query=",
            extractor: function (document) {
                const results = [];
                document.querySelectorAll('.content').forEach(function (content) {
                    const titleElement = content.querySelector('.content__title a');
                    const qualityElement = content.querySelector('.content__quality');
                    if (titleElement) {
                        results.push({
                            title: titleElement.textContent.trim(),
                            url: titleElement.href,
                            quality: qualityElement ? qualityElement.textContent.trim() : preferredResolution
                        });
                    }
                });
                return results;
            }
        },
        {
            name: "UkrDub",
            url: "https://ukrdub.com/search/?query=",
            extractor: function (document) {
                const results = [];
                document.querySelectorAll('.item').forEach(function (item) {
                    const titleElement = item.querySelector('.item__title a');
                    const qualityElement = item.querySelector('.item__quality');
                    if (titleElement) {
                        results.push({
                            title: titleElement.textContent.trim(),
                            url: titleElement.href,
                            quality: qualityElement ? qualityElement.textContent.trim() : preferredResolution
                        });
                    }
                });
                return results;
            }
        },
        {
            name: "FanVoxUA",
            url: "https://fanvoxua.com/search/?query=",
            extractor: function (document) {
                const results = [];
                document.querySelectorAll('.post').forEach(function (post) {
                    const titleElement = post.querySelector('.post__title a');
                    const qualityElement = post.querySelector('.post__quality');
                    if (titleElement) {
                        results.push({
                            title: titleElement.textContent.trim(),
                            url: titleElement.href,
                            quality: qualityElement ? qualityElement.textContent.trim() : preferredResolution
                        });
                    }
                });
                return results;
            }
        }
    ];

    function fetchResults(source, query) {
        return fetch(source.url + encodeURIComponent(query))
            .then(response => response.text())
            .then(text => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(text, 'text/html');
                return source.extractor(doc);
            });
    }

    function displayResults(results) {
        const container = document.getElementById('results');
        container.innerHTML = '';
        results.forEach(function (result) {
            const element = document.createElement('div');
            element.className = 'result';
            element.innerHTML = `<a href="${result.url}" target="_blank">${result.title}</a> (${result.quality})`;
            container.appendChild(element);
        });
    }

    document.getElementById('searchForm').onsubmit = function (event) {
        event.preventDefault();
        const query = document.getElementById('query').value;
        const promises = sources.map(source => fetchResults(source, query));
        Promise.all(promises).then(results => {
            const allResults = results.flat();
            displayResults(allResults);
        });
    };
};