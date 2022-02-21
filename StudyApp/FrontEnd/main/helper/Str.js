/**
 * Make the first letter uppercase 
 * @param {string}
 * @returns {string}
 */
function FirstCapitalize(str)
{
    return str.charAt(0).toUpperCase() + str.slice(1);
}
export {FirstCapitalize}