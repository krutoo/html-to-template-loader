# `<html>` to `<template>` webpack loader

Create template from static html files with inline styles.

Make `<web-components>` instead of `<iframes>`!

## Usage

Import html to use in your custom element:

```javascript
import templateHTML from 'html-to-template-loader!../html/banner.html';

const template = document.createElement('template');
template.innerHTML = templateHTML;

export class TopBanner extends HTMLElement {
    constructor () {
        // use your template...
    }
}
```

## To Do
- make base64 from image links
- make base64 from fonts links
