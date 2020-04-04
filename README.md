# `<html>` to `<template>` webpack loader

Create template from static html files with inline styles.

Make `<web-components>` instead of `<iframes>`!

## Installation

Install with npm

```bash
npm install --save-dev html-to-template-loader
```

## Usage

Import html to use in your custom element:

```javascript
// use loader inline or place to your webpack module.rules
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
- auto generate base64 from paths to local images
- auto generate base64 from paths to local fonts
