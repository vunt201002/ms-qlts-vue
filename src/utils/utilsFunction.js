
/**
 * Format number with .
 * @param {String} num - number need to format.
 * @returns number have been formated.
 */
export const formatNumber = num => {

    if (typeof num === 'string') {
        num = num.replace(/[,.]/g, "");
    }

    if (typeof num === 'string' && !num.includes('.')) {
        return Number(num).toLocaleString('vi-VN');
    } else if (typeof num === 'string' && num.includes('.')) {
        return Number(num.replace(/\./g, "")).toLocaleString('vi-VN');
    } else if (typeof num === 'number') {
        return num.toLocaleString('vi-VN');
    } else {
        return num;
    }
};

/**
 * Change the formated to the number.
 * @param {String} num - formated number (1.000.000)
 * @returns number.
 */
export const reverseFormatNumber = num => {
    if (typeof num === 'string' && !num.includes('.')) {
        return Number(num);
    } else if (typeof num === 'string' && num.includes('.')) {
        return Number(num.replace(/\./g, ""));
    } else {
        return num;
    }
};

export const duplicate = (array, element) => {
    array.push(element);
};
