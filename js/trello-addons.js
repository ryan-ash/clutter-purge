$(document).ready(function () {
    var save = "trickychaos";
    var overlay_markup = `
        <a class="icon-lg tc-add-checklist" href="#"></a>
    `;
    var enabled = false;
    var checklist_count = 0;
    var check_delta = 333;

    window.feature_name = "purge trello-addons"

    window.enable_handlers = [check_window_addons,]
    window.disable_handlers = [() => { $(".tc-add-checklist").remove() },]


    if ($.cookie(save)) {
        $("body").trigger("enable");
    }

    function check_window_addons() {
        if (enabled) {
            setTimeout(function () {
                check_window_addons();
            }, check_delta);
        }

        $target = $(".window-wrapper");
        if (!$target.length) {
            return;
        }

        apply_checklist_lightup();

        $addon = $(".tc-add-checklist");
        if ($addon.length) {
            return;
        }

        apply_windows_addons();
    }

    function apply_checklist_lightup() {
        $checklist_items = $(".checklist-item");
        $checklist_items.each(function () {
            $this = $(this);
            $input = $this.find(".edit textarea");

            item = $this.find(".checklist-item-details-text").text();
            input_item = $input.val();

            compare_item = item;
            if (input_item == "") {
                if ($this.hasClass("tc-checked")) {
                    return;
                }
            } else {
                $this.removeClass("tc-checked");
                if (input_item != item) {
                    compare_item = input_item;
                }
            }
            if (compare_item == undefined) {
                return;
            }

            $this.addClass("tc-checked");
            compare_item = compare_item.replace(/\./g, "");

            mark = compare_item[compare_item.length - 1];
            switch (mark) {
                case "!":
                    $this.addClass("tc-important");
                    break;
                case "?":
                    $this.addClass("tc-unsure");
                    break;
                default:
                    $this.removeClass("tc-important");
                    $this.removeClass("tc-unsure");
                    break;
            }
        });
    }

    function apply_windows_addons() {
        $target.append(overlay_markup);
        add_button_events();
        hide_all_checked_items();
    }

    function hide_all_checked_items() {
        $(".js-hide-checked-items").each(function () {
            $(this)[0].click();
        });
    }

    function add_button_events() {
        $(".tc-add-checklist").click(function (e) {
            e.preventDefault();
            $(".js-add-checklist-menu")[0].click();
            $(".pop-over").addClass("checklist");
            $("#id-checklist").val("to do");
            setTimeout(function () {
                check_overlay_shown();
            }, 200);
        });
    }

    function check_overlay_shown() {
        if ($(".pop-over").hasClass("is-shown")) {
            setTimeout(function () {
                check_overlay_shown();
            }, 100);
            return;
        }
        $(".pop-over").removeClass("checklist");
    }
});