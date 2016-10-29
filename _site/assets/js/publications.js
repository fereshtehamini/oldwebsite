/**
 * Created by karthik on 10/29/16.
 */

Array.prototype.unique = function () {
    var a = this.concat();
    for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
            if (a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
};

$(document).ready(function () {

    d3.json("/assets/data/publications.json", function (data) {

        // Empty the div
        d3.select("#publicationsList").empty();
        var publicationsList = d3.select("#publicationsList").style("float", "left");

        // meta data
        var coauthors = [];
        var keywords = [];
        var journals = [];
        var conferences = [];

        data.forEach(function (datum) {
            coauthors = coauthors.concat(datum.authors);
            keywords = keywords.concat(datum.keywords);

            if (datum.type == "Conference") {
                conferences.push(datum);
            } else if (datum.type = "Journal") {
                journals.push(datum);
            }

        });
        coauthors = coauthors.unique();
        keywords = keywords.unique();

        publicationsList.append("div").html("Karthik has worked on <u>" + data.length + " publications</u> with <u>" + (coauthors.length - 1) + " collaborators</u> so far.")


        // publications
        publicationsContent = publicationsList.append("div").attr("id", "publicationsContent");

        publicationsContent.append("h3").text("Journal Papers (" + journals.length + ")");
        journals.forEach(function (paper, i) {
            showPublication(publicationsContent, paper, i);

        });

        publicationsContent.append("h3").html("<br/>Conference Papers (" + conferences.length + ")");
        conferences.forEach(function (paper, i) {
            showPublication(publicationsContent, paper, i);
        });

    });

});

function showPublication (publicationsContent, paper, i) {

    publicationsContent.append("div").style("float", "left").style("display", "block")
        .style("width", "100%")
        .style("class", "archive");

    var pub = publicationsContent.append("div").style("display", "block")
        .style("padding-left", "10px")
        .style("line-height", "1")
        .style("margin-bottom", "20px")
        .style("background", "white");

    pub.append("div").style("width", "110px")
        .style("height", "72px")
        .style("display", "inline-block")
        .style("border", "1.5px solid #222")
        .style("background-size", "cover")
        .style("background-repeat", "no-repeat")
        .style("vertical-align", "top")
        .style("background-image", "url(/assets/images/" + paper.name + ".png");

    var pubInfo = pub.append("div").style("width", "calc(100% - 110px)")
        .style("height", "100%")
        .style("background", "white")
        .style("padding-left", "10px")
        .style("height", "72px")
        .style("display", "inline-block");

    pubInfo.append("span").html(paper.title+"<br/>").style("font-size", "14px");

    paper.authors.forEach(function (author, j) {
        if (author == "Sriram Karthik Badam") {
            author = "<u>" + author + "</u>";
        }

        if (j != paper.authors.length - 1) {
            author = author + ", ";
        } else {
            author = author + "<br/>";
        }


        pubInfo.append("span").html(author).style("font-size", "12px");
    })

    pubInfo.append("span").html(paper.venue + ", " + paper.year +"<br/>").style("font-size", "12px");

    if (paper.pdf != "") {
        pubInfo.append("span").attr("class", "textlink").html('<a target="_blank" href="' + paper.pdf + '">[pdf]</a>  ').style("font-size", "12px");
    }

    if (paper.video != "") {
        pubInfo.append("span").attr("class", "textlink").html('<a target="_blank" href="' + paper.video + '">[video]</a>  ').style("font-size", "12px");
    }
    //
    // if (paper.bibtex != "") {
    //     pubInfo.append("span").attr("class", "textlink").html('<a target="_blank" href="' + paper.bibtex + '">(bibtex)</a> ').style("font-size", "12px");
    // }

}
