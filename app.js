<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VK Mini App</title>
</head>
<body>
    <h1>Мои друзья VK</h1>
    <ul id="friendsList"></ul>

    <script type="text/javascript">
        VK.init({
            apiId: 51918097
        });

        function auth() {
            return new Promise((resolve, reject) => {
                VK.Auth.login(response => {
                    if (response.session) {
                        resolve();
                    } else {
                        reject(new Error('Authorization failed'));
                    }
                });
            });
        }

        function getFriends() {
            return new Promise((resolve, reject) => {
                VK.Api.call('friends.get', {fields: 'photo_50,first_name,last_name'}, response => {
                    if (response.error) {
                        reject(new Error(response.error.error_msg));
                    } else {
                        resolve(response.response);
                    }
                });
            });
        }

        async function renderFriends() {
            try {
                await auth();
                const friends = await getFriends();
                const friendsList = document.getElementById('friendsList');
                friends.forEach(friend => {
                    const listItem = document.createElement('li');
                    const img = document.createElement('img');
                    img.src = friend.photo_50;
                    listItem.appendChild(img);
                    listItem.appendChild(document.createTextNode(friend.first_name + ' ' + friend.last_name));
                    friendsList.appendChild(listItem);
                });
            } catch (error) {
                console.error('Error:', error.message);
            }
        }

        renderFriends();
    </script>
    <script src="https://vk.com/js/api/openapi.js?168" type="text/javascript"></script>
</body>
</html>
