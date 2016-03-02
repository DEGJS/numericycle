# numericycle
Numericycle is a Javascript module that animates a number from one value to another. It takes advantage of [Window.requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) to produce smooth animations. Numericycle also can be easily configured for animation duration, easing, and number display format.

## Install
Numericycle is an ES6 module. Consequently, you'll need an ES6 transpiler ([Babel](https://babeljs.io) is a nice one) and a module loader ([SystemJS](https://github.com/systemjs/systemjs) will do the job) as part of your Javascript workflow.

If you're already using the [JSPM package manager](http://jspm.io) for your project, you can install Numericycle with the following command:

```
$ jspm install github:DEGJS/numericycle
```

## Usage
Import Numericylce, create a new instance of it, and get cyclin'.
```js
import numericycle from 'numericycle';

let element = document.querySelector('div');

let instance = numericycle(element);

instance.cycle({
	initialValue: 1,
	finalValue: 10,
	duration: 2000,
	easing: 'easeOut',
	format: '0,0'
});

```


## Parameters

### element
Type: `HTMLElement`   
The HTML element that contains or will contain the number to be animated. 

## Methods

### .cycle(options)
Parameters: `options`   
Animates the content of the HTML element using the values specified in the `options` parameter:

#### options.initialValue
Type: `Number`   
The initial value of the number. If this option is omitted, numericycle will attempt to convert the content of the HTML element to a number.

#### options.finalValue
Type: `Number`   
The final value of the number. This option is required.

#### options.duration
Type: `Number` Default: `2000`   
The duration (in milliseconds) of the animation.

#### options.easing
Type: `String` Default: `easeOut`   
The type of easing that the animation should use. Valid options are `linear`, `easeIn`, `easeOut`, and `easeInOut`.

#### options.format
Type: `String` Default: `0,0`   
The display format for the number. Valid options are `0,0` (thousands separator included) and `0` (thousands separator omitted)

## Browser Support

Numericylce depends on the following browser APIs:
+ [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
+ [Window.requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)

To support legacy browsers, you'll need to include polyfills for the above APIs.