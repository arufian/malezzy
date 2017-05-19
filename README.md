# malezzy
Lazy load library for all kind images.

Images that support in this library:
- single image.
- multiple images on container.
- slider images.
- carousel images.


## Install
Download minified file in [here](https://github.com/arufian/malezzy/releases/download/0.1/malezzy.min.js)

## Usage

First add the script to your html.
```html
 <script type="text/javascript" src="/path/to/libs/malezzy.min.js" defer="true"></script>
```
### Basic usage

```javascript
  Malezzy.addImage(<element-selector>);
```
Will load all images that have same selector name.

### Image under a container

```javascript
  Malezzy.addImage(<element-selector>, <container-selector>);
```
This option can be used to load image within a div, slider or even carousel.

### On your html

Instead of use `src`, please use `data-src` to define image source url.
```html
  <img data-src="/path/to/image" class="lazy-images" />
```

