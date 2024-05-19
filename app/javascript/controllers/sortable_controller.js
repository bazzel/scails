import { Controller } from "@hotwired/stimulus";
import Sortable from "sortablejs";
// Connects to data-controller="sortable"
export default class extends Controller {
  static values = {
    modeNumber: Number,
  };

  connect() {
    this.sortable = Sortable.create(this.element, {
      // animation: 350,
      group: "order",
      dataIdAttr: "data-sortable-mode-number-value",
      handle: ".drag-handle",
      store: {
        get: function (sortable) {
          var order = localStorage.getItem(sortable.options.group.name);
          return order ? JSON.parse(order) : [];
        },
        set: function (sortable) {
          var order = sortable.toArray().map((item) => parseInt(item));
          localStorage.setItem(
            sortable.options.group.name,
            JSON.stringify(order)
          );
        },
      },
      // ghostClass: "bg-gray-200",
      // onEnd: this.onEnd.bind(this),
      // handle: "[data-sortable-handle]",
    });
  }
}
