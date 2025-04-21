An app that is used to track snacks.

Currently using an overlay pattern for snack feed.

1. Users stay on the main feed page
2. The URL updates with a query parameter (?snackId=123)
3. A modal appears with the details without navigating away from the feed

This is a common pattern in modern web apps (like Twitter, Instagram, etc.) that allows users to:

1. View details without losing context of the feed
2. Share direct links to specific items
3. Close the modal and return to their exact position in the feed

If you switch to a separate route (/snacks/[snackId]), you'd lose these benefits and would need to implement:

1. A complete separate page
2. Back navigation
3. Potentially scroll position restoration when returning to the feed
