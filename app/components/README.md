# ViewComponents

## SimpleSnackbarComponent

The `SimpleSnackbarComponent` shows an update on the screen as described in the [Material 3 Snackbar specs](https://m3.material.io/components/snackbar/overview). The component has an optional Close button.

The component is shown once on every page and will not be removed from the DOM after the snackbar disappears. Instead, before showing the snackbar the message should set during runtime.

To get access and control the `SimpleSnackbarComponent` state and behaviour, the component is treated as an [Stimulus Outlet](https://stimulus.hotwired.dev/reference/outlets).

Here is how it works:

- Given a piece of HTML code (this can be a Rails view, partial or other ViewComponent) you need to reference the outlet from your code by having a Stimulus controller attached and then add the proper data-attribute for the outlet to the element. The CSS selector to reference is `.simple-snackbar-component`:

```html
<!-- application.html.erb -->
<%= render(SimpleSnackbarComponent.new) %>

<!-- Some view, partial or ViewComponent -->
<div
  data-controller="my-controller"
  data-my-controller-simple-snackbar-component-outlet=".simple-snackbar-component"
  data-my-controller-snackbar-message-value="<%= t('.copy_confirmation') %>"
>
  ... <%= button_tag t(".some-action"), type: "button", data: { action:
  "my-controller#doIt", } %>
</div>
```

- `data-controller` holds the name of the Stimulus controller that 'controls' the snackbar, `data-my-controller-simple-snackbar-component-outlet` references the outlet (snackbar). `data-my-controller-snackbar-message-value` is a suggestion for storing the message that needs to be displayed by the snackbar (see later).
- The button invokes an method for showing the snackbar.

Now you need the Stimulus controller `my-controller` if you want to show the snackbar:

```js
import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static values = {
    snackbarMessage: String,
  };
  static outlets = ["simple-snackbar-component"];

  doIt() {
    this.simpleSnackbarComponentOutlet.setMessage(this.snackbarMessageValue);
    this.simpleSnackbarComponentOutlet.show();
  }
}
```

That's it (I guess).  
Maybe at a later stage I will extract this code into a separate file since this is quite 'snackbar' specific, but for now this should do.
