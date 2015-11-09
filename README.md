# tg-tag-box

The best project ever.

## Getting Started
### On the server
Install the module with: `npm install tg-tag-box`

```javascript
var tg_tag_box = require('tg-tag-box');
tg_tag_box.awesome(); // "awesome"
```

### In the browser
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/thiago/tg-tag-box/master/dist/tg-tag-box.min.js
[max]: https://raw.github.com/thiago/tg-tag-box/master/dist/tg-tag-box.js

In your web page:

```html
<script src="dist/tg-tag-box.min.js"></script>
<script>
awesome(); // "awesome"
</script>
```

In your code, you can attach tg-tag-box's methods to any object.

```html
<script>
var exports = Bocoup.utils;
</script>
<script src="dist/tg-tag-box.min.js"></script>
<script>
Bocoup.utils.awesome(); // "awesome"
</script>
```

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

_Also, please don't edit files in the "dist" subdirectory as they are generated via Grunt. You'll find source code in the "lib" subdirectory!_

## Release History
_(Nothing yet)_

## License
Copyright (c) 2015 Thiago Andrade  
Licensed under the MIT license.
