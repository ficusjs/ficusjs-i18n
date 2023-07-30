# FicusJS internationalization (i18n)

Functions for managing translations and localization in FicusJS components.

For documentation visit [https://docs.ficusjs.org/i18n/](https://docs.ficusjs.org/i18n/)

## Getting started

FicusJS i18n can be used in any FicusJS component. It is recommended to use the `withI18n` or `withI18nReactive` higher order component to make the translation functions available in the component.

```js
import { createCustomElement, createI18n, withI18n } from 'https://cdn.skypack.dev/ficusjs@6'
import { html, renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers@5/uhtml'

// create the i18n instance
const i18n = createI18n()

// change interpolation delimiters from {{}} to $
i18n.interpolateWith(/\$(\w+)/g)

// populate the messages
i18n.add({
  projectTitle: 'Project title',
  button: {
    text: 'Click me $userName!',
    caption: 'Please click me!'
  },
  itemsCaption: [
    '$count item',
    '$count items'
  ],
  deep: {
    nested: {
      label: 'Deep nested label'
    }
  }
})

// Use the i18n instance in a new component
createCustomElement(
  'i18n-messages',
  withI18n(i18n, {
    renderer,
    render () {
      return html`
        <h1>i18n messages</h1>
        <dl>
          <dt>Title</dt>
          <dd>${this.i18n.t('projectTitle')}</dd>
          <dt>Button text</dt>
          <dd>${this.i18n.t('button.text', { userName: 'George' })}</dd>
          <dt>Button caption</dt>
          <dd>${this.i18n.t('button.caption')}</dd>
          <dt>Items caption</dt>
          <dd>${this.i18n.t('itemsCaption', { count: 0 })}</dd>
          <dd>${this.i18n.t('itemsCaption', { count: 1 })}</dd>
          <dd>${this.i18n.t('itemsCaption', { count: 2 })}</dd>
          <dt>Deep nested label</dt>
          <dd>${this.i18n.t('deep.nested.label')}</dd>
        </dl>
      `
    }
  })
)
```

## Installation

FicusJS i18n can be installed in a number of ways.

### CDN

We recommend using native ES modules in the browser.

```html
<script type="module">
  import { createI18n, getI18n, withI18n, withI18nReactive } from 'https://cdn.skypack.dev/@ficusjs/i18n'
</script>
```

FicusJS i18n is available on [Skypack](https://www.skypack.dev/view/@ficusjs/i18n).

### NPM

FicusJS renderers work nicely with build tools such as Snowpack, Webpack or Rollup. If you are using a NodeJS tool, you can install the NPM package.

```bash
npm install @ficusjs/i18n
```

### Available builds

FicusJS i18n only provides ES module builds. For legacy browsers or alternative modules such as CommonJS, it is recommended to use a build tool to transpile the code.

## Development

How to set-up FicusJS i18n for local development.

1. Clone the repository:

```bash
git clone https://github.com/ficusjs/ficusjs-i18n.git
```

2. Change the working directory

```bash
cd ficusjs-i18n
```

3. Install dependencies

```bash
npm install # or, yarn install
```

4. Run the local development server

```bash
npm run dev # or, yarn dev
```

That's it! Now open http://localhost:8080 to see a local app.

## License

This project is licensed under the MIT License - see the [`LICENSE`](LICENSE) file for details.

## Contributing to FicusJS renderers

Any kind of positive contribution is welcome! Please help us to grow by contributing to the project.

If you wish to contribute, you can work on any features you think would enhance the library. After adding your code, please send us a Pull Request.

> Please read [CONTRIBUTING](CONTRIBUTING.md) for details on our [CODE OF CONDUCT](CODE_OF_CONDUCT.md), and the process for submitting pull requests to us.

## Support

We all need support and motivation. FicusJS is not an exception. Please give this project a ⭐️ to encourage and show that you liked it. Don't forget to leave a star ⭐️ before you move away.

If you found the library helpful, please consider [sponsoring us](https://github.com/sponsors/ficusjs).
