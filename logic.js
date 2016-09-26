(function() {

    var config = {
        tunasync_path: "https://mirrors.sjtug.org/static/tunasync.json",
        dir_base: "https://mirrors.sjtug.org", //no trailing slash
        status_path: "https://mirrors.sjtug.org/status.html"
    };

    Object.size = function(obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };

    var tooltips = {};
    var news = [];

    function processJSON(json) {
        return json.map(function(item) {
            var status_class, status_text;
            if (item.status == "failed") {
                status_class = "sync-failed";
                status_text = "Failed";
            }
            else if (item.status == "success")
            {
                status_class = "sync-finished";
                status_text = "Last Sync: "+ item.last_update;
            }
            else {
                status_class = "sync-working";
                status_text = "Syncing";
            }
            return $("<tr />").append(
                $("<td />").append(
                    $("<a />", {
                        "class": "tooltip",
                        "href": config.dir_base + '/' + item.name
                    }).text(item.name)
                )).append(
                    $("<td />").append(
                        $("<span />", {
                            "class": status_class
                        }).text(status_text)
                    )
                );
        });
    }

    function attachTooltips() {
        if (Object.size(tooltips) == helpfiles.length)
            $(".tooltip").each(function() {
                for (var name in tooltips) {
                    var text = $(this).text();
                    if (text == name) {
                        var config = {content: tooltips[name], contentAsHTML: true, interactive: true};
                        $(this).tooltipster(config);
                        $(this).after('<i class="fa fa-question-circle" aria-hidden="true"></i>');
                        $(this).next().tooltipster(config);

                    }
                }
            });
    }

    var loadingHTML =
        $("<div />").addClass("progress").append(
            $("<div />").addClass("indeterminate")
        );

    function updateJS() {
        $("#sync-status").html(loadingHTML);
        $.getJSON(config.tunasync_path,
                  function(data) {
                      $("#sync-status").html(processJSON(data));
                      attachTooltips();
                  });
    }

    function makeNews(title, md, date, isOpen) {
        return $("<li />").append(
            $("<div />", {
                "class": "collapsible-header"
            }).addClass(isOpen ? "active" : "").text(title).append(
                $("<div />", {
                    "class": "right"
                }).text(date))
        ).append(
            $("<div />", {
                "class": "collapsible-body"
            }).html($(md))
        );
    }

    function renderNews() {
        news.sort(function(a, b) {
            if (a < b) return 1;
            if (a == b) return 0;
            else return -1;
        });
        news.map(function(item) {
            $("#news").append(makeNews(item.title, item.md, item.date,
 item.title == newsfiles[0].title));
        });
        $('.collapsible').collapsible({
            accordion : false
        });
    }

    function fetchData() {
        helpfiles.map(function(item) {
            $.get("./helps/"+item+".md","",  function(data) {
                tooltips[item] = markdown.toHTML(data, "Gruber");
                if (Object.size(tooltips) == helpfiles.length)
                    attachTooltips();
            }, "text");
        });
        newsfiles.map(function(item) {
            $.get("news/"+item.filename+".md", function(data) {
                news.push ( {"title": item.title, "md": markdown.toHTML(data, "Gruber"), "date": item.date});
                if (news.length == newsfiles.length)
                    renderNews();
            }, "text");
        });
    }


    $(function() { 
        $("#status-tab").click(function() {
            $("#status-iframe").attr("src", config.status_path);
        });
        updateJS();
        setInterval(updateJS, 30000);
        fetchData();
    });
})();
