import {formatNumber, stringToNumber } from '../src/numberUtils.js';

describe('stringToNumber', () => {
    it('converts a string to a number', () => {
        const number = stringToNumber('5');

        expect(number).toBe(5);
    });

    it('converts a string with a decimal to a number', () => {
        const number = stringToNumber('5.99');
        expect(number).toBe(5.99);
    });

    it('converts a string with a comma to a number', () => {
        const number = stringToNumber('5,123');
        expect(number).toBe(5123);
    });

    it('converts a string to a negative number', () => {
        const number = stringToNumber('-5');
        expect(number).toBe(-5);
    });

    it('converts an empty string to NaN', () => {
        const number = stringToNumber('');
        expect(number).toBe(NaN);
    });

    it('converts null to NaN', () => {
        const number = stringToNumber(null);
        expect(number).toBe(NaN);
    });

    it('converts undefined to NaN', () => {
        const number = stringToNumber(undefined);
        expect(number).toBe(NaN);
    });
});

describe('formatNumber', () => {
    describe('uses the "0" display format to', () => {
        it('format a number', () => {
            const formattedNumber = formatNumber(5, '0');
            expect(formattedNumber).toBe('5');
        });

        it('format a number with a decimal', () => {
            const formattedNumber = formatNumber(5.99, '0');
            expect(formattedNumber).toBe('5.99');
        });

        it('format a number with a thousandths place', () => {
            const formattedNumber = formatNumber(5000, '0');
            expect(formattedNumber).toBe('5000');
        });
    });

    describe('uses the "0,0" display format to', () => {
        it('format a number with a thousandths place', () => {
            const formattedNumber = formatNumber(5000, '0,0');
            expect(formattedNumber).toBe('5,000');
        });

        it('format a number without a thousandths place', () => {
            const formattedNumber = formatNumber(500, '0,0');
            expect(formattedNumber).toBe('500');
        });

        it('format a number with a decimal', () => {
            const formattedNumber = formatNumber(5000.99, '0,0');
            expect(formattedNumber).toBe('5,000.99');
        });
    });
});