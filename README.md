### Google Images

#### Easily pull google images with this API

#### Made with NodeJs + Express

#### Uses puppeteer to collect images

<Install>

``` git clone https://github.com/ismailian/google-images ```
``` npm install ```
``` npm start ```

<Environment Variables>
``` bash

touch .env
echo 'EXECUTABLE_PATH=path/to/chome/or/firefox' >> .env
echo 'WEBSITE_URL=https://google.com/search' >> .env
echo 'TIMEOUT=60000' >> .env

```

<API Routes>
+ /api/v1/search
    - search for images with a keyword
    - takes in a required query parameter [?keyword=^]
    - takes in optional query parameter [&count=20]