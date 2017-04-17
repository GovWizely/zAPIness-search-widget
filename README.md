# zAPIness-search-widget

A search widget that allows users to search a given zAPIness endpoint.

<img width="638" alt="screen shot 2017-04-17 at 4 13 43 pm" src="https://cloud.githubusercontent.com/assets/21019282/25083294/dd33c8d2-2388-11e7-9cb7-18e6a25736b4.png">
____


### Basic Usage

[Live Demo](http://zapi-widget.herokuapp.com/)

zAPIness-search-widget will be loaded in any webpage by embedding the following javascripts into the page:

```javascript
<script type="text/javascript">
  var script = document.createElement('script');
  script.src = "https://govwizely.github.io/zAPIness-search-widget/static/js/main.fdfe92ee.js";
  document.getElementsByTagName('head')[0].appendChild(script);

  window.onload = function() {
    //Create div element
    var div = document.createElement("div");
    div.setAttribute("id", "root");
    document.body.appendChild(div);

    // Initiate the search widget with endpoint
    SearchWidget.new({
      endpoint: "[zAPIness endpoint]"
    });
  }
</script>
```

---

### Features

* __Search with Keyword__: Perform search when users type
* __Additional Filters__: Allow user to add filterings on the search
* __Basic Pagination__

___

### Development Setup

```
git clone [repo]
npm install
npm start
```

To setup endpoint, refer to https://github.com/GovWizely/zAPIness for instructions.
___

### Development Notes

* Get JS minified file:```npm run build```
* Run test: ```npm run test```
* Run ESLint: ```npm run lint```
* Deploy to GH Page(optional): ```npm run deploy```

___

### Troubleshooting

__Search Widget is not interacting with endpoint__

Currently, zAPIness-search-widget can only interact with zAPIness endpoint on http. Make sure you access your webpage on http instead of https
