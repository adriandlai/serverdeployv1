const express = require("express");
const cors = require("cors");
const cohorts = require("./cohorts");
const PORT = process.env.PORT || 3000;


function findById(data, id){
    for (let i = 0; i < data.length; i++){
        if (data[i].id == id){
            return data[i];
        }
    }
    return null;
}

const app = express();
app.use(cors());

app.get("/", function (request, response) {
    response.json({data: cohorts});
});

app.get("/:id", function (request, response) {
    var record = findById(cohorts, request.params.id);
    if (!record){
        response.status = 404;
        response.json({
            error: {
                message: "No record found!"
            }
        });
    }

    response.json({data: record});
});

app.listen(PORT);
