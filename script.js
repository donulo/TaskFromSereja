var sideMenu = new Vue({
    el: '#sideMenu',
    data: {
        buttons: [
            { message: "Моя страница" },
            { message: "Новости" },
            { message: "Мессенджер" },
            { message: "Звонки" },
            { message: "Друзья" },
            { message: "Сообщества" },
            { message: "Фотографии" }
        ]
    }
})


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};


var home = new Vue({
    el: '#home',
    data: {
        posts: []
    },
    created: function () {
        this.abc();
        console.log(123);
        console.log(this.posts);
    },
    methods: {
        getImageByIndex: function (index) {
            return this.posts[index].image;
        },
        abc: async function () {
            
            var textPost = null;
            var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
            var xhr = new XHR();
            var type = 'sentence'
            var number = 1;
            var params = '&type=' + type + '&number=' + number;
            xhr.onload = function () {
                var result = JSON.parse(this.responseText);
                if (result.status === 'success') {
                    textPost = result.text;
                } else {
                    console.log(result.errorCode + '\n' + result.text);
                }
            };
            xhr.onerror = function () {
                alert('Ошибка ' + this.status);
            };

            var imgUrl = null;
            var xhrImg = new XHR();
            xhrImg.onload = function () {
                var result = JSON.parse(this.responseText);
                imgUrl = result.file;
                console.log('-----------------------');
                //console.log(result.file);
                console.log(imgUrl);
                //console.log(this.responseText);
            };
            xhrImg.onerror = function () {
                alert('Ошибка');
            };
            var countPosts = getRandomInt(3, 11)
            for (var i = 0; i < countPosts; i++) {

                xhr.open('GET', 'https://fish-text.ru/get?' + params, false);
                await xhr.send();

                xhrImg.open('GET', 'http://aws.random.cat//meow', false);
                await xhrImg.send();

                this.posts.push({ message: textPost, image: imgUrl })
            }
        }
    }
})

