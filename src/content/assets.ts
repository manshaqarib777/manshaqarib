/**
 * Paths into `public/`, in one place.
 *
 * Every project record, career slide and case study builds its media URLs from
 * `SCREENSHOTS`, so moving the capture directory is a one-line change rather
 * than a find-and-replace across three content modules.
 */

/** Screenshots and walkthrough clips captured from the live sites. */
export const SCREENSHOTS = "/portfolio-screenshots";

/**
 * The CV, served straight from `public/`.
 *
 * Both "View resume" buttons used to point at `/resume`, a route that was
 * removed along with the design it belonged to — so both were a 404. The PDF is
 * what the page was really offering; now it is what the buttons link to.
 */
export const RESUME_PDF = "/mansha-qarib-senior-react-developer.pdf";
