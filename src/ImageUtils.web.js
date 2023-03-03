/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

export const loadImage = (options, callback) => {
    var input = document.createElement('input');
    input.type = 'file';
    input.onchange = e => { 
        var file = e.target.files[0]; 
        
        const fileReader = new FileReader();
        fileReader.onload = () => {
            const srcData = fileReader.result;
            console.log('base64:', srcData)

            var assets = [{
                base64: srcData
            }];
    
            callback({
                assets: assets
            })

        };
        fileReader.readAsDataURL(file);
     }
    input.click();
}