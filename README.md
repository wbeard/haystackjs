# haystackjs

#### A JavaScript binding for [haystack](https://haystack.cd), Error Reporting for Humans

### How to install

##### NPM

```javascript
npm install --save haystackjs
```

### Usage

1) Just import your local copy of haystack
2) Then configure it with the token we gave you

```html
<script src="path/to/haystack/dist/index.js">
</script>
<script>
  Haystack.configure({
    projectName: 'Name of your awesome project',
    token: <Your given token>
  });
</script>
```

Nice! Now you should be receiving any errors from your site or app in your inbox.
