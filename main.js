function getElementFromSting(string) {
    let div=document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

let addedParamCount=0;

let parametersBox=document.getElementById("parameterBox");
parametersBox.style.display="none";

let paramsRadio=document.getElementById('paramsradio');
paramsRadio.addEventListener('click', ()=>{
    document.getElementById('requestJsonBox').style.display = "none";
    document.getElementById('parameterBox').style.display = "block";
    document.getElementById("params").style.display="block";
});

let jsonRadio=document.getElementById('jsonradio');
jsonRadio.addEventListener('click', ()=> {
    document.getElementById('parameterBox').style.display="none";
    document.getElementById('params').style.display="none";
    document.getElementById('requestJsonBox').style.display="block";
});

let addParam=document.getElementById('addParam');
addParam.addEventListener('click', ()=> {
    let params = document.getElementById('params');
    let string = `      <div class="form-row my-2">
                        <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamsCount + 2}</label>
                        <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterkey${addedParamsCount + 2}" placeholder="Enter Parameter  ${addedParamsCount + 2} Key">
                        </div>
                        <div class="col-md-4">
                        <input type="text" class="form-control" id="parametervalue${addedParamsCount + 2}" placeholder="Enter Parameter  ${addedParamsCount + 2} Value">
                        </div>
                        <button type="button"  class="btn btn-primary deleteParam">-</button>
                        </div>`;

                        let paramElement = getElementFromSting(string);
                        params.appendChild(paramElement);
                        for (item of deleteParam) {
                            item.addEventListener('click', (e) => {
                                e.target.parentElement.remove();
                            });
                        }
                        addedParamsCount++;
});

let submit=document.getElementById('submit');
submit.addEventListener('click', ()=> {
    console.log('Hello');
    document.getElementById('responseJsonText').value="Please wait...";
    let url=document.getElementById('urlField').value;
    let requestType=document.querySelector("input[name='requestType']:checked").value;
    let contentType=document.querySelector("input[name='contentType']:checked").value;

    if(contentType== 'Params') {
        data={};
        for(i=0;i<addedParamCount+1;i++){
            if(document.getElementById('parameterkey') +(i+1)!= undefined) {
                let key = document.getElementById('parameterkey' + (i + 1)).value;
                let value = document.getElementById('parametervalue' + (i + 1)).value;
            }
        }
        data=JSON.stringify(data)
    }
    else {
        data = document.getElementById('requestJsonText').value;
        
    }

    if(requestType =='GET') {
        console.log(url);
        fetch(url, {
            method:'GET'
        })
        .then(response => response.text())
        .then((text) => {
            console.log(text);
            document.getElementById('responseJsonText').value=text;
        });
    }

    else{
        fetch(url, {
            method: 'POST',
            body:data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              }
        })
            .then(response => response.text())
            .then((text) => {
                document.getElementById('responseJsonText').value = text;
            });
        }

});