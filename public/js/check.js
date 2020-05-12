const Http = new XMLHttpRequest();


function jsSearch() {

    let searchTxt = document.getElementById("searchTxt");

    if (searchTxt.value.length != 0) {

        const url = 'http://localhost:3000/search/' + searchTxt.value;
        Http.open("GET", url, true);
        Http.send();
    }
    Http.onreadystatechange = (e) => {


        if (Http.readyState == 4 && Http.status == 200) {

            if (Http.responseText) {

                let postsDiv = document.getElementById("postsDiv")

                postsDiv.innerHTML = "";

                let resultList = document.getElementById("results")

                resultList.innerHTML = "";

                if (Http.responseText === "NO MATCHES") {

                    let results = document.createElement("li")

                    let tmpHtml = 'NO MATCHES TRY ANOTHER QUERY'

                    results.innerHTML = tmpHtml;

                    resultList.appendChild(results);

                }


                else {
                    let conv = JSON.parse(Http.responseText);

                    for (let index = 0; index < conv.length; index++) {

                        let match = JSON.parse(conv[index]);

                        let results = document.createElement("li")

                        let tmpHtml = '<a href="http://localhost:3000/post/' + match._id + '">' + match.title + '</a>'

                        results.innerHTML = tmpHtml;

                        resultList.appendChild(results);

                    }

                }
            }
        }
    }
}
