define(function (require, exports, module) {

    var PanelView = require("src/panelView"),
        i18n = require("src/i18n").i18n,
        filters = require("src/utils").filters,
        panelHTML = require("text!issuePanel.html"),
        clazz = this,
        panelButtons = {
        BTN_SHOW_BUGS   : "nullpo-alice-btn-bugs",
        BTN_SHOW_OPENED : "nullpo-alice-btn-open",
        BTN_SHOW_CLOSED : "nullpo-alice-btn-closed",
        BTN_SHOW_ALL    : "nullpo-alice-btn-all"
    }

    var IssuePanel = function(model){
        var self = this;
        self.html = panelHTML;
        self.$panelHTML = $(panelHTML);

        self.contentManager = undefined;
        self.model = model;

        self._showDetail = function(title,number){
            var issue = self.model.data.issues.filter(filters.issues.byNumber(number))[0],
                detailHTML = self.$panelHTML.filter("#bottom-alice-issuedetail-tpl").html();

            $("#title-alice").html("#" + number + " - " + issue.title);
            Mustache.parse(detailHTML);
            $("#bottom-alice-issues").html(i18n.LBL_LOADING);
            $.getJSON(baseUrl + "/issues/"+number+"/comments", function(data){
                var obj = {issue:issue, comments:data};
                $("#bottom-alice-issues").html(Mustache.render(detailHTML,obj));
            });
        };

        self.show = function(number){
            self._showDetail(i18n.BTN_ISSUE_DETAIL,number)
        }

        self.beforeHide = function(){

        }

        return self;
    };

    exports.create = function(props){
        return new IssuePanel(props);
    }
});
