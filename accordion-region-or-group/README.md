# Accordion roles: region or group?

This code snippet explores the use of `role="region"` and `role="group"` for accordion (collapsible section) content blocks. [W3C's WAI-ARIA accordion example](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/examples/accordion/) uses the region role, but the Mozilla Dev Network (MDN) [accessibility guidance](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/region_role#accessibility_concerns) says to use it sparingly. I wanted to test different markup patterns and see how screen readers interpret information.

I assume the following markup and conditions:

1. All collapsible sections are toggled open and closed with a `button[aria-expanded="true | false"]`
2. Content blocks are simple `<div/>` elements with a `hidden` attribute toggled on and off using JavaScript
3. Content blocks receive programmatic focus when they are revealed in the DOM (semantically and visually)

## Screen reader findings
These findings are not exhaustive. As of October 27, 2023, I have only tested Safari + VoiceOver and Firefox + VoiceOver on MacOS Ventura. Future testing will include Chrome + JAWS and Firefox + NVDA. Mobile testing with iOS devices should also be done.

### Safari + VoiceOver

1. `div[role="region"]` Text content received screen reader pointer. Text was read aloud immediately. Container was not named and did not appear in the VO Landmarks menu.
2. `div[role="group"]` Text content received screen reader pointer. Text was read aloud immediately. Container was not named and did not appear in the VO Landmarks menu.
3. `div[role="region"] + aria-labelledby="BUTTON_ID"` Container received screen reader pointer. Container was named and button text appeared in the VO Landmarks menu. Advancing the screen reader pointer read the text aloud.
4. `div[role="group"] + aria-labelledby="BUTTON_ID"` Container received screen reader pointer. Container was not named. Named container did not appear in the VO Landmarks menu. Advancing the screen reader pointer read the text aloud.

**Conclusion:**<br/>
Example number three, the `div[role="region"] + aria-labelledby="BUTTON_ID"` was the best outcome in my experience. The expanded section was named using the button's accessible name. The expanded content block appeared in the VO Landmarks menu, making it reachable via asynchronous traversal.

**Minimal HTML markup:**
```html
<div class="cd-accordion--container">
  <button id="button-3" class="cd-button--expand">
    Div role "region" with aria-labelledby
    <svg aria-hidden="true" focusable="false" viewBox="0 0 10 10">
      <rect height="8" width="2" y="1" x="4" />
      <rect height="2" width="8" y="4" x="1" />
    </svg>
  </button>
  <div aria-labelledby="button-3" class="cd-accordion--content" role="region" hidden>
    This is the content in group number three. It includes an aria-labelledby attribute.
  </div>
</div>
```
