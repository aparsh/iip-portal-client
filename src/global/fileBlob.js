const buffertoBlob = async (bufferData, contentType) => {
    console.log(bufferData)
    let base64Data = await bufferData.toString('base64')
    console.log(base64Data)
    contentType = contentType || '';
    var sliceSize = 1024;
    // var byteCharacters = atob(decodeURIComponent(base64Data));
    var byteCharacters = base64Data
    // var byteCharacters = decodeURIComponent(escape(window.atob(base64Data)))
    var bytesLength = byteCharacters.length;
    var slicesCount = Math.ceil(bytesLength / sliceSize);
    var byteArrays = new Array(slicesCount);

    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        var begin = sliceIndex * sliceSize;
        var end = Math.min(begin + sliceSize, bytesLength);

        var bytes = new Array(end - begin);
        for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
            bytes[i] = byteCharacters[offset].charCodeAt(0);
        }
        byteArrays[sliceIndex] = new Uint8Array(bytes);
    }

    // let buffer = Buffer.from(bufferData);
    // let byteArrays = new Uint8Array.from(buffer);
    return new Blob(byteArrays, { type: contentType });
}

export default buffertoBlob