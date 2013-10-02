# dcl-switchclass

DCL util to bind attribute to a set of CSS classes

## Getting Started
Install the module with: `npm install dcl-switchclass`

```javascript
var switchclass = require('dcl-switchclass');

switchclass(Widget, [{
            attribute: 'span',
            values: {
                '1' : 'span1',
                '2' : 'span2',
                '3' : 'span3',
                '4' : 'span4'
            }
        }, {
            attribute: 'size',
            values: {
                'small':'btn-small',
                'large':'btn-large',
                'normal':'btn-normal'
            }
        }]);

var w = new Widget();
w.setAttribute('span', 2);
w.setAttribute('size', 'small');

//w will now have classes span2 and btn-small
```
