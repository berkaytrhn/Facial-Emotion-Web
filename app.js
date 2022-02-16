
let main = () => {
    const form = document.getElementById("form");
    const inputFile = document.getElementById("fileInput");

    form.addEventListener("input", event => {
        let img = event.target.files[0];
        let image = document.getElementById("image");
        image.src = URL.createObjectURL(img);
    });

    form.addEventListener("submit", event => {
        //console.log(inputFile.files);
        if( inputFile.files.length === 0){
            console.log("Please Choose a file!!");
            return;
        }
        event.preventDefault();

        let endpoint = "http://localhost:5000/upload/";
        let formData = new FormData();

        formData.append("file", inputFile.files[0]);
        //console.log(formData.get("inputFile"));

        upload_image(endpoint, formData);
    });
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
        handle_response(response.data);
    });
}

let handle_response = (response) => {
    console.log(response);
    let pred = response.Predicted;
    let prob = parseFloat(response.Probability);
    let x_min = parseInt(response.x_min);
    let y_min = parseInt(response.y_min);
    let x_max = parseInt(response.x_max);
    let y_max = parseInt(response.y_max);
}


main()