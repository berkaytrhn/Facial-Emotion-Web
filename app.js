
let main = () => {
    const form = document.getElementById("form");
    const inputFile = document.getElementById("fileInput");

    form.addEventListener("input", event => {
        let img = event.target.files[0];
        let image = document.getElementById("image");
        image.src = URL.createObjectURL(img);
        let result = document.getElementById("result");
        result.innerHTML="";
    });

    form.addEventListener("submit", event => {
        //console.log(inputFile.files);
        if( inputFile.files.length === 0){
            alert("Please Choose a file!!");
            return;
        }
        set_loading();
        event.preventDefault();

        let endpoint = "http://localhost:5000/upload/";
        let formData = new FormData();

        formData.append("file", inputFile.files[0]);
        //console.log(formData.get("inputFile"));

        upload_image(endpoint, formData);
    });
}


let set_loading = () => {
    let gif = document.createElement("img");
    gif.src="loading.gif";
    gif.style.maxHeight= "3%";
    gif.style.maxWidth= "3%";

    console.log(gif);
    let text = document.createElement("p");
    text.innerText = "Loading...";
    console.log(gif.innerHTML);
    result.appendChild(gif);
    result.appendChild(text);

}

let upload_image = async (endpoint, formData) =>{
    await axios.post(
        endpoint, 
        formData,
        {
            headers:{
                "Content-Type": "multipart/form-data"
            }
        }
    ).then(response => {
        setTimeout(() => {
            handle_response(response.data);
        }, 1500);
    });
}

let handle_response = (response) => {
    console.log(response);
    let pred = response.Predicted;
    document.getElementById("result").innerHTML = pred;
}


main()