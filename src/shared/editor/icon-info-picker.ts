import { HomeAssistant } from "custom-card-helpers";
import { css, CSSResultGroup, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import setupCustomlocalize from "../../localize";
import { ICON_INFOS } from "../../utils/info";
import "./../form/mushroom-select";

@customElement("mushroom-icon-info-picker")
export class IconInfoPicker extends LitElement {
    @property() public label = "";

    @property() public value?: string;

    @property() public configValue = "";

    @property() public hass!: HomeAssistant;

    _selectChanged(ev) {
        const value = ev.target.value;
        if (value) {
            this.dispatchEvent(
                new CustomEvent("value-changed", {
                    detail: {
                        value: value !== "default" ? value : "",
                    },
                })
            );
        }
    }

    render() {
        const customLocalize = setupCustomlocalize(this.hass);

        return html`
            <mushroom-select
                .label=${this.label}
                .configValue=${this.configValue}
                @selected=${this._selectChanged}
                @closed=${(e) => e.stopPropagation()}
                .value=${this.value || "default"}
                fixedMenuPosition
                naturalMenuWidth
            >
                <mwc-list-item value="default">
                    ${customLocalize("editor.form.icon_info_picker.values.default")}
                </mwc-list-item>
                ${ICON_INFOS.map((iconInfo) => {
                    return html`
                        <mwc-list-item .value=${iconInfo}>
                            ${customLocalize(`editor.form.icon_info_picker.values.${iconInfo}`) ||
                            capitalizeFirstLetter(iconInfo)}
                        </mwc-list-item>
                    `;
                })}
            </mushroom-select>
        `;
    }

    static get styles(): CSSResultGroup {
        return css`
            mushroom-select {
                width: 100%;
            }
        `;
    }
}

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}