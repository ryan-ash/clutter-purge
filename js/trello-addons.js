$(document).ready(function() {
    var $body = $("body");

    var cookie_lifetime = 365 * 5;
    var save = "trickychaos";
    var feature_name = "trello-addons"
    var overlay_markup = `
        <a class="icon-lg tc-add-checklist" href="#"></a>
    `;
    var enabled = false;
    var checklist_count = 0;


    // === main ===

    if ($.cookie(save)) {
        enable();
    }

    $(document).keydown(function(e) {
        if (e.which != 113)
            return;
        toggle_display_mode();
    });



    // === functions ===

    function toggle_display_mode() {
        if ($body.hasClass(feature_name))
            disable();
        else
            enable();
    }

    function enable() {
        enabled = true;
        $body.addClass(feature_name);
        $.cookie(save, true, { expires: cookie_lifetime });

        check_window_addons();
    }

    function disable() {
        enabled = false;
        $body.removeClass(feature_name);
        $.cookie(save, null);

        $(".tc-add-checklist").remove();
    }

    function check_window_addons() {
        if (enabled) {
            setTimeout(function() {
                check_window_addons();
            }, 100);
        }

        $target = $(".window-wrapper");
        if (!$target.length) {
            return;
        }

        $addon = $(".tc-add-checklist");
        if ($addon.length) {
            return;
        }

        apply_windows_addons();
    }

    function apply_windows_addons() {
        $target.append(overlay_markup);
        add_button_events();
        hide_all_checked_items();
    }

    function hide_all_checked_items() {
        $(".js-hide-checked-items").each(function() {
            $(this)[0].click();
        });
    }

    function add_button_events() {
        $(".tc-add-checklist").click(function(e){
            e.preventDefault();
            result = $(".js-add-checklist-menu")[0].click();
        });
    }
});