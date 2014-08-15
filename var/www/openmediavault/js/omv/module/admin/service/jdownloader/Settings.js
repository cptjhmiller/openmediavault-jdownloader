/**
 * Copyright (C) 2013 OpenMediaVault Plugin Developers
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

// require("js/omv/WorkspaceManager.js")
// require("js/omv/workspace/form/Panel.js")
// require("js/omv/data/Store.js")
// require("js/omv/data/Model.js")
// require("js/omv/form/plugin/LinkedFields.js")

Ext.define("OMV.module.admin.service.jdownloader.Settings", {
    extend   : "OMV.workspace.form.Panel",
    requires : [
        "OMV.data.Model",
        "OMV.data.Store"
    ],

    initComponent : function () {
        var me = this;

        me.on("load", function () {
            var checked = me.findField("enable").checked;
            var showtab = me.findField("showtab").checked;
            var parent = me.up("tabpanel");

            if (!parent)
                return;

            var managementPanel = parent.down("panel[title=" + _("Web Interface") + "]");

            if (managementPanel) {
                checked ? managementPanel.enable() : managementPanel.disable();
                showtab ? managementPanel.tab.show() : managementPanel.tab.hide();
            }
        });

        me.callParent(arguments);
    },

    rpcService   : "Jdownloader",
    rpcGetMethod : "getSettings",
    rpcSetMethod : "setSettings",

    plugins      : [{
        ptype        : "linkedfields",
        correlations : [{
            name       : [
                "uniqueid",
            ],
            properties : "!show"
        }]
    }],

    getFormItems : function() {
        var me = this;

        return [{
            xtype    : "fieldset",
            title    : "General settings",
            defaults : {
                labelSeparator : ""
            },
            items : [{
                xtype      : "checkbox",
                name       : "enable",
                fieldLabel : _("Enable"),
                checked    : false
            },{
                xtype      : "checkbox",
                name       : "showtab",
                fieldLabel : _("Show Tab"),
                boxLabel   : _("Show tab containing my.jdownloader site."),
                checked    : false
            },{
                xtype       : "textfield",
                name        : "jderror",
                fieldLabel  : _("Error"),
                submitValue : false,
                readOnly    : true,
                plugins    : [{
                    ptype : "fieldinfo",
                    text  : _("Last error recived, NONE is good ;)")
                }]
            },{
                xtype       : "textfield",
                name        : "uniqueid",
                fieldLabel  : _("Unique"),
                submitValue : false,
                readOnly    : true,
                plugins    : [{
                    ptype : "fieldinfo",
                    text  : _("Unique ID used by the webui.")
                }]
            },{
                xtype      : "textfield",
                name       : "jdusername",
                fieldLabel : _("Email address"),
                allowBlank : false,
                vtype      : "email",
                plugins    : [{
                    ptype : "fieldinfo",
                    text  : _("Email address used on my.jdownloader.org.")
                }]
            },{
                xtype      : "passwordfield",
                name       : "jdpassword",
                fieldLabel : _("Password"),
                allowBlank : false,
                plugins    : [{
                    ptype : "fieldinfo",
                    text  : _("Password used on my.jdownloader.org.")
                }]
                        },{
                xtype   : "button",
                name    : "openjdownloader",
                text    : _("my.jdownloader site"),
                scope   : this,
                handler : function() {
                    var me = this;
                    var link = "http://my.jdownloader.org/";
                    window.open(link, "_blank");
                },
                margin : "0 0 5 0"
            }]
        }];
    },
});

OMV.WorkspaceManager.registerPanel({
    id        : "settings",
    path      : "/service/jdownloader",
    text      : _("Settings"),
    position  : 10,
    className : "OMV.module.admin.service.jdownloader.Settings"
});