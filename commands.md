solve build error :-

mkdir patches

Copy "@flue+cli+1.0.0-beta.9.patch" file into that "patches\" folder, then:

npm install -D patch-package

Add to package.json:
"scripts": {
  "postinstall": "patch-package"
}

npm install

npx flue build --target cloudflare
npx wrangler deploy --config dist/<worker-name>/wrangler.json
npx wrangler secret put GOOGLE_API_KEY --config dist/<worker-name>/wrangler.json