import numericycle from '../src/numericycle.js';
import { linear, easeInCubic, easeOutCubic, easeInOutCubic, __setEasingReturnValue } from '@degjs/easing';

describe('numericycle', () => {
    let element;
    const mspf = 16.6666667;
    const defaultDuration = 2000;
    const defaultDurationMidpoint = defaultDuration/2;

    beforeAll(() => {
        /* mock requestAnimationFrame to invoke callback after 1 frame (60fps/1000ms = 16.6666667 mspf)*/
        global.requestAnimationFrame = jest.fn(cb => {
            setTimeout(() => cb(), 16.6666667);
            return 1;
        });

        global.cancelAnimationFrame = jest.fn();
    });

    beforeEach(() => {
        element = document.createElement('div');
        document.body.appendChild(element);

        jest.useFakeTimers();
        jest.clearAllTimers()

        linear.mockClear();
        easeInCubic.mockClear();
        easeOutCubic.mockClear();
        easeInOutCubic.mockClear();
        global.requestAnimationFrame.mockClear();
    });

    describe('throws an error', () => {
        it('if duration is not a number', function() {
            const numericycleInst = numericycle(element);
            let options = {
                initialValue: 1,
                finalValue: 10,
                duration: 'hello'
            };
           
            function test() {
                numericycleInst.cycle(options);
            }
    
            expect(test).toThrow(TypeError);
            expect(test).toThrow('duration must be a number');
        });
    
        it('if duration is a negative number', function() {
            const numericycleInst = numericycle(element);
            let options = {
                initialValue: 1,
                finalValue: 10,
                duration: -6
            };
           
            function test() {
                numericycleInst.cycle(options);
            }
    
            expect(test).toThrow(RangeError);
            expect(test).toThrow('duration cannot be a negative number');
        });

        it('if initialValue is not a number', function() {
            const numericycleInst = numericycle(element);
            let options = {
                initialValue: 'hello',
                finalValue: 10,
                duration: 1000
            };
           
            function test() {
                numericycleInst.cycle(options);
            }
    
            expect(test).toThrow(TypeError);
            expect(test).toThrow('initialValue must be a number');
        });

        it('if finalValue is not a number', function() {
            const numericycleInst = numericycle(element);
            let options = {
                initialValue: 1,
                finalValue: 'hello',
                duration: 1000
            };
           
            function test() {
                numericycleInst.cycle(options);
            }
    
            expect(test).toThrow(TypeError);
            expect(test).toThrow('finalValue must be a number');
        });
    });

    describe('updates the number to the final value immediately', () => {
        it('if duration is zero', () => {
            const numericycleInst = numericycle(element);
            numericycleInst.cycle({
                initialValue: 1,
                finalValue: 10,
                duration: 0
            });
    
            const requestAnimationFrameSpy = jest.spyOn(window, 'requestAnimationFrame');
    
            expect(element.textContent).toBe('10');
            expect(requestAnimationFrameSpy).not.toHaveBeenCalled();
        });

        it('if initial value equals final value', () => {
            const numericycleInst = numericycle(element);
            numericycleInst.cycle({
                initialValue: 10,
                finalValue: 10,
                duration: defaultDuration
            });
    
            const requestAnimationFrameSpy = jest.spyOn(window, 'requestAnimationFrame');
    
            expect(element.textContent).toBe('10');
            expect(requestAnimationFrameSpy).not.toHaveBeenCalled();
        });
    
        it('if requestAnimationFrame is not supported', () => {
            const requestAnimationFrame = global.requestAnimationFrame;
            global.requestAnimationFrame = null;
            
            const numericycleInst = numericycle(element);
            numericycleInst.cycle({
                initialValue: 1,
                finalValue: 10,
                duration: 1000
            });
           
            expect(element.textContent).toBe('10');
    
            global.requestAnimationFrame = requestAnimationFrame; 
        });
    });

    describe('formats the number', function() {
        it('using a {0,0} format', function() {
            const numericycleInst = numericycle(element);
            numericycleInst.cycle({
                initialValue: 900,
                finalValue: 1500,
                format: '0,0',
                duration: defaultDuration
            });
    
            __setEasingReturnValue(1500);
            jest.advanceTimersByTime(defaultDuration);
    
            expect(element.textContent).toBe('1,500');
        });
    
        it('using a {0} format', function() {
            const numericycleInst = numericycle(element);
            numericycleInst.cycle({
                initialValue: 900,
                finalValue: 1500,
                format: '0',
                duration: defaultDuration
            });
    
            __setEasingReturnValue(1500);
            jest.advanceTimersByTime(defaultDuration);
    
            expect(element.textContent).toBe('1500');
    
        });
    
        it('using a {0,0} format if invalid format is specified', function() {
            const numericycleInst = numericycle(element);
            numericycleInst.cycle({
                initialValue: 900,
                finalValue: 1500,
                format: 'invalid',
                duration: defaultDuration
            });
    
            __setEasingReturnValue(1500);
            jest.advanceTimersByTime(defaultDuration);
    
            expect(element.textContent).toBe('1,500');    
        });
    }); 

    describe('animates the number using a', () => {
        
        function verifyTimeline(timeline, config) {
            let iteration = 0;
            timeline.forEach(entry => {
                __setEasingReturnValue(entry.easingValue);
                iteration += Math.ceil(entry.time/mspf);
                if(entry.time > 0) {
                    jest.advanceTimersByTime(entry.time);
                    expect(config.easingFunc).toHaveBeenCalledWith(iteration, config.initialValue, config.changeInValue, config.totalIterations);
                }
                expect(element.textContent).toBe(entry.textContent);                
            });
        }

        it('linear easing function', function() {
            const numericycleInst = numericycle(element);
            numericycleInst.cycle({
                initialValue: 0,
                finalValue: 10,
                duration: defaultDuration,
                easing: 'linear'
            });

            verifyTimeline([
                {
                    easingValue: 0,
                    time: 0,
                    textContent: '0'
                },
                {
                    easingValue: 5,
                    time: defaultDurationMidpoint,
                    textContent: '5'
                },
                {
                    easingValue: 10,
                    time: defaultDurationMidpoint,
                    textContent: '10'
                }
            ], {
                easingFunc: linear,
                initialValue: 0,
                changeInValue: 10,
                totalIterations: 120
            });

            expect(linear).toHaveBeenCalledTimes(120);
        });

        it('ease-in easing function', function() {
            const numericycleInst = numericycle(element);
            numericycleInst.cycle({
                initialValue: 0,
                finalValue: 10,
                duration: defaultDuration,
                easing: 'easeIn'
            });

            verifyTimeline([
                {
                    easingValue: 0,
                    time: 0,
                    textContent: '0'
                },
                {
                    easingValue: 2,
                    time: defaultDurationMidpoint,
                    textContent: '2'
                },
                {
                    easingValue: 10,
                    time: defaultDurationMidpoint,
                    textContent: '10'
                }
            ], {
                easingFunc: easeInCubic,
                initialValue: 0,
                changeInValue: 10,
                totalIterations: 120
            });

            expect(easeInCubic).toHaveBeenCalledTimes(120);
        });

        it('ease-out easing function', function() {
            const numericycleInst = numericycle(element);
            numericycleInst.cycle({
                initialValue: 0,
                finalValue: 10,
                duration: defaultDuration,
                easing: 'easeOut'
            });

            verifyTimeline([
                {
                    easingValue: 0,
                    time: 0,
                    textContent: '0'
                },
                {
                    easingValue: 7,
                    time: defaultDurationMidpoint,
                    textContent: '7'
                },
                {
                    easingValue: 10,
                    time: defaultDurationMidpoint,
                    textContent: '10'
                }
            ], {
                easingFunc: easeOutCubic,
                initialValue: 0,
                changeInValue: 10,
                totalIterations: 120
            });

            expect(easeOutCubic).toHaveBeenCalledTimes(120);
        });

        it('ease-in-out easing function', function() {
            const numericycleInst = numericycle(element);
            numericycleInst.cycle({
                initialValue: 0,
                finalValue: 10,
                duration: defaultDuration,
                easing: 'easeInOut'
            });

            verifyTimeline([
                {
                    easingValue: 0,
                    time: 0,
                    textContent: '0'
                },
                {
                    easingValue: 5,
                    time: defaultDurationMidpoint,
                    textContent: '5'
                },
                {
                    easingValue: 10,
                    time: defaultDurationMidpoint,
                    textContent: '10'
                }
            ], {
                easingFunc: easeInOutCubic,
                initialValue: 0,
                changeInValue: 10,
                totalIterations: 120
            });

            expect(easeInOutCubic).toHaveBeenCalledTimes(120);
        });
    });

    describe('updates the number to the final value', () => {
        it('when the initial value is greater than the final value', () => {
            const numericycleInst = numericycle(element);
            numericycleInst.cycle({
                initialValue: 10,
                finalValue: 1,
                duration: defaultDuration
            });
    
            __setEasingReturnValue(1);
            jest.advanceTimersByTime(defaultDuration);
    
            expect(element.textContent).toBe('1');
        });
        
        it('when the duration is very short', () => {
            const numericycleInst = numericycle(element);
            numericycleInst.cycle({
                initialValue: 0,
                finalValue: 10,
                duration: 1
            });
    
            __setEasingReturnValue(10);
            jest.advanceTimersByTime(mspf);
    
            expect(element.textContent).toBe('10');
        });

    });

    it('uses the element text content if the initial value is not specified', () => {
        element.textContent = '1';
        
        const numericycleInst = numericycle(element);
        numericycleInst.cycle({
            finalValue: 10,
            duration: defaultDuration
        });

        expect(element.textContent).toBe('1');
    });

    it('replaces the element text content with the specified initial value', () => {
        element.textContent = '100';
        
        const numericycleInst = numericycle(element);
        numericycleInst.cycle({
            initialValue: 1,
            finalValue: 10,
            duration: defaultDuration
        });

        expect(element.textContent).toBe('1');
    });

    it('stops current animation and begins new animation when specified', () => {        
        const numericycleInst = numericycle(element);
        numericycleInst.cycle({
            initialValue: 1,
            finalValue: 10,
            duration: defaultDuration,
            easing: 'linear'
        });

        __setEasingReturnValue(5);
        jest.advanceTimersByTime(mspf*20);
       
        const results = global.requestAnimationFrame.mock.results;
        const requestId = results[results.length-1].value;

        numericycleInst.cycle({
            initialValue: 30,
            finalValue: 40,
            duration: defaultDuration,
            easing: 'linear'
        });

        expect(global.cancelAnimationFrame).toHaveBeenCalledWith(requestId);

        expect(element.textContent).toBe('30');

        __setEasingReturnValue(40);
        jest.advanceTimersByTime(defaultDuration);

        expect(element.textContent).toBe('40');
    });
});