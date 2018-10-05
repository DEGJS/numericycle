let returnValue = 0;

export const linear = jest.fn(() => returnValue);
export const easeInOutCubic = jest.fn(() => returnValue);
export const easeOutCubic = jest.fn(() => returnValue);
export const easeInCubic = jest.fn(() => returnValue);

export function __setEasingReturnValue(val) {
    returnValue = val;
}