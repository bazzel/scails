import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="scrollable"
export default class extends Controller {
  connect() {
    this.scrollTo();
  }

  scrollTo() {
    const url = new URL(window.location.href);
    const id = url.hash.substring(1);

    if (id === "") return;

    const el = document.getElementById(id);
    el.scrollIntoView({ block: "start", behavior: "smooth" });
    el.getElementsByTagName("input")[0].checked = true;
  }
}
