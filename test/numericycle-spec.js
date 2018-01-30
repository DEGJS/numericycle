import numericycle from 'src/numericycle';
import * as easing from "DEGJS/easing";

//This is a test suite for the numericycle plugin
describe('Numericycle', () => {

  let element;
  const defaultDuration = 2000;
  const millisecondsPerFrame = 16.66666666666667;

  //Mock out window.requestAnimationFrame
  beforeAll(function() {
    spyOn(window, 'requestAnimationFrame').and.callFake(function(callback) {
      setTimeout(function() {
        callback();
      }, millisecondsPerFrame);

      return Math.random();
    });

    spyOn(window, 'cancelAnimationFrame').and.callFake(function(requestId) {
      
    });
  });

  
  beforeEach(function() {
    jasmine.clock().install();

    //Create a DOM element to use in the tests
    element = document.createElement('div');
    document.body.appendChild(element);
  });


  
  afterEach(function() {
    jasmine.clock().uninstall();

    if(window.requestAnimationFrame)
      window.requestAnimationFrame.calls.reset();
  });

  describe('has a configurable duration', function() {
    it('changes the number after the specified duration', function() {
      let numericycleInst = numericycle(element);
      numericycleInst.cycle({
        initialValue: 1,
        finalValue: 10,
        duration: 3000,
        easing: 'linear'
      });

      jasmine.clock().tick(2000);

      expect(element.textContent).not.toBe('10');

      jasmine.clock().tick(1000);

      expect(element.textContent).toBe('10');

    });

    it('changes the number if duration is very small', function() {
      
      let numericycleInst = numericycle(element);
      numericycleInst.cycle({
        initialValue: 1,
        finalValue: 10,
        duration: 1
      });

      jasmine.clock().tick(1000);

      expect(element.textContent).toBe('10');
    });

    it('changes the number immediately if duration is zero', function() {
      
      let numericycleInst = numericycle(element);
      numericycleInst.cycle({
        initialValue: 1,
        finalValue: 10,
        duration: 0
      });

      expect(element.textContent).toBe('10');
      expect(window.requestAnimationFrame).not.toHaveBeenCalled();
    });

    it('throws an error if duration is not a number', function() {
      
      let numericycleInst = numericycle(element);
      let options = {
        initialValue: 1,
        finalValue: 10,
        duration: 'hello'
      };
     
      expect(function(){
         numericycleInst.cycle(options);
      }).toThrowError(TypeError);
    });

    it('throws an error if duration is a negative number', function() {
      
      let numericycleInst = numericycle(element);
      let options = {
        initialValue: 1,
        finalValue: 10,
        duration: -6
      };

      expect(function(){
        numericycleInst.cycle(options);
      }).toThrowError(RangeError);
    });
  });

  describe('has a configurable number format', function() {
    it('displays a standard number format', function() {
      let numericycleInst = numericycle(element);
      numericycleInst.cycle({
        initialValue: 900,
        finalValue: 1500,
        format: '0,0'
      });

      jasmine.clock().tick(defaultDuration);

      expect(element.textContent).toBe('1,500');

    });

    it('displays an integer number format', function() {
      let numericycleInst = numericycle(element);
      numericycleInst.cycle({
        initialValue: 900,
        finalValue: 1500,
        format: '0'
      });

      jasmine.clock().tick(defaultDuration);

      expect(element.textContent).toBe('1500');

    });

    it('displays a standard number format if invalid format is specified', function() {
      let numericycleInst = numericycle(element);
      numericycleInst.cycle({
        initialValue: 900,
        finalValue: 1500,
        format: 'invalid'
      });

      jasmine.clock().tick(defaultDuration);

      expect(element.textContent).toBe('1,500');

    });
  });

  describe('has a configurable animation easing', function() {

    let midpointTime = Math.ceil(millisecondsPerFrame * 30);


    it('changes the number with a linear animation', function() {
      let numericycleInst = numericycle(element);
      numericycleInst.cycle({
        initialValue: 1,
        finalValue: 10,
        duration: 1000,
        easing: 'linear'
      });

      expect(parseFloat(element.textContent)).toBe(Math.round(easing.linear(0, 1, 9, 60)));
      jasmine.clock().tick(midpointTime);
      expect(parseFloat(element.textContent)).toBe(Math.round(easing.linear(30, 1, 9, 60)));
      jasmine.clock().tick(midpointTime);
      expect(parseFloat(element.textContent)).toBe(Math.round(easing.linear(60, 1, 9, 60)));
    });

    it('changes the number with an ease-in animation', function() {
      let numericycleInst = numericycle(element);
      numericycleInst.cycle({
        initialValue: 1,
        finalValue: 10,
        duration: 1000,
        easing: 'easeIn'
      });

      expect(parseFloat(element.textContent)).toBe(Math.round(easing.easeInCubic(0, 1, 9, 60)));
      jasmine.clock().tick(midpointTime);
      expect(parseFloat(element.textContent)).toBe(Math.round(easing.easeInCubic(30, 1, 9, 60)));
      jasmine.clock().tick(midpointTime);
      expect(parseFloat(element.textContent)).toBe(Math.round(easing.easeInCubic(60, 1, 9, 60)));
    });

    it('changes the number with an ease-out animation', function() {
      let numericycleInst = numericycle(element);
      numericycleInst.cycle({
        initialValue: 1,
        finalValue: 10,
        duration: 1000,
        easing: 'easeOut'
      });

      expect(parseFloat(element.textContent)).toBe(Math.round(easing.easeOutCubic(0, 1, 9, 60)));
      jasmine.clock().tick(midpointTime);
      expect(parseFloat(element.textContent)).toBe(Math.round(easing.easeOutCubic(30, 1, 9, 60)));
      jasmine.clock().tick(midpointTime);
      expect(parseFloat(element.textContent)).toBe(Math.round(easing.easeOutCubic(60, 1, 9, 60)));
    });

    it('changes the number with an ease-in-out animation', function() {
      let numericycleInst = numericycle(element);
      numericycleInst.cycle({
        initialValue: 1,
        finalValue: 10,
        duration: 1000,
        easing: 'easeInOut'
      });

      expect(parseFloat(element.textContent)).toBe(Math.round(easing.easeInOutCubic(0, 1, 9, 60)));
      jasmine.clock().tick(midpointTime);
      expect(parseFloat(element.textContent)).toBe(Math.round(easing.easeInOutCubic(30, 1, 9, 60)));
      jasmine.clock().tick(midpointTime);
      expect(parseFloat(element.textContent)).toBe(Math.round(easing.easeInOutCubic(60, 1, 9, 60)));
    });

  });

  describe('has a configurable initial value', function() {

    it('overrides the initial text content with the specified initial value', function() {
      element.textContent = '20';

      let numericycleInst = numericycle(element);
      numericycleInst.cycle({
        initialValue: 1,
        finalValue: 10
      });

      expect(element.textContent).toBe('1');      

    });

    it('uses the text content if no initial value is specified', function() {
      element.textContent = '1';

      let numericycleInst = numericycle(element);
      numericycleInst.cycle({
        finalValue: 10
      });

      expect(element.textContent).toBe('1');      

    });

    it('throws an exception if the inital value is not a number', function() {
      
      let numericycleInst = numericycle(element);
      let options = {
        initialValue: 'hello',
        finalValue: 5
      };


      expect(function() {
        numericycleInst.cycle(options);
      }).toThrowError(TypeError);
    });

  });

  describe('has a configurable final value', function() {

    it('throws an exception if the final value is not a number', function() {

      let numericycleInst = numericycle(element);
      let options = {
        initialValue: 1,
        finalValue: 'hello'
      };

      expect(function() {
        numericycleInst.cycle(options);
      }).toThrowError(TypeError);

    });

  });


  describe('updates the number to the final value', () => {
    
    //Tests whether the number gets incremented 
    it('increments the number if the initial value is less than the final value', function() {
      
      let numericycleInst = numericycle(element);
      numericycleInst.cycle({
        initialValue: 1,
        finalValue: 10
      });

      jasmine.clock().tick(defaultDuration);    
      expect(element.textContent).toBe('10');

    });


    it('decrements the number if the final value is less than the initial value', function() {
      
      let numericycleInst = numericycle(element);
      numericycleInst.cycle({
        initialValue: 10,
        finalValue: 1
      });

      jasmine.clock().tick(defaultDuration);

      expect(element.textContent).toBe('1');
    });

    it('does not change the number if initial value equals the final value', function() {

      var initialTextContent = element.textContent;
      
      let numericycleInst = numericycle(element);
      numericycleInst.cycle({
        initialValue: 5,
        finalValue: 5
      });

      jasmine.clock().tick(defaultDuration);

      expect(element.textContent).toBe(initialTextContent);
      expect(window.requestAnimationFrame).not.toHaveBeenCalled();
    });

    it('stops current animation and begins new one when specified', function() {

      let numericycleInst = numericycle(element);
      numericycleInst.cycle({
        initialValue: 1,
        finalValue: 10,
        duration: 2000,
        easing: 'linear'
      });

      jasmine.clock().tick(1000);

      var requestId = window.requestAnimationFrame.calls.mostRecent().returnValue;

      numericycleInst.cycle({
        initialValue: 30,
        finalValue: 40,
        duration: 2000,
        easing: 'linear'
      });
      
      expect(window.cancelAnimationFrame).toHaveBeenCalledWith(requestId);

      expect(element.textContent).toBe('30');

      jasmine.clock().tick(2000);

      expect(element.textContent).toBe('40');

      expect(window.requestAnimationFrame).toHaveBeenCalledTimes(182);

    });

  });


  describe('has a fallback for no animation support', function() {

    beforeAll(function() {
      window.requestAnimationFrame = null;
    });

    it('updates number immediately', function() {

      let numericycleInst = numericycle(element);
      numericycleInst.cycle({
        initialValue: 1,
        finalValue: 10
      });
    
      expect(element.textContent).toBe('10');
    });
  });

});