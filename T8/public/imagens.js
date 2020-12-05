function showImage(name, type){
    const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg']

    if(validImageTypes.includes(type))
        var ficheiro = '<img src="/fileStore/' + name + '" width="80%"/>'
    else 
        var ficheiro = '<p>' + name + ', ' + type + '<p>'
    
    var fileObj = $(`
        <div class="w3-row w3-margin">
            <div class="w3-col s6">
                ${ficheiro}
            </div>
            <div class="w3-col s6 w3-border">
                <p>Filename: ${name}</p>
                <p>Mimetype: ${type}</p>
            </div>
        </div>
    `)

    var download = $('<div><a href="/files/download/' + name + '">Download</a></div>')
    $('#display').empty()
    $('#display').append(fileObj,download)
    $('#display').modal()
}

function addFile(){
    $('#insert').append(`<div class="w3-row">
                    <div class="w3-col s3 w3-margin-top">
                        <label class="w3-text-teal">&#8203;</label>
                    </div>
                    <div class="w3-col s9 w3-border w3-margin-top">
                        <input class="w3-input w3-border w3-light-grey" type="file" name="myFile">
                    </div>
                </div>`)
}

function removeFile(){
    $('#insert > div').last().remove() // > é para selecionar child elements
}